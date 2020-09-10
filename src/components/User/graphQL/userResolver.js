export default {
  
  //Query
  Query:{
  getUsers: () => {},
  getUser: async () => {},

  },

  //Mutation
  Mutation:{
  addUser: async (_, { input }, {dataSources:{UserAPI}}) => {return await UserAPI.createUser(input);},
  loginUser: async (_, { input }, {dataSources:{UserAPI}}) => {return await UserAPI.loginUser(input);},
  addQueue: async (_, { input }, {dataSources:{UserAPI}}) => {return await UserAPI.addQueue(input);},
  updatePassword: async (_, { input }, {dataSources:{UserAPI}}) => {return await UserAPI.updatePassword(input);},
  setCode: async (_, { input }, {dataSources:{UserAPI}}) => {return await UserAPI.setCode(input);},
  verifyCode: async (_, { input }, {dataSources:{UserAPI}}) => {return await UserAPI.verifyCode(input);},
  setPassword: async (_, { input }, {dataSources:{UserAPI}}) => {return await UserAPI.setPassword(input);},
  
  },  

}
