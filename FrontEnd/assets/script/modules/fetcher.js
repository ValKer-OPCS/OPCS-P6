import { handleHttpErrors } from "./httpErrorHandler.js";
const baseUrl = 'http://127.0.0.1:5678/api/';

/**
 * Asynchronously fetches data from the specified API endpoint.
 *
 * @param {string} endpoint - The API endpoint to fetch data from (appended to the base URL).
 * @returns {Promise<any>} A promise resolving to the JSON data retrieved from the API.
 * @throws {Error} Throws an error if the HTTP response is not ok or if a network error occurs.
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


/**
 * Attempts to log in a user by sending a POST request with the form data.
 *
 * @param {HTMLFormElement} form - The HTML form element containing login data with 'email' and 'password' fields.
 * @param {Function} [onLoginFailed] - Optional callback function that is invoked if the login fails. It receives the HTTP response as an argument.
 * @returns {Promise<boolean>} A promise that resolves to true if login is successful, or false if the login fails or an error occurs.
 * @throws {Error} Throws an error if a network error occurs during the login process.
 */
export async function postToLogin(form, onLoginFailed) {
    try {
        const response = await fetch(baseUrl + "users/login", {
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
            handleHttpErrors(response);

            if (typeof onLoginFailed === "function") {
                onLoginFailed(response);
            }

            return false;
        }

        const data = await response.json();
        sessionStorage.setItem("token", data.token);
        return true;

    } catch (error) {
        alert(error.message || "An error occurred while trying to log in.");
        console.error("Login error:", error);
        return false;
    }
}


// Fonction pour supprimer un work via l'API

export async function deleteWork(workId) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            const errorMessage = handleHttpErrors(response);
            throw new Error(errorMessage);
        }

        console.log(`Work ${workId} supprimé avec succès`);
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}


export async function sendItem({ title, category, image }) {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("category", parseInt(category, 10)); // conversion obligatoire
  formData.append("image", image);

  // Debug pour voir ce que tu envoies
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const message = handleHttpErrors(response);
    throw new Error(message);
  }

  return await response.json();
}