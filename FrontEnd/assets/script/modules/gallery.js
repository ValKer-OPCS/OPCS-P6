// This module fetches works and categories from an API and dynamically displays them in a gallery with interactive filter buttons.
// It provides functions to render works as <figure> elements with images and captions, 
// generate category filter buttons including an “All” button, 
// and handle button states so only the selected filter appears active. 
// Clicking a category filters the displayed works accordingly, while clicking “All” shows all works. 
// The module combines asynchronous data fetching, DOM manipulation, and event handling to create a responsive, 
// filterable gallery interface.


import { clearHTMLElement, clearSessionStorage } from "./utils.js";
import { getFrom } from "./fetcher.js";

export async function galleryInit() {
    const images = await getFrom('works')
    const categories = await getFrom('categories')
    displayWorks('.gallery', images)
    displayFilter('.filter-btn-container', categories, images)
    adminMode()
}




/**
 * Displays a collection of works in the specified HTML element.
 *
 * This function clears the content of the element identified by the given selector, then iterates
 * over the provided array of work objects. For each work, it creates a figure element containing an image
 * and a caption, and appends it to the target element.
 *
 * @param {string} elementSelection - A CSS selector string to identify the target HTML element.
 * @param {Array<{ imageUrl: string, title: string }>} imagesArray - An array of objects, each with properties:
 *   - imageUrl: The URL of the work's image.
 *   - title: The title of the work.
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
 * Displays filter buttons in the specified element container.
 *
 * This function clears the target HTML element designated by `elementSelection` and dynamically creates
 * filter buttons that allow users to filter a gallery or view all images. The "Tous" button is created by default
 * and set as active, while additional buttons are generated based on the entries in `filterLocation`.
 *
 * @param {string} elementSelection - The selector for the HTML element where filter buttons will be rendered.
 * @param {Array<Object>} filterLocation - Array of objects representing filter categories. Each object should have at least a `name` property used as the label for the corresponding filter button.
 * @param {Array<Object>} images - Array of images or works to be displayed or filtered through the gallery.
 *
 * @example
 * displayFilter('.filter-container', [{ name: "Architecture" }, { name: "Interior" }], galleryImages);
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
 * Activates the selected filter button.
 *
 * This function removes the 'filter-btn-active' class from all elements with the 'filter-btn' class
 * and adds it to the specified selected button element.
 *
 * @param {HTMLElement} selectedBtn - The DOM element representing the button to be activated.
 */
function setActiveButton(selectedBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('filter-btn-active'));
    selectedBtn.classList.add('filter-btn-active');
}



/**
 * Filters works by the specified category and displays the filtered works.
 *
 * This asynchronous function filters the provided list of work objects by comparing
 * each work's category name against the specified category, then renders the 
 * filtered works by invoking the displayWorks function with the provided gallery selector.
 *
 * @async
 * @function filterWorksByCategory
 * @param {string} category - The category name used to filter the work objects.
 * @param {string} gallerySelector - The selector for the gallery container where the works will be displayed.
 * @param {Array<Object>} images - An array of work objects, each containing a `category` property with a `name` field.
 * @returns {Promise<void>} A promise that resolves when the filtered works have been rendered.
 */
async function filterWorksByCategory(category, gallerySelector, images) {
    const filteredWorks = images.filter(work => work.category.name === category);
    displayWorks(gallerySelector, filteredWorks);
}

function adminMode() {

    if (sessionStorage.getItem("token")?.length == 143) {
        //Hide filter
        document.querySelector(".filter-btn-container").style.display = "none";

        // Change login to logout
        const logout = document.getElementById("loginBtn");
        logout.innerText = "logout";

        // add logout listener
        logout.addEventListener("click", function (event) {
            event.preventDefault();               
            clearSessionStorage('token');
            location.reload();                     
        });
        //display top menu bar
        const body = document.querySelector("body");

        const adminMenu = document.createElement("div");
        adminMenu.className = "admin-menu";
        
        const editMode = document.createElement("p");
        editMode.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>Mode édition`;
        

        body.insertAdjacentElement("afterbegin", adminMenu);
        adminMenu.insertAdjacentElement("afterbegin", editMode);

        const editBtn = `<span class="editBtn"><i class="fa-regular fa-pen-to-square"></i> modifier</span>`;
        const portfolio = document.getElementById('portfolioHeader');
        portfolio.innerHTML = 'Mes Projets' + editBtn

    }
}