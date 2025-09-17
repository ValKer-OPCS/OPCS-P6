import { displayWorks } from "../gallery.js";
import { injectFormHTML, selectFilter, addImageForm, handleValidateAdd } from "./addWorksForm.js";
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
 *
 * @example
 * // Initialize the modal for admin editing
 * modal(worksArray);
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
    }
}

/**
 * Initializes the "Add Work" modal for uploading a new work in admin mode.
 *
 * @async
 * @function addWorks
 * @param {Object[]} images - An array of work objects, which will be updated upon successfully adding a new work.
 * @param {string} images[].imageUrl - The URL of the work's image.
 * @param {string} images[].title - The title of the work.
 * @param {Object} [images[].category] - The category object of the work.
 * @param {string} [images[].category.name] - The name of the category.
 *
 * @returns {Promise<void>} A promise that resolves once the modal setup is complete.
 *
 * @example
 * // Initialize the add work modal with current works
 * addWorks(worksArray);
 */
export async function addWorks(images) {
    // Modal Element selection
    const { modalText, modalGallery, validateAdd, addBtn, modalBackBtn, modalAddForm } = getModalElements();

    // HTML Injection
    modalText.innerText = 'Ajout photo';
    modalGallery.style.display = "none";
    injectFormHTML(modalAddForm);

    // Element select after injection
    const { uploadBtn, dropZone, fileInput, titleInput, categorySelect, preview, inputTextField } = getFormElements();

    // Back Arrow Event 
    modalBackBtn.style.display = "block";
    modalBackBtn.onclick = () => resetModal(images);

    // enable validate button
    validateAdd.style.display = 'inline-block';
    validateAdd.disabled = true;
    addBtn.style.display = 'none';

    selectFilter(categorySelect);
    addImageForm({ uploadBtn, dropZone, fileInput, titleInput, categorySelect, validateAdd, preview, inputTextField });
    validateAdd.onclick = async (e) => {
        e.preventDefault(); await handleValidateAdd({ fileInput, titleInput, categorySelect, validateAdd, preview, inputTextField, images });
    };

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
 *
 * @example
 * // Reset the modal to its default gallery view
 * resetModal(worksArray);
 */
function resetModal(images) {
    const { modalText, modalGallery, validateAdd, addBtn, modalBackBtn, deleteConfirmation, modalAddForm } = getModalElements();

    // default text 
    modalText.innerText = 'Galerie photo';

    // Empty dynamicaly loaded content
    modalGallery.innerHTML = '';
    if (modalAddForm) modalAddForm.innerHTML = '';

    // Display main gallery
    modalGallery.style.display = "grid";
    if (modalAddForm) modalAddForm.style.display = "none";

    displayWorks('.modalGallery', images, true);

    // Reset buttons
    modalBackBtn.style.display = "none";
    if (validateAdd) validateAdd.style.display = 'none';
    if (addBtn) addBtn.style.display = 'inline-block';
    if (deleteConfirmation) deleteConfirmation.style.display = 'none';
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
 *
 * @example
 * // Display works in the modal gallery
 * displayModalWorks(worksArray);
 */
export function displayModalWorks(imagesArray) {
    const displayContainer = document.querySelector('.modalGallery');
    if (!displayContainer) return;

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

    const addPictureBtn = document.getElementById('addPictureBtn');
    const modalAddForm = document.querySelector('.modalAddForm');
    if (addPictureBtn && !addPictureBtn.dataset.listenerAttached) {
        addPictureBtn.addEventListener('click', () => {
            addWorks(imagesArray);
            modalAddForm.style = "display:flex"
        });
        addPictureBtn.dataset.listenerAttached = "true";

    }
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
 *
 * @example
 * // Get all modal elements
 * const elements = getModalElements();
 * elements.validateAdd.disabled = true;
 */
function getModalElements() {
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

/**
 * Returns key DOM elements of the "Add Work" form inside the modal.
 *
 * @function getFormElements
 * @returns {Object} An object containing references to form DOM elements.
 * @property {HTMLButtonElement} uploadBtn - The button to trigger file upload ('#uploadBtn').
 * @property {HTMLElement} dropZone - The drop zone container for drag-and-drop files ('#dropZone').
 * @property {HTMLInputElement} fileInput - The hidden file input element ('#fileInput').
 * @property {HTMLInputElement} titleInput - The input for the work's title ('#title').
 * @property {HTMLSelectElement} categorySelect - The select element for choosing a category ('#category').
 * @property {HTMLImageElement} preview - The preview image element ('#preview').
 * @property {HTMLInputElement} inputTextField - The input field for additional text ('#inputTextField').
 *
 * @example
 * // Get form elements to set up file preview and validation
 * const formElements = getFormElements();
 * formElements.titleInput.value = 'New Work Title';
 */
function getFormElements() {
    return {
        uploadBtn: document.getElementById('uploadBtn'),
        dropZone: document.getElementById('dropZone'),
        fileInput: document.getElementById('fileInput'),
        titleInput: document.getElementById('title'),
        categorySelect: document.getElementById('category'),
        preview: document.getElementById('preview'),
        inputTextField: document.getElementById('inputTextField')
    };
}