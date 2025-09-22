import { clearSessionStorage } from "./utils.js";
import { getFrom } from "./fetcher.js";
import { modal, displayModalWorks } from "./modal/modal.js";

/**
 * Initializes the gallery by fetching works and categories,
 * then rendering the gallery, filters, and enabling admin mode.
 *
 * @async
 * @function galleryInit
 * @returns {Promise<void>} A promise that resolves once the gallery initialization is complete.
 */
export async function galleryInit() {
    try {
        const images = await getFrom('works');
        const categories = await getFrom('categories');

        displayWorks('.gallery', images, false);
        displayFilter('.filter-btn-container', categories, images);
        adminMode(images);

    } catch (error) {
        const gallery = document.querySelector('.gallery');
        if (gallery) {
            gallery.innerText = error.message;
        }
    }
}

/**
 * Renders a collection of works inside a given DOM container or inside a modal.
 *
 * @function displayWorks
 * @param {string} elementSelection - A CSS selector string used to target the container where works should be displayed.
 * @param {Object[]} imagesArray - An array of work objects to display.
 * @param {string} imagesArray[].imageUrl - The URL of the work's image.
 * @param {string} imagesArray[].title - The title of the work.
 * @param {boolean} [isModal=false] - Whether the works should be displayed inside a modal instead of a normal container.
 *
 * @returns {void}
 */
export function displayWorks(elementSelection, imagesArray, isModal = false) {
    const displayContainer = document.querySelector(elementSelection);
    if (!displayContainer) return;

    displayContainer.replaceChildren();

    if (isModal) {
        displayModalWorks(imagesArray);
    } else {
        imagesArray.forEach(work => {
            const figure = document.createElement('figure');

            const img = document.createElement('img');
            img.src = work.imageUrl;
            img.alt = work.title;

            const caption = document.createElement('figcaption');
            caption.textContent = work.title;

            figure.appendChild(img);
            figure.appendChild(caption);

            displayContainer.appendChild(figure);
        });
    }
}


/**
 * Renders filter buttons inside a given container to filter works by category.
 *
 * @function displayFilter
 * @param {string} elementSelection - A CSS selector string used to target the container where filter buttons should be rendered.
 * @param {Object[]} filterLocation - An array of category objects to generate filter buttons from.
 * @param {string} filterLocation[].name - The name of the category (used as the filter button label).
 * @param {Object[]} images - An array of work objects to be filtered and displayed.
 * @param {string} images[].imageUrl - The URL of the work's image.
 * @param {string} images[].title - The title of the work.
 *
 * @returns {void}
 */
function displayFilter(elementSelection, filterArray, images) {

    const filterContainer = document.querySelector(elementSelection);
    filterContainer.replaceChildren();

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

    createFilterButton("Tous", () => displayWorks('.gallery', images, false), true);

    filterArray.forEach(({ name }) => {
        createFilterButton(name, () => filterWorksByCategory(name, '.gallery', images));
    });
}

/**
 * Sets the given button as the active filter button.
 *
 * @function setActiveButton
 * @param {HTMLButtonElement} selectedBtn - The button element to set as active.
 * @returns {void}
 *
 */
function setActiveButton(selectedBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('filter-btn-active'));
    selectedBtn.classList.add('filter-btn-active');
}

/**
 * Filters works by a given category and displays them in the target gallery.
 *
 * @async
 * @function filterWorksByCategory
 * @param {string} category - The category name to filter works by.
 * @param {string} gallerySelector - A CSS selector string for the gallery container where filtered works should be displayed.
 * @param {Object[]} images - An array of work objects to filter.
 * @param {string} images[].imageUrl - The URL of the work's image.
 * @param {string} images[].title - The title of the work.
 * @param {Object} images[].category - The category object of the work.
 * @param {string} images[].category.name - The name of the category.
 *
 * @returns {Promise<void>} A promise that resolves once the filtered works have been displayed.
 */
function filterWorksByCategory(category, gallerySelector, images) {
    const filteredWorks = images.filter(work => work.category.name === category);
    displayWorks(gallerySelector, filteredWorks);
}

/**
 * Enables admin mode if a valid session token is found in sessionStorage.
 *
 * @function adminMode
 * @param {Object[]} images - An array of work objects used to populate the modal editor.
 * @param {string} images[].imageUrl - The URL of the work's image.
 * @param {string} images[].title - The title of the work.
 * @param {Object} [images[].category] - The category object of the work.
 * @param {string} [images[].category.name] - The name of the category.
 *
 * @returns {void}
 *
 */
function adminMode(images) {
    if (!sessionStorage.getItem("token")) return;

    // Hide filter
    const filterContainer = document.querySelector(".filter-btn-container");
    if (filterContainer) filterContainer.style.display = "none";

    // Change login to logout
    const logout = document.getElementById("loginBtn");
    
        logout.textContent = "logout";
        logout.addEventListener("click", function (event) {
            event.preventDefault();
            clearSessionStorage('token');
            location.reload();
        });
    

    // Display top menu bar
    const body = document.querySelector("body");

    const adminMenu = document.createElement("div");
    adminMenu.className = "admin-menu";

    const editMode = document.createElement("p");
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-regular", "fa-pen-to-square");
    editMode.appendChild(editIcon);
    editMode.appendChild(document.createTextNode(" Mode édition"));

    body.insertAdjacentElement("afterbegin", adminMenu);
    adminMenu.appendChild(editMode);

    // Portfolio header
    const portfolio = document.getElementById('portfolioHeader');
    portfolio.replaceChildren();
    portfolio.appendChild(document.createTextNode("Mes Projets "));

    const editBtn = document.createElement("span");
    editBtn.id = "editBtn";

    const editBtnIcon = document.createElement("i");
    editBtnIcon.classList.add("fa-regular", "fa-pen-to-square");
    editBtn.appendChild(editBtnIcon);

    editBtn.appendChild(document.createTextNode(" modifier"));
    portfolio.appendChild(editBtn);

    portfolio.style.marginBottom = "92px";


    setTimeout(() => modal(images), 100);
}
