import config from '../../../../heydra.config';


export default (res) => {

  const USER_IMAGE_URL = process.env.NODE_ENV === 'development' 
  ? process.env.USER_IMAGE_URL_DEV
  :process.env.USER_IMAGE_URL;

  const mod = {
    id:                   res.id,
    viewerId:             res.viewerId,
    status:               res.status,
    amount:               res.amount,
    quantity:             res.quantity,
    recurring:            res.recurring,
    subscriptionId:       res.subscriptionId,
    subscriptionPlan:     res.subscriptionPlan,
    subscriberFirstName:  res.subscriberFirstName,
    subscriberLastName:   res.subscriberLastName,
    subscriberEmail:      res.subscriberEmail,
    planId:               res.planId,
    gateway:              res.gateway,
    startDate:            res.startDate,
    dueDate:              res.dueDate,
    createdAt:            res.createdAt
      
  }
  
  return mod;
};
