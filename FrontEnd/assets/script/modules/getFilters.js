import { clearHTMLElement } from "./utils.js";
import { getFrom } from "./fetcher.js";
import { getWorksInit, displayWorks } from "./getWorks.js";


export async function getFiltersInit(endpoint, elementId) {
    const fetchedCategories = await getFrom(endpoint);
    displayFilter(fetchedCategories, elementId);
    return fetchedCategories
}


function displayFilter(filterLocation, elementSelection){
    clearHTMLElement(elementSelection);
    const filterContainer = document.querySelector(elementSelection)

    const allButton = document.createElement('button');
    allButton.textContent = "Tous";
    filterContainer.appendChild(allButton);
    allButton.addEventListener('click', () =>{
        getWorksInit('works', '.gallery');
    })

    filterLocation.forEach(filter => {
        const button = document.createElement('button');
        button.textContent =`${filter.name}`;
        filterContainer.appendChild(button);
        button.addEventListener('click', () =>{
        filterWorksByCategory(`${filter.name}`, '.gallery')
        
    })
    });
}
async function filterWorksByCategory(category, gallerySelector) {
    const works = await getFrom('works');
    const filteredWorks = works.filter(work => work.category.name === category);
    displayWorks(filteredWorks, gallerySelector);
}
