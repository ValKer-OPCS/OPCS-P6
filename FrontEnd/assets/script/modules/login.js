import  {postToLogin} from "../modules/fetcher.js";
import { handleHttpErrors } from "./httpErrorHandler.js";


/**
 * Initializes the login process by setting up the login submission event listener.
 *
 * @function loginInit
 */
function loginInit(){
  loginSubmit()
}


/**
 * Attaches a submit event listener to the document that handles login form submissions.
 * Prevents the default form submission behavior, retrieves the user's email and password,
 * and attempts to log in via the postToLogin function. If the login is successful, the user is redirected
 * to the homepage.
 *
 * @async
 * @function loginSubmit
 * @returns {Promise<void>} A promise that resolves once the login submission process is complete.
 */
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


/**
 * Handles a failed login attempt by processing the error response and displaying an appropriate error message.
 * The error message is extracted using the handleHttpErrors function and then displayed in the
 * designated error field element.
 *
 * @function loginFailed
 * @param {Object} response - The HTTP error response object received from the login attempt.
 */
export function loginFailed(response) {
  const errorField = document.getElementById("errorField");

  if (errorField) {
    const message = handleHttpErrors(response);
    errorField.innerText = message;
  }
}





loginInit()

