exports.randomIdGenerator = ()=>{
  return Math.floor(Math.random()*10000);
};
exports.getTimeInSecond = () => new Date().getTime();