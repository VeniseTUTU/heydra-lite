import { mergeTypes } from 'merge-graphql-schemas';
import  userType  from '../components/User/graphQL/userType';
import viewerType from '../components/Viewer/graphQL/viewerType';
import videoType from '../components/Video/graphQL/videoType';
import historyType from '../components/History/graphQL/historyType';
import transactionType from '../components/Transaction/graphQL/transactionType';
import paypalType from '../components/Paypal/graphQL/paypalType';
import clientmailType from '../components/ClientMail/graphQL/clientmailType';

const types = [
    userType,
    viewerType,
    videoType,
    historyType,
    transactionType,
    paypalType,
    clientmailType
];

export default mergeTypes(types, {all: true});