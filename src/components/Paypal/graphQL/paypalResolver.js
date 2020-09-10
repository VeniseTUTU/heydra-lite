export default {
  
  
  
  //Mutation
  Mutation:{
    cancelSubscription: async (_, { input }, {dataSources:{PaypalAPI}}) => {return await PaypalAPI.cancelSubscription(input);},
    activateSubscription: async (_, { input }, {dataSources:{PaypalAPI}}) => {return await PaypalAPI.activateSubscription(input);},
    
  },
  
}
