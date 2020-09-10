import { DataSource } from 'apollo-datasource';

export default class VideoAPI extends DataSource {
  constructor({ methods }) {
    super();
    this.methods = methods;

       
    
  }

  initialize(config) {
    this.context = config.context;
  }
  

  createVideoId (){
    const dateString = new Date()
      .toISOString()
      .replace(new RegExp('\\D', ['g']), '')
      .substring(0, 4);
  
    const rand4 = Math.floor(Math.random() * (999999 - 111111) + 111111);
    return `${dateString}${rand4}`;
  };
    // create a customer account and link it to a bvn
  async createVideo(data = {}) {
    const {
    
      category,
      description,
      genre,
      itemDuration,
      itemImage,
      itemTitle,
      keywords,
      productionCompany,
      productionYear,
      subCategory,
      trailerUrl,
      type,
      src,
      season,
      episode,
      episodeTitle,
      episodeDescription,
      epidsodeUrl
        

  } = data;

const videoId = this.createVideoId();

 const videoData = {
      // map data to database
      category,
      description,
      genre: genre.join(','),
      itemDuration,
      itemId: +videoId,
      itemImage,
      itemLink: +videoId,
      itemTitle,
      keywords,
      productionCompany,
      productionYear,
      subCategory,
      trailerUrl,
      season,
      episode,
      episodeTitle,
      episodeDescription,
      epidsodeUrl
  };

  videoData.source = {
    create: {
      src,
      type,
            
    },
  };

  let include;
  include = {source:true}; 
               
  const response = await this.context.prisma.videos.create({data: videoData, include});
  if(!response) throw new Error ('Cannot create video');

  const video = this.methods.videoReducer(response);
  return video;
  
  }; //end createVideo method

  async getVideos(data = {}) {
    const {category, pageSize = 20, after} = data;
    // Authenticate request against resource.
    await this.context.dataSources.Authenticate.getApiKey();
    
    let cherryPick; 
    category ?
    cherryPick = { where:{category:category.toUpperCase()} }: {};

    const response = await this.context.prisma.videos.findMany(cherryPick);

    if(!response || !response.length) return [];

    const allVideos = response.map(video => this.methods.videoReducer(video));
    allVideos.reverse();

    const videos = this.context.dataSources.PaginateResults.pager({
      after,
      pageSize,
      results: allVideos 
    });
    return{
      videos,
      cursor: videos.length ? videos[videos.length - 1 ].cursor : null,
      hasMore: videos.length 
      ? videos[videos.length - 1 ].cursor !==
      allVideos[allVideos.length - 1 ].cursor
      : false
    };
  } //end getVideos method

  async getVideo(data = {}) {
    const {itemId} = data;
   
    // Authenticate request against resource.
    await this.context.dataSources.Authenticate.getApiKey();

    const userId =  await this.context.req.headers.userid;

    //extract user histories
    const historiesRes = await this.context.prisma.history.findMany({
      where:{
        viewerId:+userId,
        isDelete:'no'
      }
    }); 
    
    const cherryPick = { where:{itemId:itemId} };

    const response = await this.context.prisma.videos.findOne(cherryPick);

    if(!response) throw new Error('No video found');

    const timeLeft = this.methods.includeTimeLeft(historiesRes,response.itemId);
    const Video = (this.methods.videoReducer(response,timeLeft))

    return Video;

  } //end getVideo method

  async getPriorVideo(data = {}) {
    const {itemId} = data;
    
    const VIDEO_URL  = process.env.NODE_ENV === 'development' 
    ? process.env.VIDEO_URL_DEV 
    :process.env.VIDEO_URL;

    // Authenticate request against resource.
    await this.context.dataSources.Authenticate.getApiKey();

    const userId =  await this.context.req.headers.userid;

    //extract user histories
    const historiesRes = await this.context.prisma.history.findMany({
      where:{
        viewerId:+userId,
        isDelete:'no'
      }
    }); 

    const cherryPick = { where:{itemId}, include:{source:true} };

    const response = await this.context.prisma.videos.findOne(cherryPick);
    if(!response) throw new Error('No video found');
    

    let source = null;
    const dd = !! await this.context.dataSources.Authenticate.getBillingStatus();
    if (dd) {
      source = response.source.map((sou,i) => ({...sou, src: VIDEO_URL+sou.src}))
     
    }

    const timeLeft = this.methods.includeTimeLeft(historiesRes,response.itemId);
    const video = (this.methods.videoReducer(response,timeLeft,source));
    

    //queue
    let queue = [];
    const queueRes = await this.context.prisma.queue.findMany({
      where:{
        viewerId:+userId
      }
    }); 

     //extract queue videos
     const sortedQueue = await Promise.all(queueRes.map(async(id) => ( await this.context.prisma.videos.findOne({
      where:{
        itemId:id.itemId,
       }
    })
    )));

    if(sortedQueue && sortedQueue.length) {

      queue = sortedQueue.map(video => {
        const timeLeft = this.methods.includeTimeLeft(historiesRes,video.itemId)
        return (this.methods.videoReducer(video,timeLeft))
      });

    }
 
    //supporting
    let supporting = [], genreWhere = {};
    const vidGenre = response.genre.split(',');
    const contains = vidGenre.map((vid) => {
      return {
         ...genreWhere, genre: {contains: ''+vid}
      } 
    })

   const cherryPick1 = { 
      where:{
        OR: contains
      }
    }; 
    const supportingRes = await this.context.prisma.videos.findMany(cherryPick1);

    if(supportingRes && supportingRes.length) {

      supporting = supportingRes.map(video => {
        const timeLeft = this.methods.includeTimeLeft(historiesRes,video.itemId)
        return (this.methods.videoReducer(video,timeLeft))
      });

    }
    
    
  //likes
  let likes = 0;
  const likesRes = await this.context.prisma.likes.findMany({
    where:{
      itemId,
     }
  });
  likes = likesRes.length;
  
  //comments
  let comments = [], countLikes = 0;
  const commentRes = await this.context.prisma.comments.findMany({
    where:{
      itemId,
     }
  });

  if (!commentRes) return comments = [];

  comments = await Promise.all(commentRes.map(async(comment) => {

    const users = await this.context.prisma.viewer.findMany({where:{viewerId:comment.viewerId},include:{user:true}});
    const user = this.methods.viewerReducer(users[0]);
    const commLikes = await this.context.prisma.commentlikes.findMany({where:{commentId:comment.comment.id}});
    if ( commLikes && commLikes.length ) countLikes = commLikes.length;
    
    return{
      id: comment.id,
      createdAt: comment.createdAt,
      comment: comment.comment,
      likes: countLikes,
      user, 
    }
  }))

  
    return {
      video,
      queue,
      supporting,
      likes,
      episodes:[],
      comments,
    };
  } //end getPriorVideo method
  
  async addLikes(data = {}) {
    const {itemId,viewerId} = data;

    // Authenticate request against resource.
    await this.context.dataSources.Authenticate.getApiKey();

    const userId =  await this.context.req.headers.userid;
    const inputData = {
        itemId, 
        viewerId: +userId,
        
      };
      
    const existingLike = await this.context.prisma.likes.findMany({ where: {viewerId: inputData.viewerId,itemId:inputData.itemId} });

     

    if(existingLike && existingLike.length) {

      const deletedlikeRes = await this.context.prisma.likes.delete({ 
        where: {id:existingLike[0].id},
      });
      if (!deletedlikeRes) throw new Error('Cannot delete likes.');

      //extract user histories
      const historiesRes = await this.context.prisma.history.findMany({
        where:{
          viewerId:+userId,
          isDelete:'no'
        }
      }); 
      const cherryPick = { where:{itemId:deletedlikeRes.itemId} };
      const vidresponse = await this.context.prisma.videos.findOne(cherryPick);
      if(!vidresponse) throw new Error('cannot get video');
      const timeLeft = this.methods.includeTimeLeft(historiesRes,vidresponse.itemId);
      const Video = (this.methods.videoReducer(vidresponse,timeLeft))

      return {
        status: 'delete',
        video: Video
      };

    }
    
    const likeRes = await this.context.prisma.likes.create({ 
      data: inputData,
    });
    if (!likeRes) throw new Error('Cannot add likes.');

    //extract user histories
    const historiesRes = await this.context.prisma.history.findMany({
      where:{
        viewerId:+userId,
        isDelete:'no'
      }
    }); 
    const cherryPick = { where:{itemId:likeRes.itemId} };
    const vidresponse = await this.context.prisma.videos.findOne(cherryPick);
    if(!vidresponse) throw new Error('cannot get video');
    const timeLeft = this.methods.includeTimeLeft(historiesRes,vidresponse.itemId);
    const Video = (this.methods.videoReducer(vidresponse,timeLeft))

    return {
      status: 'add',
      video: Video
    };
  } //end addLikes method

  async addCommentLikes(data = {}) {
    const {itemId,authorId,commentId,viewerId} = data;

    // Authenticate request against resource.
    await this.context.dataSources.Authenticate.getApiKey();

    const userId =  await this.context.req.headers.userid;
    const inputData = {
      // map data to database
        itemId,
        viewerId: +userId,
        authorId,
        commentId
      };
      
    const existingcomLike = await this.context.prisma.commentlikes.findMany({ 
      where: {
        viewerId: inputData.viewerId,
        itemId:inputData.itemId,
        authorId:inputData.authorId,
        commentId:inputData.commentId
      } });
      
      if(existingcomLike && existingcomLike.length) {

        const deletedcomlike = await this.context.prisma.commentlikes.delete({ 
          where: {id:existingcomLike[0].id}
          
        });

        if (!deletedcomlike) throw new Error('Cannot delte like.');

        return {
          success: 'ok'
        };

      }

      const comlikeRes = await this.context.prisma.commentlikes.create({ 
        data: inputData,
      });

      if (!comlikeRes) throw new Error('Cannot add like.');
  
      return {
        success: 'ok'
      };
    
    
  }  //end addCommentLikes method

  async deleteLikes(data = {}) {
    const {itemId} = data;

    // Authenticate request against resource.
    await this.context.dataSources.Authenticate.getApiKey();

    const userId =  await this.context.req.headers.userid;
    const inputData = {
      // map data to database
      itemId,
      viewerId: +userId,
      
    };

    const likesRes = await this.context.prisma.likes.findMany({ where: inputData });
    if (!likesRes) throw new Error('Cannot delete like.');
    const status = await this.context.prisma.likes.delete({ where: {id: likesRes[0].id} });
    

    return {
      success: 'ok'
    };

  } //end deleteLikes method

  async deleteCommentLikes(data = {}) {
    const {itemId,commentId,authorId,viewerId} = data;

    // Authenticate request against resource.
    await this.context.dataSources.Authenticate.getApiKey();

    const userId =  await this.context.req.headers.userid;
    const inputData = {
      // map data to database
      itemId,
      viewerId: +userId,
      authorId,
      commentId
    };

    const commentlikesRes = await this.context.prisma.commentlikes.findMany({ where: inputData });
    if (!commentlikesRes) throw new Error('Cannot delete like.');
    const status = await this.context.prisma.commentlikes.delete({ where: {id: commentlikesRes[0].id} });
    

    return {
      success: 'ok'
    };

  } //end deleteCommentLikes method

  async getSearchVideo(data = {}) {
    const {param, pageSize = 60, after} = data;
    // Authenticate request against resource.
    await this.context.dataSources.Authenticate.getApiKey();
    
    let cherryPick, videos=[];
    
    cherryPick = { 
      where:{
        OR:[
          {itemTitle: {contains: param} },
          {category: {contains: param} },
          {subCategory: {contains: param} },
          {genre: {contains: param} },
          {keywords: {contains: param} },
        ],
      },
    };

    const response = await this.context.prisma.videos.findMany(cherryPick);
    
    if(!response || !response.length) return videos;

    const allVideos = response.map(video => this.methods.videoReducer(video));
    allVideos.reverse();

    videos = this.context.dataSources.PaginateResults.pager({
      after,
      pageSize,
      results: allVideos 
    });
    return{
      videos,
      cursor: videos.length ? videos[videos.length - 1 ].cursor : null,
      hasMore: videos.length 
      ? videos[videos.length - 1 ].cursor !==
      allVideos[allVideos.length - 1 ].cursor
      : false
    };
  } //end getSearchVideo method

  
  async getEpisodes({season,title}) {

  // Authenticate request against resource.
  await this.context.dataSources.Authenticate.getApiKey();
  let cherryPick = {
    where: {itemTitle: title,season},
    orderBy:{createdAt:'desc'}
  };
  const response = await this.context.prisma.videos.findMany(cherryPick);
  const allVideos = response.map(video => this.methods.videoReducer(video));
  return allVideos;
    
  } //end getEpisodes method

}
     

