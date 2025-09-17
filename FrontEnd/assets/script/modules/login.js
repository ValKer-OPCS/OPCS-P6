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
async function loginSubmit() {
    document.addEventListener("submit", async (event) => {
        event.preventDefault();

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const errorField = document.getElementById("errorField");

        errorField.innerText = "";

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(emailInput.value)) {
            errorField.innerText = "Le format de l'adresse mail est incorrect";
            return;
        }

        if (!passwordInput.value.trim()) {
            errorField.innerText = "Le mot de passe ne peut pas être vide";
            return;
        }

        const form = {
            email: emailInput.value,
            password: passwordInput.value,
        };

        const result = await postToLogin(form);

        if (result.success) {
            window.location.replace("../index.html");
        } else {
            errorField.innerText = result.message;
        }
    });
}





loginInit()

