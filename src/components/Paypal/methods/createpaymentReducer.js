import config from '../../../../heydra.config';


export default (res) => {

  const USER_IMAGE_URL = process.env.NODE_ENV === 'development' 
  ? process.env.USER_IMAGE_URL_DEV
  :process.env.USER_IMAGE_URL;

  const mod = {
    id: res.id,
    description: res.description,
    invoiceNumber: res.invoice_number,
    state: res.state,
    intent: res.intent,
    payer: res.payer,
    createTime: res.create_time,
      
  }
  
  return mod;
};
