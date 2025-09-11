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

        const modal = document.getElementById('modal')
        const modalOpenBtn = document.getElementById('editBtn')

        modalOpenBtn.addEventListener('click', () => {
            modal.showModal()
        });
        displayWorks('.modalGallery', images, true)
        modal.showModal()



        const modalCloseBtn = document.getElementById('modalCloseBtn')
        modalCloseBtn.addEventListener('click', () => {
            modal.close()
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {  // Vérifie que le clic n'est pas sur un enfant
                modal.close();
            }
        })
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


        function onConfirm(event) {
            event.preventDefault();
            deleteConfirmation.style.display = 'none';
            addBtn.style.display = 'inline-block';
            resolve(true);
        }

        function onCancel(event) {
            event.preventDefault();
            deleteConfirmation.style.display = 'none';
            addBtn.style.display = 'inline-block';
            resolve(false);
        }

        confirmDelete.addEventListener('click', onConfirm);
        cancelDelete.addEventListener('click', onCancel);
    });
}

export async function addWorks(images) {
    const modalText = document.querySelector('.modalTitle');
    const modalGallery = document.querySelector('.modalGallery');
    const validateAdd = document.getElementById('validateAdd'); // bouton existant dans le HTML
    const addBtn = document.getElementById('addPictureBtn');

    modalText.innerText = 'Ajout photo';

    // Injection du formulaire
    modalGallery.innerHTML = `
    <div class="upload-box" id="dropZone">
        <div class="placeholder">
            <i class="fa-solid fa-image"></i>
            <br>
            <button id="uploadBtn" type="button">+ Ajouter photo</button>
            <br>
            <p>jpg, png : 4mo max</p>
        </div>
        <img id="preview" class="preview" alt="Aperçu" style="display:none;"/>
    </div>

    <input type="file" id="fileInput" accept="image/*" hidden>

    <div class="img-submit-form">
        <label for="title">Titre</label>
        <input type="text" id="title">

        <label for="category">Catégorie</label>
        <div class="select-wrapper">
            <select id="category"></select>
        </div>
    </div>
    `;

    // Sélection des éléments après injection
    const uploadBtn = document.getElementById('uploadBtn');
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const titleInput = document.getElementById('title');
    const categorySelect = document.getElementById('category');
    const preview = document.getElementById('preview');

    // Chargement des catégories avec option par défaut
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "<>";
    defaultOption.selected = true;
    categorySelect.appendChild(defaultOption);

    const categories = await getFrom('categories');
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        categorySelect.appendChild(option);
    });

    // Fonction pour activer/désactiver le bouton Valider
    function checkForm() {
        const file = fileInput.files[0];
        const title = titleInput.value.trim();
        const category = categorySelect.value;
        validateAdd.disabled = !(file && title && category);
    }

    // Prévisualisation + validation
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (!file) return;

        if (file.size > 4 * 1024 * 1024) {
            alert('Le fichier est trop lourd (max 4 Mo)');
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

    // Event listeners pour les champs texte et select
    titleInput.addEventListener('input', checkForm);
    titleInput.addEventListener('change', checkForm);
    categorySelect.addEventListener('input', checkForm);
    categorySelect.addEventListener('change', checkForm);

    // Ouvrir file picker sur clic
    uploadBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); fileInput.click(); });
    dropZone.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); fileInput.click(); });

    // Affichage / masquage des boutons
    validateAdd.style.display = 'inline-block';
    validateAdd.disabled = true;
    addBtn.style.display = 'none';

    // Listener pour envoyer le formulaire
    validateAdd.onclick = async () => {
        const file = fileInput.files[0];
        const title = titleInput.value.trim();
        const category = categorySelect.value;
        if (!file || !title || !category) return;

        const result = await sendItem({ title, category, image: file });
        images.push(result);

        // Mise à jour des galeries
        displayWorks('.gallery', images, false);
        displayWorks('.modalGallery', images, true);

        // Reset du formulaire pour le prochain ajout
        titleInput.value = '';
        categorySelect.value = '';
        fileInput.value = '';
        preview.src = '';
        preview.style.display = 'none';
        modalText.innerText = 'Galerie photo';

        // Masquer Valider, réafficher Ajouter
        validateAdd.style.display = 'none';
        addBtn.style.display = 'inline-block';
        validateAdd.disabled = true;
    };
}

