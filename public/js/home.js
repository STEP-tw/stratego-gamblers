const getGameCreationForm=function () {
  return `<form  action="create_game" method="post">
    Name: <input type="text" name="name" ><br>
    <button type="submit" name="button">CREATE GAME</button>
  </form>`
};

const showCreateGameForm=function () {
  let container=document.getElementById('container');
  let createForm = getGameCreationForm()
  container.innerHTML = createForm;
};
