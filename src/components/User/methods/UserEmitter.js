const EventEmitter  = require('events').EventEmitter;

class User extends EventEmitter {
  constructor() {
    super();
    
  }

  /**
   * @param {Number} userId 
   * @returns {User}
   */
  login(userId){
    userId && this.emit('userLogin', userId);
    return this;
   }

   failedLogin(userId){
    userId && this.emit('userLoginFail', userId);
    return this;
   }
     
}

export default (() => {
  const user = new User();
  user
  .on('userLogin', arg => console.log(`User with ${arg} logged in.`) )
  .on('userLoginFail', arg => console.log(`Failed login for user ${arg} `) );

  return{
    login: (id) => user.login(id),
    failLogin: (id) => user.failedLogin(id),
  }
  
})()
