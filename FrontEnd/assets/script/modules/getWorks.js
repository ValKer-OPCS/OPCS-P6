import  {clearHTMLElement} from "./utils.js";

/**
 * Fetches the list of works from the API.
 * @async
 * @function getWorks
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of work objects.
 */
async function getWorks() {
    const responseWorks = await fetch('http://127.0.0.1:5678/api/works');
    const dataWorks = await responseWorks.json();
    console.log(dataWorks);
    return dataWorks;
}


/**
 * Displays a list of works in the specified DOM element.
 * @function displayWorks
 * @param {Array<Object>} workLocation - Array of work objects to display.
 * @param {string} elementSelection - CSS selector for the target DOM element.
 * @returns {void}
 */
function displayWorks(workLocation, elementSelection) {

    clearHTMLElement('.gallery');
    const displayLocation = document.querySelector(elementSelection)

    workLocation.forEach(work => {
        const figure = document.createElement('figure');

        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        displayLocation.appendChild(figure);
    });

}


/**
 * Initializes the works display by fetching data and rendering it.
 * @async
 * @function worksInit
 * @returns {Promise<void>} A promise that resolves when initialization is complete.
 */
export async function worksInit(){
    const dataWorks = await getWorks();
    displayWorks(dataWorks,'.gallery');
}

