import {ApolloServer} from 'apollo-server-express';
require('dotenv').config();
import {makeExecutableSchema} from 'graphql-tools/';
import {PrismaClient, prismaVersion} from '@prisma/client';

import typeDefs from './GraphQL/typeDefs';
import resolvers from './GraphQL/resolvers';
import dataSources from './dataSources';


const prisma = new PrismaClient();

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const apolloServer = new ApolloServer({
    schema,
    dataSources: () => (dataSources),
    context: ({req}) => {
       return {req,prisma}
        
    },
    playground: { version: '1.7.25'},
    version: prismaVersion.client,
   
});

export{
    apolloServer
}




