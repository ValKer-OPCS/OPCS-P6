import  {postTo} from "../modules/fetcher.js";

document.addEventListener("submit", (submitButton) => {
  submitButton.preventDefault();
  let form = {
    email: document.getElementById("email"),
    password: document.getElementById("password"),
  };

  postTo('users/login',form)
});


export function loginFailed() {
  const errorField = document.getElementById('errorField');
  if (errorField) {
    errorField.innerText = 'Email ou mot de passe erronés';
  }
}