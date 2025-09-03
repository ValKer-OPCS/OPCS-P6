import  {loginFailed} from "../modules/login.js";

const baseUrl = 'http://127.0.0.1:5678/api/';

/**
 * Fetches data from the specified API resource.
 *
 * @async
 * @param {string} resource - The API resource endpoint to fetch data from.
 * @returns {Promise<any>} The data returned from the API.
 */
export async function getFrom(endpoint) {

    try {
        const response = await fetch(baseUrl + endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}


export async function postTo(endpoint,form) {
    try {
        const response = await fetch(baseUrl + endpoint, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: form.email.value,
                password: form.password.value,
            }),
        });

        if (!response.ok) {
            loginFailed();
            return;
            

        }

        const data = await response.json();
        sessionStorage.setItem("token", data.token);
        window.location.replace("../index.html");
    } catch (error) {
        alert(error.message || "Une erreur est survenue lors de la connexion");
        console.error("Erreur login:", error);
    }
}
