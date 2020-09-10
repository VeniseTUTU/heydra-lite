import { DataSource } from 'apollo-datasource';
import {deDupArray} from '../utilities/'

export default class HistoryAPI extends DataSource {
  constructor({ methods }) {
    super();
    this.methods = methods;
    
  }

  initialize(config) {
    this.context = config.context;
  }

  // create a customer account and link it to a bvn
  async addHistory(data = {}) {
    const {
      
      itemId,
      timeLeft,
      
    } = data;

    // Authenticate request against resource.
  await this.context.dataSources.Authenticate.getApiKey();

  const userId =  await this.context.req.headers.userid;

 const historyData = {
      // map data to database
      itemId,
      timeLeft,
      viewerId:+userId,
    };
  
  const resHistory = await this.context.prisma.history.findMany({ 
    where: {itemId,viewerId:+userId}
  });
  let history;

  if (resHistory && resHistory.length) {

      history = await this.context.prisma.history.update({ 
      where: {id: resHistory[0].id},
      data: historyData 
    });
    if(!history) throw new Error ('Cannot create video');

  }else {
    history = await this.context.prisma.history.create({ data: historyData });
    if(!history) throw new Error ('Cannot create video');
  }
  
  //extract user histories
  const historiesRes = await this.context.prisma.history.findMany({
    where:{
      viewerId:+userId, 
      isDelete:'no'
    }
  });
 
  const cherryPick = { where:{itemId:history.itemId} };
  const vidresponse = await this.context.prisma.videos.findOne(cherryPick);
  if(!vidresponse) throw new Error('cannot get video');
  const timeLeftt = this.methods.includeTimeLeft(historiesRes,vidresponse.itemId);
  const Video = (this.methods.videoReducer(vidresponse,timeLeftt));

  return {
    createdAt: history.createdAt,
    video: Video
  };
  
  }; //end createVideo method

     
}
