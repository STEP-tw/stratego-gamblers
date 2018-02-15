const getInputBox=function (label,name) {
  return `${label}: <input type="text" name=${name} ><br>`;
};

const getButton=function (type, name, text, cb = null) {
  return `<button type=${type} name=${name} onclick=${cb}()>${text}</button>`;
};

const showCreateGameForm=function () {
  let container=document.getElementById('container');
  let inputBox = getInputBox("Name","name");
  let gameCreationButton = getButton("button", "name", "CREATE GAME");
  container.innerHTML = `${inputBox}<br>${gameCreationButton}`;
};
