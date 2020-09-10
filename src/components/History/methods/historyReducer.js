import config from '../../../../heydra.config';

export default (res) => {

  const mod = {
    
    itemId: res.itemId,
    status: res.status,
    timeLeft: res.timeLeft,
    viewerId: res.viewerId,

  }
  
  return mod;
};
