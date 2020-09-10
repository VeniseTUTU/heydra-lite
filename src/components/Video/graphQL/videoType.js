import { gql } from 'apollo-server';

export default gql`
 
  type Query {
    
    getVideos(input: PaginationInput): VideoConnection!
    
  }
  type Mutation {
    addVideo(input: AddVideoInput!): Video!
    addLikes(input: AddLikeInput!): addLikeResponse!
    addCommentLikes(input: AddCommentLikeInput!): addCommentLikeResponse!
    deleteLikes(input: deletelikeInput!): successResponse!
    deleteCommentLikes(input: deleteCommentlikeInput!): successResponse!
    getSearchVideo(input: SearchInput): VideoConnection!
    getPriorVideo(input:  VideoInput!): PriorVideoResponse!
    getEpisodes(input:  EpisodeInput!): [Video]!
    getVideo(input: VideoInput!): Video! 
  }

  
  input EpisodeInput{
    season: String!
    title: String!
  }
  
  input deletelikeInput{
    itemId: Int!
    viewerId: Int
  }

  input deleteCommentlikeInput{
    itemId: Int!
    viewerId: Int
    authorId: Int!
    commentId: Int!
  }
  
  input AddCommentLikeInput{
    itemId: Int!
    authorId: Int!
    commentId: Int!
    viewerId: Int
  }
  
  input AddLikeInput{
    itemId: Int!
    viewerId: Int
  }
  
  input VideoInput{
    itemId: Int!
  }

  input AddVideoInput{
    category:         VideoCategory!
    description:      String!
    genre:            [VideoGenre]!
    itemDuration:     String!
    itemImage:        String!
    itemTitle:        String!
    keywords:         String!
    productionCompany: String
    productionYear:   String
    subCategory:      VideoSubCategory!
    trailerUrl:        String!
    src:              String
    type:             String
    season:           String
    episode:          String
    episodeTitle:     String
    episodeDescription: String
    episodeUrl:         String
  }
  
  input PaginationInput{
    category: String
    pageSize: Int
    after: String
  }
  input SearchInput{
    param: String
    pageSize: Int
    after: String
  }

  type successResponse{
    success: String
  }

  type addCommentLikeResponse{
    success: String
  }
  
  type addLikeResponse{
    status: String
    video: Video
  }

  """
Simple wrapper around list of Videos that contains a cursor
to the last item in the list. Pass this cursor to the Videos'
query to fetch results after these.
"""
  type VideoConnection{
    cursor: String!
    hasMore: Boolean!
    videos: [Video]
  }

  type PriorVideoResponse{
   likes: Int
   video: Video
   queue: [Video]
   supporting: [Video]
   episodes: [Video]
   comments: [Comments]
  }

  type Comments{
    id: Int
    createdAt: String
    comment: String
    likes: Int
    user: Viewer
    
  }

  type Source{
    createdAt: String
    id:        ID!
    sourceId:  Int!
    type:      String
    src:       String
  }

  type Video {
    category:         VideoCategory!
    createdAt:        String!
    description:      String!
    genre:            [VideoGenre]!
    gated:            String
    videoViews:       Int
    id:               ID!
    itemDuration:     String!
    itemId:           Int!
    itemImage:        String!
    itemLink:         String!
    itemTitle:        String!
    productionCompany: String
    productionYear:   String
    subCategory:      VideoSubCategory!
    trailerUrl:        String!
    timeLeft:         String
    source:           [Source]
    season:           String
    episode:          String
    episodeTitle:     String
    episodeDescription: String
  }
  

  enum VideoCategory {
    MOVIES
    TVSERIES
  }

  enum VideoSubCategory {
    TRENDING
    NEW
    STALE
  }

  enum VideoGenre {
    ADVENTURE,
    ACTION,
    WAR,
    SCIENCE_FICTION,
    COMEDY,
    FICTION
  }

`;
