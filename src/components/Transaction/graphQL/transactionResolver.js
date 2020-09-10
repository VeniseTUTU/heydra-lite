export default {
  
  //Query
  Query:{
    getexpiredSubscription: async (_, { input }, {dataSources:{TransactionAPI}}) => {return await TransactionAPI.getexpiredSubscription(input);},
  },
  
  //Mutation
  Mutation:{
    createTransaction: async (_, { input }, {dataSources:{TransactionAPI}}) => {return await TransactionAPI.createTransaction(input);},
    updateExpiredSubscription: async (_, { input }, {dataSources:{TransactionAPI}}) => {return await TransactionAPI.updateExpiredSubscription(input);},
  
  },  
  
}
