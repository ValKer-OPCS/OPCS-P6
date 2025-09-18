import { handleHttpErrors } from "./httpErrorHandler.js";


/**
 * Asynchronously fetches data from the specified API endpoint.
 *
 * @param {string} endpoint - The API endpoint to fetch data from (appended to the base URL).
 * @returns {Promise<any>} A promise resolving to the JSON data retrieved from the API.
 * @throws {Error} Throws an error if the HTTP response is not ok or if a network error occurs.
 */
export async function getFrom(endpoint) {
    let response;

    try {
        response = await fetch('http://127.0.0.1:5678/api/' + endpoint);
    } catch {
        throw new Error("Une erreur est survenue lors de la connexion.");
    }

    if (!response.ok) {
        const message = handleHttpErrors(response);
        throw new Error(message);
    }

    return response.json();
}


/**
 * Attempts to log in a user by sending a POST request with the form data.
 *
 * @param {HTMLFormElement} form - The HTML form element containing login data with 'email' and 'password' fields.
 * @param {Function} [onLoginFailed] - Optional callback function that is invoked if the login fails. It receives the HTTP response as an argument.
 * @returns {Promise<boolean>} A promise that resolves to true if login is successful, or false if the login fails or an error occurs.
 * @throws {Error} Throws an error if a network error occurs during the login process.
 */
export async function postToLogin(form) {
    try {
        const response = await fetch('http://127.0.0.1:5678/api/' + "users/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password,
            }),
        });

        if (!response.ok) {
            
            const message = handleHttpErrors(response);
            return { success: false, message };
        }

        const data = await response.json();
        sessionStorage.setItem("token", data.token);
        return { success: true };

    } catch (error) {
        return { success: false, message: "Une erreur est survenue lors de la connexion." };
    }
}

/**
 * Deletes a work from the backend API using its ID.
 *
 * @async
 * @function deleteWork
 * @param {number|string} workId - The unique identifier of the work to delete.
 *
 * @returns {Promise<boolean>} A promise that resolves to `true` if deletion succeeded, or `false` if it failed.
 */
export async function deleteWork(workId) {
    let response;

    try {
        response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    } catch {
        // Problème de connexion (serveur éteint, DNS, CORS…)
        return { success: false, message: "Une erreur est survenue lors de la connexion." };
    }

    if (!response.ok) {
        const errorMessage = handleHttpErrors(response);
        return { success: false, message: errorMessage };
    }

    console.log(`Work ${workId} supprimé avec succès`);
    return { success: true };
}

/**
 * Sends a new work to the backend API to be added to the gallery.
 *
 * @async
 * @function sendItem
 * @param {Object} params - The work data to send.
 * @param {string} params.title - The title of the work.
 * @param {number|string} params.category - The category ID of the work.
 * @param {File} params.image - The image file of the work.
 *
 * @returns {Promise<Object>} A promise that resolves to the newly created work object.
 *
 * @throws {Error} Throws an error if the request fails or the server responds with an error.
 */
export async function postWork({ title, category, image }) {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("category", parseInt(category, 10));
  formData.append("image", image);

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