import { postToLogin } from "../modules/fetcher.js";
import { startCountdown } from "./utils.js";

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
    if (sessionStorage.getItem("token")) {
        const loginForm = document.getElementById('loginForm');
        const loginHeader = document.getElementById('loginHeader');
        const forgotPW = document.getElementById('forgotPW');
        const timerSpan = document.createElement('span');
        loginForm.style.display ='none';
        loginHeader.textContent = 'Vous êtes déjà connecté.';
        loginHeader.style.textAlign = 'center';
        forgotPW.textContent = 'Redirection dans ';
        timerSpan.id = 'timer';
        timerSpan.textContent = '5';
        forgotPW.appendChild(timerSpan);
        forgotPW.appendChild(document.createTextNode(' secondes'));


        startCountdown('../index.html', 5);
    }
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
            if (result.message === "Ressource introuvable.") {
                errorField.innerText = "Email ou mot de passe incorrect. Veuillez réessayer.";
                return
            }
            errorField.innerText = result.message;
        }
    });
}





loginSubmit()

