import { displayWorks } from "../gallery.js";
import { handleAddBtn } from "./addWorksForm.js";
import { deleteWorksQuery } from "./deleteWorks.js";



/**
 * Initializes and manages the modal dialog for editing works in admin mode.
 *
 * @function modal
 * @param {Object[]} images - An array of work objects used to populate and reset the modal.
 * @param {string} images[].imageUrl - The URL of the work's image.
 * @param {string} images[].title - The title of the work.
 * @param {Object} [images[].category] - The category object of the work.
 * @param {string} [images[].category.name] - The name of the category.
 *
 * @returns {void}
 */
export function modal(images) {
    if (sessionStorage.getItem("token")) {
        const modal = document.getElementById('modal');
        const modalOpenBtn = document.getElementById('editBtn');
        const modalCloseBtn = document.getElementById('modalCloseBtn');

        if (!modal.dataset.listenersAttached) {
            modalOpenBtn.onclick = () => {
                modal.showModal();
                resetModal(images);
            };
            modalCloseBtn.onclick = () => {
                modal.close();
            };
            modal.onclick = (e) => {
                if (e.target === modal) {
                    modal.close();
                }
            };
            modal.addEventListener('close', () => {
                resetModal(images);
            });
            modal.dataset.listenersAttached = "true";
        }

        handleAddBtn(images)
    }
}

/**
 * Resets the modal to its default state, showing the gallery and hiding the add/edit form.
 *
 * @function resetModal
 * @param {Object[]} images - An array of work objects to display in the modal gallery.
 * @param {string} images[].imageUrl - The URL of the work's image.
 * @param {string} images[].title - The title of the work.
 * @param {Object} [images[].category] - The category object of the work.
 * @param {string} [images[].category.name] - The name of the category.
 *
 * @returns {void}
 */
export function resetModal(images) {
    const { modalText, modalGallery, validateAdd, addBtn, modalBackBtn, deleteConfirmation, modalAddForm } = getModalElements();

    // default text 
    modalText.innerText = 'Galerie photo';

    // Empty dynamicaly loaded content
    modalGallery.innerHTML = '';
    modalAddForm.innerHTML = '';

    // Display main gallery
    modalGallery.style.display = "grid";
    modalAddForm.style.display = "none";

    displayWorks('.modalGallery', images, true);

    // Reset buttons
    modalBackBtn.style.display = "none";
    validateAdd.style.display = 'none';
    addBtn.style.display = 'inline-block';
    deleteConfirmation.style.display = 'none';
}

/**
 * Displays works inside the modal gallery with delete buttons and an option to add new works.
 *
 * @function displayModalWorks
 * @param {Object[]} imagesArray - An array of work objects to display in the modal.
 * @param {string} imagesArray[].imageUrl - The URL of the work's image.
 * @param {string} imagesArray[].title - The title of the work.
 * @param {Object} [imagesArray[].category] - The category object of the work.
 * @param {string} [imagesArray[].category.name] - The name of the category.
 *
 * @returns {void}
 */
export function displayModalWorks(imagesArray) {
    const displayContainer = document.querySelector('.modalGallery');
    displayContainer.innerHTML = '';

    imagesArray.forEach((work, index) => {
        const figure = document.createElement('figure');
        figure.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}">
            <span class="deleteButton"><i class="fa-solid fa-trash-can"></i></span>
        `;
        displayContainer.appendChild(figure);

        deleteWorksQuery(figure, work, imagesArray, index)
    });
}

/**
 * Returns key DOM elements inside the modal for admin and add-work functionality.
 *
 * @function getModalElements
 * @returns {Object} An object containing references to modal DOM elements.
 * @property {HTMLElement} modalText - The modal title element ('.modalTitle').
 * @property {HTMLElement} modalGallery - The container for modal gallery ('.modalGallery').
 * @property {HTMLButtonElement} validateAdd - The "validate add" button ('#validateAdd').
 * @property {HTMLButtonElement} addBtn - The "add picture" button ('#addPictureBtn').
 * @property {HTMLButtonElement} modalBackBtn - The modal back button ('#modalBackBtn').
 * @property {HTMLElement} deleteConfirmation - The delete confirmation element ('#deleteConfirmation').
 * @property {HTMLElement} modalAddForm - The container for the add-work form ('.modalAddForm').
 */
export function getModalElements() {
    return {
        modalText: document.querySelector('.modalTitle'),
        modalGallery: document.querySelector('.modalGallery'),
        validateAdd: document.getElementById('validateAdd'),
        addBtn: document.getElementById('addPictureBtn'),
        modalBackBtn: document.getElementById('modalBackBtn'),
        deleteConfirmation: document.getElementById('deleteConfirmation'),
        modalAddForm: document.querySelector('.modalAddForm')
    };
}