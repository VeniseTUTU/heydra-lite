//import initJobs from './cron';
import app from './express';
import { apolloServer } from './apollo';

const dashes = '\n------------------------------------------------\n';

const startServer = () => {
    try{
       app.listen(process.env.PORT || 4000, () => {
            console.log(`${dashes} Heydra is running on ${process.env.PORT || 4000} ... ${dashes}`);
        });

    }catch(e){
        console.log(e);
    }
      
}
    
startServer();

/*
//apolloServer.installSubscriptionHandlers(server);
*/