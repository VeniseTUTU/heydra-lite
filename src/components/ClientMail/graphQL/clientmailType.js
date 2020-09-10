import { gql } from 'apollo-server';

export default gql`
 
  
  type Query {
    sendmailSjimpex(input: sendmailInput): returnmailPayload!
    sendmailRealcomfort(input: sendmailInput): returnmailPayload!
  }

  input sendmailInput{
    name: String
    email: String
    subject: String
    message: String
  }
  type returnmailPayload {
    status: String
  }

 

`;
