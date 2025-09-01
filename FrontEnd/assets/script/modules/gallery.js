// This module fetches works and categories from an API and dynamically displays them in a gallery with interactive filter buttons.
// It provides functions to render works as <figure> elements with images and captions, 
// generate category filter buttons including an “All” button, 
// and handle button states so only the selected filter appears active. 
// Clicking a category filters the displayed works accordingly, while clicking “All” shows all works. 
// The module combines asynchronous data fetching, DOM manipulation, and event handling to create a responsive, 
// filterable gallery interface.


import { clearHTMLElement } from "./utils.js";
import { getFrom } from "./fetcher.js";

export async function galleryInit() {
    const images = await getFrom('works')
    const categories = await getFrom('categories')
    displayWorks('.gallery', images)
    displayFilter('.filter-btn-container', categories, images)
}



/**
 * Displays a list of works by creating figure elements and appending them to the specified container.
 *
 * @param {Array<Object>} workLocation - Array of work objects, each containing `imageUrl` and `title` properties.
 * @param {string} elementSelection - CSS selector string for the container element where works will be displayed.
 */
function displayWorks(elementSelection, imagesArray) {
    clearHTMLElement(elementSelection);
    const displayContainer = document.querySelector(elementSelection);

    imagesArray.forEach(work => {
        const figure = document.createElement('figure');
        figure.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}"><figcaption>${work.title}</figcaption>`;
        displayContainer.appendChild(figure);
    });

}




/**
 * Renders filter buttons for categories and attaches event handlers to filter displayed works.
 *
 * @param {Array<{name: string}>} filterLocation - Array of category objects, each with a 'name' property.
 * @param {string} elementSelection - CSS selector for the container element where filter buttons will be rendered.
 *
 * @returns {void}
 */
function displayFilter(elementSelection, filterLocation, images) {
    clearHTMLElement(elementSelection);
    const filterContainer = document.querySelector(elementSelection);

    function createFilterButton(label, onClick, isActive = false) {
        const button = document.createElement('button');
        button.textContent = label;
        button.classList.add('filter-btn');
        if (isActive) button.classList.add('filter-btn-active');
        button.addEventListener('click', () => {
            setActiveButton(button);
            onClick();
        });
        filterContainer.appendChild(button);
    }

    createFilterButton("Tous", () => displayWorks('.gallery', images), true);

    filterLocation.forEach(({ name }) => {
        createFilterButton(name, () => filterWorksByCategory(name, '.gallery', images));
    });
}

/**
 * Sets the active state on the selected filter button by adding the 'filter-btn-active' class,
 * and removes the active state from all other filter buttons.
 *
 * @param {HTMLElement} selectedBtn - The button element to set as active.
 */
function setActiveButton(selectedBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('filter-btn-active'));
    selectedBtn.classList.add('filter-btn-active');
}


/**
 * Filters works by the specified category and displays them in the given gallery.
 *
 * @async
 * @function
 * @param {string} category - The name of the category to filter works by.
 * @param {string} gallerySelector - The CSS selector for the gallery element where filtered works will be displayed.
 * @returns {Promise<void>} Resolves when the filtered works have been displayed.
 */
async function filterWorksByCategory(category, gallerySelector, images) {
    const filteredWorks = images.filter(work => work.category.name === category);
     displayWorks(gallerySelector, filteredWorks);
}