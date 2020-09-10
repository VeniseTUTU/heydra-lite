import config from '../../../../heydra.config';


export default (res) => {

  const USER_IMAGE_URL = process.env.NODE_ENV === 'development' 
  ? process.env.USER_IMAGE_URL_DEV
  :process.env.USER_IMAGE_URL;

  const mod = {
    alias: res.alias,
    country: res.country, 
    viewerId: res.viewerId,
    firstName: res.firstName,
    id: res.id,
    imageUrl: res.imageUrl ===null ? res.imageUrl : USER_IMAGE_URL+res.imageUrl,
    lastName: res.lastName,
    touchPoint: res.touchPoint,
    phone: res.phone,
    gender: res.gender,
    dateofBirth: res.dateofBirth,
    user:{
      apiKey: res.user.apiKey,
      apiSecret: res.user.apiSecret,
      createdAt: res.user.createdAt,
      email: res.user.email,
      id: res.user.id,
      isEmailConfirmed: res.user.isEmailConfirmed,
      passPhrase: res.user.passPhrase,
      status: res.user.status,
      token: res.user.token,
      userId: res.user.userId,
      userType: res.user.userType,
      verifyString: res.user.verifyString,

      
    }
  }
  
  return mod;
};
