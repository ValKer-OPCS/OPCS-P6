import { displayWorks } from "./gallery.js";
import { injectFormHTML, selectFilter, setupFilePickerAndPreview, handleValidateAdd } from "./addWorksForm.js";
import { deleteWorksQuery } from "./deleteWorks.js";

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
    setupFilePickerAndPreview({ uploadBtn, dropZone, fileInput, titleInput, categorySelect, validateAdd, preview, inputTextField });
    validateAdd.onclick = async (e) => {
        e.preventDefault(); await handleValidateAdd({ fileInput, titleInput, categorySelect, validateAdd, preview, inputTextField, images });
    };

}

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