import { clearHTMLElement } from "./utils.js";
import { getFrom } from "./fetcher.js";


/**
 * Initializes the works section by fetching works data and displaying it in the gallery.
 * 
 * @async
 * @function worksInit
 * @returns {Promise<void>} Resolves when works have been fetched and displayed.
 */
export async function getWorksInit(endpoint, elementId) {
    const fetchedWorks = await getFrom(endpoint);
    displayWorks(fetchedWorks, elementId);
}


/**
 * Displays a list of works by creating figure elements with images and captions.
 *
 * @param {Array<Object>} workLocation - Array of work objects, each containing `imageUrl` and `title` properties.
 * @param {string} elementSelection - CSS selector string for the container element where works will be displayed.
 */
export function displayWorks(workLocation, elementSelection) {

    clearHTMLElement(elementSelection);
    const displayContainer = document.querySelector(elementSelection)

    workLocation.forEach(work => {
        const figure = document.createElement('figure');
        figure.innerHTML =`<img src="${work.imageUrl}" alt="${work.title}"><figcaption>${work.title}</figcaption>`;
        displayContainer.appendChild(figure);
    });

}