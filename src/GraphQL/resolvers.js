import { mergeResolvers } from 'merge-graphql-schemas';
import userResolver from '../components/User/graphQL/userResolver';
import viewerResolver from '../components/Viewer/graphQL/viewerResolver';
import videoResolver from '../components/Video/graphQL/videoResolver';
import historyResolver from '../components/History/graphQL/historyResolver';
import transactionResolver from '../components/Transaction/graphQL/transactionResolver';
import paypalResolver from '../components/Paypal/graphQL/paypalResolver';
import clientmailResolver from '../components/ClientMail/graphQL/clientmailResolver';

const resolvers = [
    userResolver,
    viewerResolver,
    videoResolver,
    historyResolver,
    transactionResolver,
    paypalResolver,
    clientmailResolver,
];

export default mergeResolvers(resolvers);  // mergTypes (types, {all: true});