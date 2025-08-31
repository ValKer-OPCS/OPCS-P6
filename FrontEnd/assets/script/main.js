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
 * Displays the provided works in the gallery section of the DOM.
 * @function displayWorks
 * @param {Array<Object>} workLocation - Array of work objects to display.
 * @returns {void}
 */
function displayWorks(workLocation) {
    const divGallery = document.querySelector(".gallery");
    divGallery.innerHTML = "";
    workLocation.forEach(work => {
        const figure = document.createElement('figure');

        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        divGallery.appendChild(figure);
    });

}


/**
 * Initializes the application by fetching and displaying works.
 * @async
 * @function init
 * @returns {Promise<void>}
 */
async function init() {
    const dataWorks = await getWorks();
    displayWorks(dataWorks);
}


init()