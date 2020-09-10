export default {
  
  //Query
  Query:{
  getViewer: async (_, { input }, {dataSources:{ViewerAPI}}) => {return await ViewerAPI.getViewer(input);},
  getViewers: async (_, { input }, {dataSources:{ViewerAPI}}) => {return await ViewerAPI.getViewers(input);},
  getViewerContent: async (_, { input }, {dataSources:{ViewerAPI}}) => {return await ViewerAPI.getViewerContent(input);},
  
  },

  //Mutation
  Mutation:{
  addComment: async (_, { input }, {dataSources:{ViewerAPI}}) => {return await ViewerAPI.addComment(input);},
  updateViewer: async (_, { input }, {dataSources:{ViewerAPI}}) => {return await ViewerAPI.updateViewer(input);},
  
    },  
  
}
