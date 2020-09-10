import { gql } from 'apollo-server';

export default gql`
 
  
  
  type Mutation {
    cancelSubscription(input: subscriptionInput!): ReturnSubscription
    activateSubscription(input: subscriptionInput!): ReturnSubscription
  }
 
  input subscriptionInput{
    subscriptionId: String!
  }
  type ReturnSubscription {
    transaction: Transaction
  }

  

`;
