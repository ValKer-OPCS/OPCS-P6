import  {postToLogin} from "../modules/fetcher.js";

function loginInit(){
  loginSubmit()
}

async function loginSubmit(){
  document.addEventListener("submit", async (submitButton) => {
  submitButton.preventDefault();

  let form = {
    email: document.getElementById("email"),
    password: document.getElementById("password"),
  };

  const loginOk = await postToLogin(form, loginFailed);

  if (loginOk) {
    window.location.replace("../index.html");
  } 
});}



export function loginFailed() {
  const errorField = document.getElementById('errorField');
  if (errorField) {
    errorField.innerText = 'Email ou mot de passe erronés';
  }
}





loginInit()

