export default {
  
  //Query
  Query:{
  getHistories: async (_, { input }, {dataSources:{HistoryAPI}}) => {return await HistoryAPI.getHistories(input);},
  
  },

  //Mutation
  Mutation:{
  addHistory: async (_, { input }, {dataSources:{HistoryAPI}}) => {return await HistoryAPI.addHistory(input);},
  }, 
  
}
