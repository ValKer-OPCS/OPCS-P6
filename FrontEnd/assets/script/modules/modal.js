import { getFrom, sendItem } from "./fetcher.js";

import { displayWorks } from "./gallery.js";

/**
 * Initializes and manages the modal dialog for editing images.
 *
 * This function sets up event listeners for opening and closing a modal dialog,
 * including additional behavior to close the modal when clicking outside of its boundaries.
 * It checks for a valid "token" in sessionStorage before initializing the modal functionality.
 *
 * @param {Array|Object} images - The images to be displayed in the modal gallery.
 *
 * @listens click - On the modal open button ("editBtn") to display the modal.
 * @listens click - On the modal close button ("modalCloseBtn") to hide the modal.
 * @listens click - On the modal itself to close it when a click is detected outside the dialog area.
 *
 * @example
 * // To initialize the modal with image data:
 * modal(myImages);
 */

export function modal(images) {
    if (sessionStorage.getItem("token")) {
        const modal = document.getElementById('modal');
        const modalOpenBtn = document.getElementById('editBtn');
        const modalCloseBtn = document.getElementById('modalCloseBtn');
        const modalBackBtn = document.getElementById('modalBackBtn');


        modalBackBtn.style.display = "none";

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


export function showDeleteQuery(message) {
    return new Promise((resolve) => {
        const addBtn = document.getElementById('addPictureBtn');
        const deleteConfirmation = document.getElementById('deleteConfirmation');
        const modalText = document.getElementById('modalText');
        const confirmDelete = document.getElementById('confirmDelete');
        const cancelDelete = document.getElementById('cancelDelete');

        addBtn.style.display = 'none';
        deleteConfirmation.style.display = 'block';
        modalText.textContent = message;

        // Clone button to delete previous listener
        const tempConfirm = confirmDelete.cloneNode(true);
        const tempCancel = cancelDelete.cloneNode(true);
        confirmDelete.replaceWith(tempConfirm);
        cancelDelete.replaceWith(tempCancel);

        // Listener to confirm deletion
        tempConfirm.onclick = (event) => {
            event.preventDefault();
            deleteConfirmation.style.display = 'none';
            addBtn.style.display = 'block';
            resolve(true);
        };

        // Listener to cancel deletion
        tempCancel.onclick = (event) => {
            event.preventDefault();
            deleteConfirmation.style.display = 'none';
            addBtn.style.display = 'block';
            resolve(false);
        };
    });
}


export async function addWorks(images) {

    // Modal Element selection
    const modalText = document.querySelector('.modalTitle');
    const modalGallery = document.querySelector('.modalGallery');
    const validateAdd = document.getElementById('validateAdd');
    const addBtn = document.getElementById('addPictureBtn');
    const modalBackBtn = document.getElementById('modalBackBtn');

    modalText.innerText = 'Ajout photo';

    // HTML Injection
    modalGallery.innerHTML = `
    <div class="upload-box" id="dropZone">
        <div class="placeholder">
            <i class="fa-solid fa-image"></i>
            <br>
            <button id="uploadBtn" type="button">+ Ajouter photo</button>
            <br>
            <p id="inputTextField">jpg, png : 4mo max</p>
        </div>
        <img id="preview" class="preview" alt="Aperçu" style="display:none;"/>
    </div>

    <input type="file" id="fileInput" accept="image/png, image/jpeg" hidden>

    <div class="img-submit-form">
        <label for="title">Titre</label>
        <input type="text" id="title">

        <label for="category">Catégorie</label>
        <div class="select-wrapper">
            <select id="category"></select>
        </div>
    </div>
    `;
    // Back Arrow Event 
    modalBackBtn.style.display = "block";
    modalBackBtn.addEventListener('click', () => resetModal(images));


    // Element select after injection
    const uploadBtn = document.getElementById('uploadBtn');
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const titleInput = document.getElementById('title');
    const categorySelect = document.getElementById('category');
    const preview = document.getElementById('preview');
    const inputTextField = document.getElementById('inputTextField');

    // Filling "Catégories" select

        // Default option
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Selectionnez une catégorie";
    defaultOption.selected = true;
    categorySelect.appendChild(defaultOption);

        // Fetch and generate option 
    const categories = await getFrom('categories');
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        categorySelect.appendChild(option);
    });

    // Check form and disable validate button if !ok
    const checkForm = () => {
        const file = fileInput.files[0];
        const title = titleInput.value.trim();
        const category = categorySelect.value;
        validateAdd.disabled = !(file && title && category);
    }

    // img preview and check after loading img
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            inputTextField.innerText = 'Le fichier doit être une image (jpg ou png)';
            inputTextField.style = "color:red"
            fileInput.value = '';
            preview.src = '';
            preview.style.display = 'none';
            return;
        }

        if (file.size > 4 * 1024 * 1024) {
            inputTextField.innerText = 'Le fichier est trop lourd (max 4 Mo)';
            inputTextField.style = "color:red"
            fileInput.value = '';
            preview.src = '';
            preview.style.display = 'none';
        } else {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
        checkForm();
    });

    // Event listeners when input or change on text field and select
    titleInput.addEventListener('input', checkForm);
    titleInput.addEventListener('change', checkForm);
    categorySelect.addEventListener('input', checkForm);
    categorySelect.addEventListener('change', checkForm);

    // Open file picker on click
    uploadBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); fileInput.click(); });
    dropZone.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); fileInput.click(); });

    // enable validate button
    validateAdd.style.display = 'inline-block';
    validateAdd.disabled = true;
    addBtn.style.display = 'none';

    // Listener to send new work to backend
    validateAdd.onclick = async () => {
        const file = fileInput.files[0];
        const title = titleInput.value.trim();
        const category = categorySelect.value;
        if (!file || !title || !category) return;

        const result = await sendItem({ title, category, image: file });
        images.push(result);

        // galleries update
        displayWorks('.gallery', images, false);
        displayWorks('.modalGallery', images, true);

        // Form reset
        titleInput.value = '';
        categorySelect.value = '';
        fileInput.value = '';
        preview.src = '';
        preview.style.display = 'none';
        modalText.innerText = 'Galerie photo';

        // hide validate button re-display add button
        validateAdd.style.display = 'none';
        addBtn.style.display = 'inline-block';
        validateAdd.disabled = true;
    };
}

function resetModal(images) {
    const modalText = document.querySelector('.modalTitle');
    const modalGallery = document.querySelector('.modalGallery');
    const validateAdd = document.getElementById('validateAdd');
    const addBtn = document.getElementById('addPictureBtn');
    const modalBackBtn = document.getElementById('modalBackBtn');
    const deleteConfirmation = document.getElementById('deleteConfirmation');

    modalText.innerText = 'Galerie photo';
    modalGallery.innerHTML = '';

    
    displayWorks('.modalGallery', images, true);

    
    modalBackBtn.style.display = "none";
    if (validateAdd) validateAdd.style.display = 'none';

    
    if (addBtn) addBtn.style.display = 'inline-block';

    
    if (deleteConfirmation) {
        deleteConfirmation.style.display = 'none';
    }
}


