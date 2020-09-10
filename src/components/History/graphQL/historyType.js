import { gql } from 'apollo-server';

export default gql`
 
  type Query {
    getHistories(input: PaginationInput): HistoryConnection!
  }
  type Mutation {
    addHistory(input: AddHistoryInput!): History!
  }

  input AddHistoryInput{
    itemId:    Int!
    timeLeft:  String!
    
  }
  
  input PaginationInput{
    pageSize: Int
    after: String
  }

  """
Simple wrapper around list of Histories that contains a cursor
to the last item in the list. Pass this cursor to the Histories'
query to fetch results after these.
"""
  type HistoryConnection{
    cursor: String!
    hasMore: Boolean!
    histories: [History]
  }

  type History {
    createdAt: String
    video: Video
    
  }

  enum HistoryStatus {
    EXITED
    ENDED
  }

`;
