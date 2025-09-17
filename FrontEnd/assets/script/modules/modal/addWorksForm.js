import { getFrom, sendItem } from "../fetcher.js";
import { displayWorks } from "../gallery.js";


/**
 * Injects the HTML structure of the "Add Work" form into the specified container.
 *
 * @function injectFormHTML
 * @param {HTMLElement} container - The DOM element where the form HTML will be injected.
 *
 * @returns {void}
 *
 * @example
 * // Inject the add work form into the modal container
 * const modalAddForm = document.querySelector('.modalAddForm');
 * injectFormHTML(modalAddForm);
 */
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

/**
 * Populates a category `<select>` element with options fetched from the backend.
 *
 * @async
 * @function selectFilter
 * @param {HTMLSelectElement} categorySelect - The `<select>` element to populate with category options.
 *
 * @returns {Promise<void>} A promise that resolves once the category options have been added.
 *
 * @example
 * // Populate a category select element in the add-work form
 * const categorySelect = document.getElementById('category');
 * await selectFilter(categorySelect);
 */
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

/**
 * Validates the "Add Work" form and enables or disables the validate button.
 *
 * @function checkForm
 * @param {HTMLInputElement} fileInput - The file input element for selecting an image.
 * @param {HTMLInputElement} titleInput - The input element for the work's title.
 * @param {HTMLSelectElement} categorySelect - The select element for choosing a category.
 * @param {HTMLButtonElement} validateAdd - The button used to submit the form.
 *
 * @returns {void}
 *
 * @example
 * // Check form validity whenever inputs change
 * fileInput.addEventListener('change', () => checkForm(fileInput, titleInput, categorySelect, validateAdd));
 * titleInput.addEventListener('input', () => checkForm(fileInput, titleInput, categorySelect, validateAdd));
 * categorySelect.addEventListener('change', () => checkForm(fileInput, titleInput, categorySelect, validateAdd));
 */
export function checkForm(fileInput, titleInput, categorySelect, validateAdd) {
    const file = fileInput.files[0];
    const title = titleInput.value.trim();
    const category = categorySelect.value;
    validateAdd.disabled = !(file && title && category);
}


/**
 * Resets the "Add Work" form to its initial state.
 *
 * @function formReset
 * @param {HTMLInputElement} fileInput - The file input element for the work's image.
 * @param {HTMLInputElement} titleInput - The input element for the work's title.
 * @param {HTMLSelectElement} categorySelect - The select element for the work's category.
 * @param {HTMLButtonElement} validateAdd - The button used to submit the form.
 * @param {HTMLImageElement} preview - The image element used for showing a preview of the uploaded file.
 * @param {HTMLElement} inputTextField - The element displaying input-related text (e.g., file instructions or errors).
 *
 * @returns {void}
 *
 * @example
 * // Reset the form after a successful submission
 * formReset(fileInput, titleInput, categorySelect, validateAdd, preview, inputTextField);
 */
function formReset(fileInput, titleInput, categorySelect, validateAdd, preview, inputTextField) {
    preview.src = '';
    preview.style.display = 'none';
    inputTextField.innerText = '';
    inputTextField.style.color = '';
    document.getElementById("formAdd").reset()
    checkForm(fileInput, titleInput, categorySelect, validateAdd);
}


/**
 * Handles the validation and submission of the "Add Work" form.
 *
 * @async
 * @function handleValidateAdd
 * @param {Object} params - The form elements and images array.
 * @param {HTMLInputElement} params.fileInput - The file input element for the work's image.
 * @param {HTMLInputElement} params.titleInput - The input element for the work's title.
 * @param {HTMLSelectElement} params.categorySelect - The select element for the work's category.
 * @param {HTMLButtonElement} params.validateAdd - The button used to submit the form.
 * @param {HTMLImageElement} params.preview - The image element showing the preview of the uploaded file.
 * @param {HTMLElement} params.inputTextField - The element displaying input-related text (e.g., file instructions or errors).
 * @param {Object[]} params.images - The array of existing work objects; the new work will be added to this array.
 * @param {string} params.images[].imageUrl - The URL of the work's image.
 * @param {string} params.images[].title - The title of the work.
 * @param {Object} [params.images[].category] - The category object of the work.
 * @param {string} [params.images[].category.name] - The name of the category.
 *
 * @returns {Promise<void>} A promise that resolves once the work has been submitted, galleries updated, and form reset.
 *
 * @example
 * // Handle submission of the add work form
 * await handleValidateAdd({ fileInput, titleInput, categorySelect, validateAdd, preview, inputTextField, imagesArray });
 */
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

/**
 * Sets up the "Add Work" form's file upload and input validation behavior.
 *
 * @function addImageForm
 * @param {Object} params - The form elements.
 * @param {HTMLButtonElement} params.uploadBtn - The button to trigger file upload.
 * @param {HTMLElement} params.dropZone - The drop zone container for selecting files.
 * @param {HTMLInputElement} params.fileInput - The hidden file input element.
 * @param {HTMLInputElement} params.titleInput - The input element for the work's title.
 * @param {HTMLSelectElement} params.categorySelect - The select element for the work's category.
 * @param {HTMLButtonElement} params.validateAdd - The button used to submit the form.
 * @param {HTMLImageElement} params.preview - The image element used to preview the uploaded file.
 * @param {HTMLElement} params.inputTextField - The element displaying input-related text (e.g., file instructions or errors).
 *
 * @returns {void}
 *
 * @example
 * // Setup form file picker and validation
 * addImageForm({ uploadBtn, dropZone, fileInput, titleInput, categorySelect, validateAdd, preview, inputTextField });
 */
export function addImageForm({ uploadBtn, dropZone, fileInput, titleInput, categorySelect, validateAdd, preview, inputTextField }) {
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
