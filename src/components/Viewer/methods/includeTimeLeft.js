export default (historyArr,videoId) => {
  let timeLeft = null;
  const ids = historyArr.map((history) => (history.itemId));
    if (ids.includes(videoId)) {
        const hisObj = historyArr.find((history) => (history.itemId === videoId))
        timeLeft = hisObj.timeLeft;
    }
  return timeLeft;
};