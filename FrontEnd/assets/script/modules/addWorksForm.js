import { getFrom, sendItem } from "./fetcher.js";
import { displayWorks } from "./gallery.js";

export function injectFormHTML(container) {
    container.innerHTML = `<form id="formAdd">
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
            <input type="text" id="title" placeholder="Saisissez un titre">
            <label for="category">Catégorie</label>
            <div class="select-wrapper">
                <select id="category"></select>
            </div>
        </div>
        </form>
    `;
}


export async function selectFilter(categorySelect) {
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Selectionnez une catégorie";
    defaultOption.selected = true;
    categorySelect.appendChild(defaultOption);

    const categories = await getFrom('categories');
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        categorySelect.appendChild(option);
    });
}

export function checkForm(fileInput, titleInput, categorySelect, validateAdd) {
    const file = fileInput.files[0];
    const title = titleInput.value.trim();
    const category = categorySelect.value;
    validateAdd.disabled = !(file && title && category);
}

function formReset(fileInput, titleInput, categorySelect, validateAdd, preview, inputTextField) {
    preview.src = '';
    preview.style.display = 'none';
    inputTextField.innerText = '';
    inputTextField.style.color = '';
    document.getElementById("formAdd").reset()
    checkForm(fileInput, titleInput, categorySelect, validateAdd);
}



export async function handleValidateAdd({ fileInput, titleInput, categorySelect, validateAdd, preview, inputTextField, images }) {
    const file = fileInput.files[0];
    const title = titleInput.value.trim();
    const category = categorySelect.value;

    if (!file || !title || !category) return;

    const result = await sendItem({ title, category, image: file });
    images.push(result);

    // Update galleries
    displayWorks('.gallery', images, false);
    displayWorks('.modalGallery', images, true);

    // Reset form
    formReset(fileInput, titleInput, categorySelect, validateAdd, preview, inputTextField);
}


export function setupFilePickerAndPreview({ uploadBtn, dropZone, fileInput, titleInput, categorySelect, validateAdd, preview, inputTextField }) {
    const openFilePicker = (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInput.click();
    };

    uploadBtn.addEventListener('click', openFilePicker);
    dropZone.addEventListener('click', openFilePicker);

    const handleFileSelection = (file) => {
        const showError = msg => {
            inputTextField.innerText = msg;
            inputTextField.style.color = "red";
            preview.src = '';
            preview.style.display = 'none';
            fileInput.value = '';
            checkForm(fileInput, titleInput, categorySelect, validateAdd);
        };

        if (!file) return;
        if (!['image/jpeg', 'image/png'].includes(file.type)) return showError('Le fichier doit être au format JPG ou PNG');
        if (file.size > 4 * 1024 * 1024) return showError('Le fichier est trop lourd (max 4 Mo)');

        const reader = new FileReader();
        reader.onload = e => {
            preview.src = e.target.result;
            preview.style.display = 'block';
            inputTextField.innerText = '';
        };
        reader.readAsDataURL(file);

        checkForm(fileInput, titleInput, categorySelect, validateAdd);
    };

    fileInput.addEventListener('change', () => handleFileSelection(fileInput.files[0]));

    titleInput.addEventListener('input', () => checkForm(fileInput, titleInput, categorySelect, validateAdd));
    categorySelect.addEventListener('change', () => checkForm(fileInput, titleInput, categorySelect, validateAdd));

    checkForm(fileInput, titleInput, categorySelect, validateAdd);
}
