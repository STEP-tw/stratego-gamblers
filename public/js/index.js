let createRequest = function(callback, url, reqBody=null, method = "GET") {
  let xhr = new XMLHttpRequest();
  xhr.onload = callback;
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(reqBody);
};

const hideElements = function() {
  document.getElementById('redbutton').style.visibility = 'hidden';
  document.getElementById('bluebutton').style.visibility = 'hidden';
  document.getElementById('helpButton').style.visibility = 'hidden';
};

const getCreateForm = function() {
  hideElements();
  document.getElementById("bluebutton").disabled = true;
  document.getElementById('create').style.display = 'block';
};

const getJoinForm = function() {
  hideElements();
  document.getElementById("bluebutton").disabled = true;
  document.getElementById('join').style.display = 'block';
};

const showGameId = function() {
  let sharingKey = this.responseText;
  if(!sharingKey){
    let message = `No special characters allowed (Ex. @,$,&) <br>
    Start with a character only (Ex. sayima, Sayima, Sayima123)`;
    document.getElementById('errorMsg').innerHTML = message;
    getCreateForm();
    return;
  }
  let createForm = document.getElementById("create");
  createForm.style.display = "none";
  let sharingKeyDiv = `<div class="alert" id="waiting-message">
    <div>
      <p>Your sharing key is {sharing-key}</p>
      <p>Please wait for the opponent to join</p>
    </div>
  </div>`;
  sharingKeyDiv = sharingKeyDiv.replace("{sharing-key}", sharingKey);
  let container = document.getElementsByClassName("column-middle")[0];
  container.innerHTML = sharingKeyDiv;
};

const reqGameId = function() {
  let name = document.getElementsByName("name")[0].value;
  let mode = document.querySelector('input[name="gameMode"]:checked').value;
  name = name.trim();
  if (name) {
    createRequest(showGameId, `/createGame/${name}/${mode}`, null, "GET");
    setInterval(getGameStatus,1000);
  }
};

const redirectToSetupPage = function () {
  if (this.responseText == "true") {
    window.location.href ="/setupArmy";
  }
};

const getGameStatus=function () {
  createRequest(redirectToSetupPage,"/hasOpponentJoined");
};

const startGame = function() {
  reqGameId();
};

const showHelp = function(){
  window.location.href='/help.html';
};

const closePopup = function(){
  document.getElementById('create').style.display = 'none';
  document.getElementById('redbutton').style.visibility = 'visible';
  document.getElementById('bluebutton').style.visibility = 'visible';
  document.getElementById('helpButton').style.visibility = 'visible';
};
