let createRequest = function(callback, url, reqBody = null, method = "GET") {
  let xhr = new XMLHttpRequest();
  xhr.onload = callback;
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(reqBody);
};

const getCreateForm = function() {
  document.getElementById("bluebutton").disabled = true;
  document.getElementById('create').style.display = 'block';
};

const getJoinForm = function() {
  document.getElementById("bluebutton").disabled = true;
  document.getElementById('join').style.display = 'block';
};

const showGameId = function() {
  let sharingKey = this.responseText;
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
  name = name.trim();
  if (name) {
    createRequest(showGameId, `/createGame/${name}`, null, "GET");
  }
};

const redirectToSetupPage = function () {
  if (this.responseText == "true") {
    window.location.href="/setupRedArmy";
    return;
  }
  getGameStatus();
};

const getGameStatus=function () {
  createRequest(redirectToSetupPage,"/isOpponentReady");
};

const startGame = function() {
  reqGameId();
  setInterval(getGameStatus,1000);
};
