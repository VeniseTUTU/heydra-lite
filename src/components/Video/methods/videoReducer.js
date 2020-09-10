import config from '../../../../heydra.config';

export default (res,timeLeft,source=null) => {

  const BASE_LINK = process.env.BASE_LINK;
  const POSTER_URL = process.env.NODE_ENV === 'development' 
    ? process.env.POSTER_URL_DEV
    :process.env.POSTER_URL;
  const TRAILER_URL = process.env.NODE_ENV === 'development' 
    ? process.env.TRAILER_URL_DEV
    :process.env.TRAILER_URL;  
 
  const mod = {
    
    category: res.category,
    createdAt: res.createdAt,
    description: res.description,
    genre: res.genre.split(','),
    gated: res.gated,
    videoViews: res.videoViews,
    id:  res.id,
    itemDuration: res.itemDuration,
    itemId:res.itemId,
    itemImage: POSTER_URL+res.itemImage,
    itemLink: BASE_LINK+res.itemLink,
    itemTitle: res.itemTitle,
    productionCompany: res.productionCompany,
    productionYear: res.productionYear,
    subCategory: res.subCategory,
    trailerUrl: TRAILER_URL+res.trailerUrl,
    timeLeft,
    season:res.season,
    episode:res.episode,
    episodeTitle: res.episodeTitle,
  };

  mod.source=source
  
  return mod;
};
