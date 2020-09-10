import { DataSource } from 'apollo-datasource';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../heydra.config';
const sgMail = require('@sendgrid/mail');
import {deDupArray} from '../utilities/'


export default class UserAPI extends DataSource {
  constructor({ methods }) {
    super();
    this.methods = methods;
    
  }

  initialize(config) {
    this.context = config.context;
  }

  createUserId (){
    const dateString = new Date()
      .toISOString()
      .replace(new RegExp('\\D', ['g']), '')
      .substring(0, 4);
  
    const rand4 = Math.floor(Math.random() * (99999 - 11111) + 11111);
    return `${dateString}${rand4}`;
  };
    // create a customer account and link it to a bvn
  async createUser(data = {}) {
    const {
    email,
    passPhrase,
    phone,
    firstName,
    lastName,
    country,
    gender,
    touchPoint,

    } = data;

    // generate API key and secret
    const { apiKey, encryptedSecret } = await this.methods.generateApiKeyPair();

    // encrypt password
    const encPassword = await bcrypt.hash(passPhrase, 10);
    const genUserId = this.createUserId(); 

    const modCreateUserData = {
      // map data to database
       apiKey,
       apiSecret: encryptedSecret,
       email,
       passPhrase: encPassword,
       userId: parseInt(genUserId),
       userType:'BASIC',
       
     };
     modCreateUserData.viewer = {
       create:{
      firstName,
      lastName,
      phone,
      touchPoint,
      country,
      gender,
    }
    };
    modCreateUserData.billing = {
      create: {status:'inactive'},
    };
 
      let include;
      include = {viewer:true,billing:true};
      
      const userRes = await this.context.prisma.user.findOne({
        where:{
          email: email
        }
      });
      if(userRes) throw new Error('User Exists.');
      
      const response = await this.context.prisma.user.create({data: modCreateUserData, include});
      if(!response) throw new Error ('Cannot create user');

      const user = this.methods.userReducer(response);
      const token = jwt.sign({ApiKey:user.apiKey}, user.apiSecret);
      
      const code = Math.floor(Math.random() * (999999 - 111111) + 111111);
        const coderesponse = await this.context.prisma.user.update({
          where:{email},
          data: {verifyString: ''+code},
          include:{viewer:true}
        });
      const slug = encodeURIComponent(`${user.email}:${coderesponse.verifyString}`);
      const url = `https://www.sjinet.com/confirm-email?${slug}`;

      const dateArr = ['January','Febrary','March','April','May','June','July','August','September','October','November','December'];
      const date = new Date();
      const newDate = date.getDate() +' '+ dateArr[(date.getMonth())] +', '+ date.getFullYear();
   
      
      const htmlMessage = this.methods.confirm_email_template(newDate,coderesponse.viewer.firstName,url);
     
      
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: coderesponse.email,
        from: {email:'noreply@sjinet.com', name: 'SJINET TEAM'},
        subject: 'Confirmation Email',
        text: 'c',
        html: htmlMessage,
      };
      
       try {
        await sgMail.send(msg);
       } catch (error) {
         console.error(error);
         if (error.response) {
           console.error(error.response.body)
         }
       }
      
      return {
        token,
        user
      }
      }; //end createCustomer method

      async loginUser(data = {}) {
        const {email,passPhrase} = data;
        const userRes = await this.context.prisma.user.findOne({
          where:{
            email: email
          },
          include:{viewer:true, billing:true}
        });
        if(!userRes) throw new Error('No user found');

        const user = this.methods.userReducer(userRes);

        const valid = await bcrypt.compare(passPhrase,user.passPhrase);
        if(!valid) {
          //this.methods.UserEmitter.failLogin(user.userId);
          throw new Error('Invalid Passowrd');
          
        }

        const token = jwt.sign({ApiKey: user.apiKey}, user.apiSecret);

        //Emitter
        //this.methods.UserEmitter.login(user.userId);

        const historiesResponse = await this.context.prisma.history.findMany({
          where:{
            viewerId:user.userId,
            isDelete:'no'
          }
        });
        const historiesRes = deDupArray(historiesResponse,'itemId');
        
        //queue
        let queue = [];
        const queueRes = await this.context.prisma.queue.findMany({
          where:{
            viewerId:user.userId,
          }
        });
        
        if (!queueRes) return queue;

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

        //history
        let history =[];
       
        if (historiesRes && historiesRes.length) {

        //extract queue videos
        const sortedHistory = await Promise.all(historiesRes.map(async(id) => ( await this.context.prisma.videos.findOne({
          where:{
            itemId:id.itemId,
          }
        })
        )));

        if(sortedHistory && sortedHistory.length) {

          history = sortedHistory.map(video => {
            const timeLeft = this.methods.includeTimeLeft(historiesRes,video.itemId)
            return (this.methods.videoReducer(video,timeLeft))
          });

        }
      }

         //liked
         let liked = [];
         const likesRes = await this.context.prisma.likes.findMany({
           where:{
             viewerId:user.userId,
           }
         }); 
 
         if (likesRes && likesRes.length) {
 
         //extract queue videos
         const sortedLikes = await Promise.all(likesRes.map(async(id) => ( await this.context.prisma.videos.findOne({
           where:{
             itemId:id.itemId,
           }
         })
         )));
 
         if(sortedLikes && sortedLikes.length) {
 
          liked = sortedLikes.map(video => {
             const timeLeft = this.methods.includeTimeLeft(historiesRes,video.itemId)
             return (this.methods.videoReducer(video,timeLeft))
           });
 
         }
        }

        // transaction
        let transaction = [];

        const transactionRes = await this.context.prisma.transactions.findMany({
          where:{
            viewerId:user.userId,
          }
        }); 

        if (transactionRes && transactionRes.length) transaction = transactionRes;

        return{
          token,
          user,
          transaction,
          queue,
          history,
          liked
        }

      
      }  //end loginUser

      async addQueue(data = {}) {
        const {itemId} = data;

        // Authenticate request against resource.
        await this.context.dataSources.Authenticate.getApiKey();

        const userId =  await this.context.req.headers.userid;

        const response = await this.context.prisma.queue.findMany({ 
          where: {
            viewerId: +userId,
            itemId,
            
          }
        });
        
        if (response && response.length) throw new Error ('Video already in  queue');
        

        const inputData = {
          // map data to database
           viewerId: +userId,
           itemId
         };
        const queue = await this.context.prisma.queue.create({ data: inputData });
        if(!queue) throw new Error ('Cannot queue up video');

        //extract user histories
        const historiesRes = await this.context.prisma.history.findMany({
          where:{
            viewerId:+userId,
            isDelete:'no'
          }
        }); 
        const cherryPick = { where:{itemId:queue.itemId} };
        const vidresponse = await this.context.prisma.videos.findOne(cherryPick);
        if(!vidresponse) throw new Error('cannot get video');
        const timeLeft = this.methods.includeTimeLeft(historiesRes,vidresponse.itemId);
        const Video = (this.methods.videoReducer(vidresponse,timeLeft));

        return Video;
        

      } //end addQueue

      async updatePassword(data = {}) {
        const {password,newpassword} = data;

        // Authenticate request against resource.
        await this.context.dataSources.Authenticate.getApiKey();
        const userId =  await this.context.req.headers.userid;
       
        const userRes = await this.context.prisma.user.findOne({
          where:{
            userId: +userId
          }          
        });
        if(!userRes) throw new Error('Changes could not be made on your password. No user found');
        
        const valid = await bcrypt.compare(password,userRes.passPhrase);
        if(!valid) throw new Error('Changes could not be made on your password. Invalid Password');
        // encrypt password
        const passPhrase = await bcrypt.hash(newpassword, 10);

        const response = await this.context.prisma.user.update({
          where:{userId:+userId},
          data: {passPhrase}
        });
    
        if(!response) throw new Error('Changes could not be made on your password.');
        return {success:'ok'};   

      } //end updatePassword

      async setCode(data = {}) {
        const {email} = data;
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
       
       
        const userRes = await this.context.prisma.user.findOne({
          where:{
            email
          }          
        });
        if(!userRes) throw new Error('Invalid email'); 
       
        const code = Math.floor(Math.random() * (999999 - 111111) + 111111);
        const response = await this.context.prisma.user.update({
          where:{email},
          data: {verifyString: ''+code},
          include:{viewer:true}
        });
    
        if(!response) throw new Error('Cannot write code. Try again.');
        const htmlMessage = this.methods.email_template(response.verifyString,response.viewer.firstName);
      
      const msg = {
        to: response.email,
        from: {email:'noreply@sjinet.com', name: 'SJINET NOREPLY'},
        subject: 'Reset Password',
        text: 'c',
        html: htmlMessage,
      };
      
   
       try {
        await sgMail.send(msg);
       } catch (error) {
         console.error(error);
         if (error.response) {
           console.error(error.response.body)
         }
       }

        const nodes = {
          success: 'ok',
          userId: userRes.userId,
          email: userRes.email,
        }
      

        return {
          nodes
          
        };   

      } //end setCode

      async verifyCode(data = {}) {
        const {email,code} = data;

        const userRes = await this.context.prisma.user.findMany({
          where:{
            email,
            verifyString: ''+code
          }          
        });
        if(!userRes || !userRes.length) throw new Error('Invalid code');

        const nodes = {
          success: 'ok',
          userId: userRes[0].userId,
          email: userRes[0].email,
          code: userRes[0].verifyString,
        }

       
        return {
          nodes
        };   

      } //verifyCode

      async setPassword(data = {}) {
        const {userId,code,password} = data;

       const userRes = await this.context.prisma.user.findMany({
          where:{
            userId: +userId,
            verifyString: ''+code
          }          
        });
        
        if(!userRes || !userRes.length) throw new Error('No user found');
        
        const passPhrase = await bcrypt.hash(password, 10);

        const response = await this.context.prisma.user.update({
          where:{userId:+userId},
          data: {passPhrase}
        });
    
        if(!response) throw new Error('Cannot change password. Try again');
        return {success:'ok'};   

      } //end updatePassword
            
}
