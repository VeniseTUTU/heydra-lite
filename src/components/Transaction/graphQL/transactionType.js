import { gql } from 'apollo-server';

export default gql`
 
type Query { 
  getexpiredSubscription(input: expSubInput): expiredSubscriptionPayload!
 
}  
  
type Mutation {
    createTransaction(input: transactionInput): TransactionPayload!
    updateExpiredSubscription(input: expSubInput): updateExpiredSubscriptionPayload!
    
  }

  type expiredSubscriptionPayload {
    count: Int
    transaction: [Transaction]
  }

  type updateExpiredSubscriptionPayload {
    count: Int
    transactions: [Transaction]
  }

  input expSubInput{
    type:String
  }
  
  input transactionInput{
    userId:               Int!
    status:               String!
    amount:               String!
    quantity:             Int
    subscriptionId:       String
    subscriptionPlan:     String
    subscriberFirstName:  String
    subscriberLastName:   String
    subscriberEmail:      String
    planId:               String
    gateway:              String
    recurring:            String
    startDate:            String
    dueDate:              String
    createdAt:            String
  }
  type TransactionPayload {
    id: ID
    transaction: Transaction
    billing: Billing

  }

  type Billing {
    id: ID
    billingId: Int
    subscriptionId: String
    status: String
      
  }

  type Transaction {
    id:                   ID!,
    viewerId:             Int!
    status:               String!
    amount:               String!
    quantity:             Int
    recurring:            String
    subscriptionId:       String
    subscriptionPlan:     String
    subscriberFirstName:  String
    subscriberLastName:   String
    subscriberEmail:      String
    planId:               String
    gateway:              String
    startDate:            String
    dueDate:              String
    createdAt:            String
  }


  


`;
