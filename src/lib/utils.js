exports.randomIdGenerator = ()=>{
  return 1000+Math.floor(Math.random()*1000);
};
exports.getTimeInSecond = () => new Date().getTime();