import { gql } from 'apollo-server';

export default gql`

type Query {
  getUser(id: ID!): User!
  getUsers: [User!]!
} 
  
type Mutation {
    addUser(input: AddUserInput!): UserPayload!
    loginUser(input: UserLoginInput!): AuthPayload!
    addQueue(input: QueueInput!): Video!
    updatePassword(input: PasswordInput!): PasswordPayload!
    setCode(input: CodeInput!): CodePayload! 
    verifyCode(input: VerifyCodeInput!): VeriCodePayload!  
    setPassword(input: SetPasswordInput!): PasswordPayload!
  }

  type use{
    name: String
  }

input VerifyCodeInput {
  email: String!
  code: String!
}

input SetPasswordInput {
  userId: Int!
  code: String!
  password: String!
}

input CodeInput {
  email: String!
}

type VeriCodePayload{
  nodes:    vcodePayload!
}

type CodePayload {
  nodes:    resetPayload!
  
}
type resetPayload {
  success:    String
  userId:     Int
  email:      String
  
}
type vcodePayload {
  success:    String
  userId:     Int
  email:      String
  code:       String
}

  input PasswordInput {
    password:         String!
    newpassword:         String!
  }
  type PasswordPayload {
    success:         String!
  }

    
  type User {
    apiKey:           String
    apiSecret:        String
    createdAt:        String
    email:            String!
    id:               ID!
    isEmailConfirmed: String 
    passPhrase:       String!
    status:           String
    token:            String
    userId:           Int!
    userType:         UserKind!
    verifyString:     String
    viewer:           Viewer
    billing:          Billing
  }

  type UserPayload {
    token:            String!
    user:             User!
}

  type AuthPayload {
    token:            String!
    user:             User!
    transaction:      [Transaction]
    history:          [Video]
    queue:            [Video]
    liked:            [Video]
  }

   type Queue {
    createdAt:        String
    id:               ID!
    itemId:           Int!
    viewerId:         Int!
  }

  type Billing {
    billingId:        Int
    subscriptionId:   String
    id:               ID!
    status:           String!
    recurring:        String!
    createdAt:        String
  }

  
  input UserLoginInput {
    email:            String!
    passPhrase:         String!
  }

  input QueueInput {
    itemId: Int!
    viewerId: Int
  }

  enum UserKind{
    BASIC 
  }

  
  input AddUserInput {
    email:            String!
    passPhrase:       String!
    phone:            String
    firstName:        String!
    lastName:         String!
    gender:           Gender!
    country:          String!
    touchPoint:       String
  }
    

   
`;
