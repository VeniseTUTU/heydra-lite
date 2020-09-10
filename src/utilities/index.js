
export const stripWhiteSpaceAndLowCap = (string) => {
    const lowercase = string.toLowerCase().replace(/ /g, '');
      return lowercase;
};

export const deDupArray = (arr,key) => {
   /*
  let store = [];
  let result = [];
    arr.map((item) => {
      if (!store.length) result; 
      if (!store.includes(item[key])) result.push(item);
      store.push(item[key]);
      });
    return result; 
    */
   
return arr.filter((x, index,newArray) => 
 index === newArray.findIndex((t) => (
	 t[key] === x[key]
 ))
)
  
  };
export const rounNumberToPresision = (num,presision) => {
  const mult = Math.pow(10, presision || 0);
  return Math.round(num * mult) / mult;
}


 


