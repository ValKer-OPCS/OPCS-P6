import { galleryInit } from "./modules/gallery.js";
import { smoothScrollOnLoad } from "./modules/utils.js";

/**
 * Initializes the application by fetching and rendering works and filters.
 * Calls getWorksInit to display works in the gallery and getFiltersInit to set up filter buttons.
 *
 * @async
 * @function init
 * @returns {Promise<void>} Resolves when initialization is complete.
 */
async function init() {
    galleryInit()
    smoothScrollOnLoad()
    setTimeout(() => { modal() }, 100);
}


init()

function modal() {
if (sessionStorage.getItem("token")){

    const modal = document.getElementById('modal')
    const modalOpenBtn = document.getElementById('editBtn')

    modalOpenBtn.addEventListener('click', () => {
        modal.showModal()
    });
modal.showModal() // remove once modal fonctionnal



    const modalCloseBtn = document.getElementById('modalCloseBtn')
    modalCloseBtn.addEventListener('click', () => {
        modal.close()
    });
    modal.addEventListener("click", e => {
        const dialogDimensions = modal.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close()
        }
    })
    }
}