import {PrismaClient} from '@prisma/client';
import dataSources from '../dataSources';
const prisma = new PrismaClient();

//const getDatasources = () => dataSources;

export default (opts) => {
  const context = {prisma};
  context.dataSources = dataSources;

  return context;
};
