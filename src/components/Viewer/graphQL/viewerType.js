import { gql } from 'apollo-server';

export default gql`
 
  type Query {
    getViewer(input: ViewerInput!): Viewer!
    getViewers(input: PaginationInput): ViewerConnection!
    getViewerContent(input: ViewerContentInput): ViewerContent!
  }

  type Mutation {
    addComment(input: CommentInput!): Comments!
    updateViewer(input: UpdateInput!): Viewer!
  }

  
  input UpdateInput{
    firstName: String
    lastName: String
    phone: String
    dateOfBirth: String
  }

  input AddViewerInput {
    phone:            String
    firstName:        String!
    lastName:         String!
    gender:           Gender!
    country:          String!
    touchPoint:       String
    
  }
 
  input CommentInput{
    itemId: Int!
    viewerId: Int
    comment: String!
  }

  input ViewerInput{
    viewerId: Int!
  }
  
  input PaginationInput{
    pageSize: Int
    after: String
  }
  input ViewerContentInput{
    category: String
  }

  """
Simple wrapper around list of Viewers that contains a cursor
to the last item in the list. Pass this cursor to the Viewers'
query to fetch results after these.
"""
  type ViewerConnection{
    cursor: String!
    hasMore: Boolean!
    viewers: [Viewer]
  }

  type Viewer {
    country:     String
    gender:      Gender
    viewerId:    Int
    firstName:  String
    id:         ID!
    imageUrl:   String
    lastName:   String
    phone:      String
    touchPoint: String
    dateofBirth: String
    user:       User
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
  }


  type ViewerContent{
    histories: [Video]
    videos: [Video]
    suggestions: [Video]
  }

`;
