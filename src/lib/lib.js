exports.getFrequency = list=>{
  let frequencies = {};
  for(let index=0;index<list.length;index++){
    let element = list[index];
    if(!frequencies[element]){
      frequencies[element]= 0;
    }
    frequencies[element]++;
  }
  return frequencies;
};

exports.isEquivalent = (obj1, obj2)=>{
  let obj1Props = Object.getOwnPropertyNames(obj1);
  let obj2Props = Object.getOwnPropertyNames(obj2);
  if (obj1Props.length != obj2Props.length) {
    return false;
  }
  for (let index = 0;index < obj1Props.length;index++) {
    let propName = obj1Props[index];
    if (obj1[propName] !== obj2[propName]){
      return false;
    }
  }
  return true;
};

exports.filterFrom = function(array) {
  return function(element) {
    return array.includes(element);
  };
};

exports.filterNotIn = function (array1,array2) {
  return function(element){
    return !array1.includes(element) && !array2.includes(element);
  };
};
