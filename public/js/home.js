let createRequest = function(callback, url, reqBody = null, method = "GET") {
  let xhr = new XMLHttpRequest();
  xhr.onload = callback;
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(reqBody);
};

const getInputBox = function(label, name) {
  return `${label}: <input type="text" name=${name} ><br>`;
};

const showGameId=function () {
  let sharingKey = this.responseText;
  let container = document.getElementById("container");
  let sharingKeyMessage = document.createElement("h3");
  sharingKeyMessage.innerText = `Your sharing key is ${sharingKey}`;
  container.appendChild(sharingKeyMessage);
};

const reqGameId=function () {
  let name=document.getElementsByName("name")[0].value;
  createRequest(showGameId,`/gameId/${name}`, null ,"GET");
};

const getButton = function(type, name, text) {
  return `<button type=${type} name=${name} onclick="cb">${text}</button>`;
};

const showCreateGameForm = function() {
  let container = document.getElementById('container');
  let inputBox = getInputBox("Name", "name");
  let gameCreationButton = getButton("button","name","CREATE GAME");
  gameCreationButton = gameCreationButton.replace("cb","reqGameId()");
  container.innerHTML = `${inputBox}<br>${gameCreationButton}`;
};
