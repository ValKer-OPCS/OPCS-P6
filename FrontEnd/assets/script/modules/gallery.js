import { clearHTMLElement, clearSessionStorage } from "./utils.js";
import { getFrom } from "./fetcher.js";
import { modal,displayModalWorks } from "./modal.js";


export async function galleryInit() {
    const images = await getFrom('works')
    const categories = await getFrom('categories')
    displayWorks('.gallery', images, false)
    displayFilter('.filter-btn-container', categories, images)
    adminMode(images)
}

export function displayWorks(elementSelection, imagesArray, isModal = false) {
    clearHTMLElement(elementSelection);
    const displayContainer = document.querySelector(elementSelection);

    if (!displayContainer) return;

    if (isModal) {

        displayModalWorks(imagesArray);

    } else {
        // hors modale
        imagesArray.forEach(work => {
            const figure = document.createElement('figure');
            figure.innerHTML = `
                <img src="${work.imageUrl}" alt="${work.title}">
                <figcaption>${work.title}</figcaption>
            `;
            displayContainer.appendChild(figure);
        });
    }
}


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


function setActiveButton(selectedBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('filter-btn-active'));
    selectedBtn.classList.add('filter-btn-active');
}


async function filterWorksByCategory(category, gallerySelector, images) {
    const filteredWorks = images.filter(work => work.category.name === category);
    displayWorks(gallerySelector, filteredWorks);
}

function adminMode(images) {

    if (sessionStorage.getItem("token")) {
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

        const editBtn = `<span id="editBtn"><i class="fa-regular fa-pen-to-square"></i> modifier</span>`;
        const portfolio = document.getElementById('portfolioHeader');
        portfolio.innerHTML = 'Mes Projets' + editBtn;
        setTimeout(() => { modal(images) }, 100);

    }
}