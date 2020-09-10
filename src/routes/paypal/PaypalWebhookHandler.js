import getMainAppContext from '../../context/getMainAppContext';
//import { PAYSTACK_SECRET_KEY } from '~/config';

export default async (req, res) => {
  const context = getMainAppContext();
  const {prisma,dataSources: { Authenticate } } = context;

  const createSubId = () => {
    const dateString = new Date()
      .toISOString()
      .replace(new RegExp('\\D', ['g']), '')
      .substring(0, 4);
  
    const rand4 = Math.floor(Math.random() * (99999 - 11111) + 11111);
    return `${dateString}${rand4}`;
  }; 

   /*
  // validate event
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');

  // eslint-disable-next-line eqeqeq
  if (hash == req.headers['x-paystack-signature']) {
    // Retrieve the request's body
    const event = req.body;
  }
  */

  try{

    const paypalheaders =  req.headers;
    const paypaldata =  req.body;
    
    const payload = JSON.parse(JSON.stringify(paypaldata));
    const {event_type,resource:{billing_agreement_id,create_time,id}} = payload;
    
    const newsubscriptionId = `${billing_agreement_id}-${createSubId()}`;
    const date = new Date(create_time);
    const dueDate = new Date(date.setMonth(date.getMonth()+1));
    const subscriptionId = billing_agreement_id && billing_agreement_id.split('-').length > 1 
                            ? newsubscriptionId 
                            : billing_agreement_id || id;
    console.log(subscriptionId);
    const response = await prisma.transactions.findOne({ 
      where: {subscriptionId: billing_agreement_id && billing_agreement_id.split('-').length > 1 
      ? billing_agreement_id 
      : billing_agreement_id || id}
    });
    
    const transactionData = {
      viewerId: response.viewerId,
      quantity:1,
      subscriptionId,
      subscriptionPlan: response.subscriptionPlan,
      subscriberFirstName: response.subscriberFirstName,
      subscriberLastName: response.subscriberLastName,
      subscriberEmail: response.subscriberEmail,
      planId: response.planId,
      gateway: 'Paypal',
      startDate: new Date(create_time), 
      dueDate, 
      createdAt: new Date(create_time), 
    };

    switch(event_type){
      case "PAYMENT.SALE.COMPLETED":
      const {resource:{amount:{total}}} = payload;
      const transaction = await prisma.transactions.upsert({ 
        where: {subscriptionId},
        update: {...transactionData,amount:total,status:'active'},
        create: {...transactionData,amount:total,status:'active'},
      });

      const billing = await prisma.billing.update({ 
        where: {billingId: response.viewerId},
        data: {subscriptionId,status:'active'}
      });

      break;
      case "BILLING.SUBSCRIPTION.PAYMENT.FAILED":
      const {resource:{billing_info:{last_failed_payment:{amount:{value}}}}} = payload;
      const failedresponse = await prisma.transactions.upsert({ 
        where: {subscriptionId:transactionData.subscriptionId},
        update: {...transactionData,amount:value,status:'failed'},
        create: {...transactionData,amount:value,status:'failed'},
      });

      break;
      
      default:
      break;
    }

  }catch(e){
    console.log(e);  
  }
 
  res.sendStatus(200);
  return null;
};
