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

const getForm = function(formType) {
  hideElements();
  document.getElementById(formType).style.display = 'block';
};

const showGameId = function() {
  if(this.status != 200){
    let message = `No special characters allowed (Ex. @,$,&) <br>
    Start with a character only (Ex. sayima, Sayima, Sayima123)`;
    document.getElementById('creationError').innerHTML = message;
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
  sharingKeyDiv = sharingKeyDiv.replace("{sharing-key}", this.responseText);
  let container = document.getElementsByClassName("column-middle")[0];
  container.innerHTML = sharingKeyDiv;
  setInterval(getGameStatus,1000);
};

const startGame = function() {
  let name = document.getElementsByName("name")[0].value;
  let type = document.querySelector('input[name="gameMode"]:checked').value;
  name = name.trim();
  let postData = `name=${name}&type=${type}`;
  if (name) {
    createRequest(showGameId, `/createGame`, postData, "POST");
  }
};

const showError = function(){
  if(this.status != 200){
    let message = ` ${this.responseText}<br>
    No special characters allowed (Ex. @,$,&) <br>
    Start with a character only (Ex. sayima, Sayima, Sayima123)`;
    document.getElementById('joiningError').innerHTML = message;
    getJoinForm();
    return;
  }
  setInterval(getGameStatus,1000);
};

const joinGame = function(){
  let name = document.getElementsByName("name")[1].value;
  let gameId = document.getElementsByName("gameid")[0].value;
  name = name.trim();
  let postData = `name=${name}&gameId=${gameId}`;
  if (name) {
    createRequest(showError, `/joinGame`, postData, "POST");
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

const showHelp = function(){
  window.location.href='/help.html';
};

const closePopup = function(){
  document.getElementById('create').style.display = 'none';
  document.getElementById('redbutton').style.visibility = 'visible';
  document.getElementById('bluebutton').style.visibility = 'visible';
  document.getElementById('helpButton').style.visibility = 'visible';
};

const showSignupPopup = () => {
  document.querySelector('.login-form').style.display = 'none';
  document.querySelector('.sign-up-form').style.display = 'block';
};
