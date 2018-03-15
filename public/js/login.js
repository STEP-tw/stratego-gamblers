let createRequest = function(callback, url, reqBody=null, method = "GET") {
  let xhr = new XMLHttpRequest();
  xhr.onload = callback;
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(reqBody);
};

const showSignupPopup = () => {
  document.querySelector('.login-form').style.display = 'none';
  document.querySelector('.sign-up-form').style.display = 'block';
};

const login = () => {
  return true;
};

const signedup = function(){
  if(this.status == 200){
    window.location.href = '/login.html';
    return;
  }
  let err = document.querySelector('.error-msg');
  err.innerHTML = 'User already exists';
};

const isValidPassword =(password,confirmPassword)=>{
  return password && password == confirmPassword;
};

const signup = () => {
  let name = document.querySelector('.sign-up-form Input[name="name"]').value;
  let username = document.querySelector('.sign-up-form Input[name="username"]').value;
  let password = document.querySelector('.sign-up-form Input[name="password"]').value;
  let confirmPassword = document.querySelector('.sign-up-form Input[name="confirmPassword"]').value;
  if(isValidPassword(password,confirmPassword)){
    let postData = `name=${name}&username=${username}&password=${password}`;
    createRequest(signedup, `/signup`, postData, "POST");
    return;
  }
  let err = document.querySelector('.error-msg');
  err.innerHTML = 'Password doesn\'t match';
};
