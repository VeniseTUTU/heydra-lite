
export default (res) => {

  const USER_IMAGE_URL = process.env.NODE_ENV === 'development' 
  ? process.env.USER_IMAGE_URL_DEV
  :process.env.USER_IMAGE_URL;

  const mod = {
    apiKey: res.apiKey,
    apiSecret: res.apiSecret,
    createdAt: res.createdAt,
    email: res.email,
    id: res.id,
    isEmailConfirmed: res.isEmailConfirmed,
    passPhrase: res.passPhrase,
    status: res.status,
    token: res.token,
    userId: res.userId,
    userType: res.userType,
    verifyString: res.verifyString,
    
  }
  mod.viewer={
    alias: res.viewer.alias,
    country: res.viewer.country, 
    viewerId: res.viewerId,
    firstName: res.viewer.firstName,
    id: res.viewer.id,
    imageUrl: res.viewer.imageUrl ===null ? res.viewer.imageUrl : USER_IMAGE_URL+res.viewer.imageUrl,
    lastName: res.viewer.lastName,
    touchPoint: res.viewer.touchPoint,
    phone: res.viewer.phone,
    gender: res.viewer.gender,
    dateofBirth: res.viewer.dateofBirth,
    
  };

  mod.billing={
      id: res.billing.id,
      billingId: res.billing.billingId,
      subscriptionId: res.billing.subscriptionId || '',
      status: res.billing.status,
      recurring: res.billing.recurring,
      
    };
  
  return mod;
};
