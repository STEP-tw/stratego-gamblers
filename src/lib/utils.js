exports.randomIdGenerator = ()=>{
  return 1000+Math.floor(Math.random()*9000);
};
exports.getTimeInSecond = () => new Date().getTime();