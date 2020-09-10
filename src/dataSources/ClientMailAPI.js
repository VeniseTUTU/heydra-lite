import { DataSource } from 'apollo-datasource';
const sgMail = require('@sendgrid/mail');

export default class ClientMailAPI extends DataSource {
  constructor({ methods }) {
    super();
    this.methods = methods;
    
  }

  initialize(config) {
    this.context = config.context;
  }

  
  async sendmailSjimpex(data = {}) {
    const {name,email,subject,message} = data;
    const date = new Date();
   
    const emailData = {name,email,subject,message};
    const replyTo = 'info@sjimpexng.com';

    const senderMessage = this.methods.sender_email_template(replyTo,emailData.name);
    const receiverMessage = this.methods.recepient_email_template(emailData.email,emailData.name,emailData.message);
     
      
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const emails = [
        {
        to: replyTo,
        from: {email:'noreply@sjinet.com', name: 'SJIMPEXNG.COM'},
        subject: 'Notification Email',
        text: 'c',
        html: receiverMessage,
      },
      {
        to: emailData.email,
        from: {email:'noreply@sjinet.com', name: 'SJIMPEXNG NOREPLY'},
        subject: 'Notification Email',
        text: 'c',
        html: senderMessage,
      }
    ]
      
       try {
        await sgMail.send(emails);
        return {status:'ok'};
       } catch (error) {
         console.error(error);
         if (error.response) {
           console.error(error.response.body)
         }
         throw new Error('failed');
       }
  
   
  
  }; //end sendmailSjimpex method

  async sendmailRealcomfort(data = {}) {
    const {name,email,subject,message} = data;
    const date = new Date();
   
    const emailData = {name,email,subject,message};
    const replyTo = 'sales@realcomfortltd.com';

    const senderMessage = this.methods.sender_email_template(replyTo,emailData.name);
    const receiverMessage = this.methods.recepient_email_template(emailData.email,emailData.name,emailData.message);
     
      
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const emails = [
        {
        to: replyTo,
        from: {email:'noreply@sjinet.com', name: 'REALCOMFORTLTD.COM'},
        subject: 'Notification Email',
        text: 'c',
        html: receiverMessage,
      },
      {
        to: emailData.email,
        from: {email:'noreply@sjinet.com', name: 'REALCOMFORTLTD NOREPLY'},
        subject: 'Notification Email',
        text: 'c',
        html: senderMessage,
      }
    ]
      
       try {
        await sgMail.send(emails);
        return {status:'ok'};
       } catch (error) {
         console.error(error);
         if (error.response) {
           console.error(error.response.body)
         }
         throw new Error('failed');
       }
  
   
  
  }; //end sendmailRealcomfort method

     
}
