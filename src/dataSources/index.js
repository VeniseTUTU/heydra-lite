import UserAPI from './UserAPI'; 
import Authenticate from './Authenticate'; 
import ViewerAPI from './ViewerAPI';
import VideoAPI from './VideoAPI';
import HistoryAPI from './HistoryAPI';
import TransactionAPI from './TransactionAPI';
import PaginateResults from './PaginateResults';
import Verify from './Verify';    
import PaypalAPI from './PaypalAPI';   
import ClientMailAPI from './ClientMailAPI';

import {generateApiKeyPair,userReducer,UserEmitter,email_template,confirm_email_template} from '../components/User/methods'; 
import {viewerReducer,includeTimeLeft} from '../components/Viewer/methods';
import {videoReducer} from '../components/Video/methods';
import {historyReducer} from '../components/History/methods';
import {transactionReducer} from '../components/Transaction/methods';
import {recepient_email_template,sender_email_template} from '../components/ClientMail/methods'; 

/**
 * Single DataSource of truth
 * @namespace heydra/src
 */
export default {
  PaypalAPI: new PaypalAPI({ methods: {
    transactionReducer
  } }),
  TransactionAPI: new TransactionAPI({ methods: {
    transactionReducer,
  }
  }),
  ClientMailAPI: new ClientMailAPI({ methods: {
    recepient_email_template,
    sender_email_template
  } }),
  Authenticate: new Authenticate({ methods: {} }),
  Verify: new Verify({ methods: {} }),
  PaginateResults: new PaginateResults({ methods: {} }),
  UserAPI: new UserAPI({ methods: {
      generateApiKeyPair,
      userReducer,
      includeTimeLeft,
      videoReducer,
      //UserEmitter,
      email_template,
      confirm_email_template,
    },
  }),
  ViewerAPI: new ViewerAPI({ methods: {
    viewerReducer,
    videoReducer,
    includeTimeLeft,
  } }),
  VideoAPI: new VideoAPI({ methods: {
    videoReducer,
    viewerReducer,
    includeTimeLeft,
  } }),
  HistoryAPI: new HistoryAPI({ methods: {
    historyReducer,
    includeTimeLeft,
    videoReducer,
  } }),
  
 
};
