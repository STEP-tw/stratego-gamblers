window.onload=function(){
  drawGrid('battlefield',10,10,90);
  let reqListener = function(){
    let battlefield = JSON.parse(this.responseText);
    updateBattleField(battlefield);
  };
  doXhr('/battlefield','GET',reqListener,'',()=>{
    console.log("fail");
  });
};
