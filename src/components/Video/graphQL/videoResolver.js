export default {
  
  //Query
  Query:{
  getVideos: async (_, { input }, {dataSources:{VideoAPI}}) => {return await VideoAPI.getVideos(input);},
  
  },

  //Mutation
  Mutation:{
  addVideo: async (_, { input }, {dataSources:{VideoAPI}}) => {return await VideoAPI.createVideo(input);},
  addLikes: async (_, { input }, {dataSources:{VideoAPI}}) => {return await VideoAPI.addLikes(input);},
  addCommentLikes: async (_, { input }, {dataSources:{VideoAPI}}) => {return await VideoAPI.addCommentLikes(input);},
  deleteLikes: async (_, { input }, {dataSources:{VideoAPI}}) => {return await VideoAPI.deleteLikes(input);},
  deleteCommentLikes: async (_, { input }, {dataSources:{VideoAPI}}) => {return await VideoAPI.deleteCommentLikes(input);},
  getSearchVideo: async (_, { input }, {dataSources:{VideoAPI}}) => {return await VideoAPI.getSearchVideo(input);},
  getPriorVideo: async (_, { input }, {dataSources:{VideoAPI}}) => {return await VideoAPI.getPriorVideo(input);},
  getEpisodes: async (_, { input }, {dataSources:{VideoAPI}}) => {return await VideoAPI.getEpisodes(input);},
  getVideo: async (_, { input }, {dataSources:{VideoAPI}}) => {return await VideoAPI.getVideo(input);},
  
  }, 
  
}
