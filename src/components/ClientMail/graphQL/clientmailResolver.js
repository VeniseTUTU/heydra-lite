export default {
  
  
  //Query
  Query:{
    sendmailSjimpex: async (_, { input }, {dataSources:{ClientMailAPI}}) => {return await ClientMailAPI.sendmailSjimpex(input);},
    sendmailRealcomfort: async (_, { input }, {dataSources:{ClientMailAPI}}) => {return await ClientMailAPI.sendmailRealcomfort(input);},

},  
  
}
