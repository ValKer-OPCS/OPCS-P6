import { clearHTMLElement } from "./utils.js";

/**
 * Initializes the works display by fetching data and rendering it.
 * @async
 * @function worksInit
 * @returns {Promise<void>} A promise that resolves when initialization is complete.
 */
export async function worksInit() {
    const fetchedWorks = await getWorks();
    displayWorks(fetchedWorks, '.gallery');
}



/**
 * Fetches the list of works from the API.
 * @async
 * @function getWorks
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of work objects.
 */
async function getWorks() {
    const response = await fetch('http://127.0.0.1:5678/api/works');
    const data = await response.json();
    console.log(data);
    return data;
}



/**
 * Displays a list of works by creating figure elements and appending them to the specified DOM element.
 *
 * @param {Array<Object>} workLocation - An array of work objects, each containing `imageUrl` and `title` properties.
 * @param {string} elementSelection - A CSS selector string for the DOM element where the works will be displayed.
 */
function displayWorks(workLocation, elementSelection) {

    clearHTMLElement(elementSelection);
    const displayContainer = document.querySelector(elementSelection)

    workLocation.forEach(work => {
        const figure = document.createElement('figure');
        figure.innerHTML =`<img src="${work.imageUrl}" alt="${work.title}"><figcaption>${work.title}</figcaption>`;
        displayContainer.appendChild(figure);
    });

}