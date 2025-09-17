import { deleteWork } from "../fetcher.js";
import { displayWorks } from "../gallery.js";
import { displayModalWorks } from "./modal.js"


/**
 * Attaches a delete event listener to a work's figure element in the modal gallery.
 *
 * @async
 * @function deleteWorksQuery
 * @param {HTMLElement} figure - The `<figure>` element representing the work in the modal gallery.
 * @param {Object} work - The work object to be deleted.
 * @param {number} work.id - The unique identifier of the work.
 * @param {string} work.title - The title of the work.
 * @param {Object[]} imagesArray - The array of all works being displayed.
 * @param {number} index - The index of the work in the `imagesArray`.
 *
 * @returns {Promise<void>} A promise that resolves after the delete operation and UI updates.
 *
 * @example
 * // Attach delete functionality to a figure
 * deleteWorksQuery(figureElement, workObject, worksArray, 2);
 */
export async function deleteWorksQuery(figure,work,imagesArray,index){
const deleteButton = figure.querySelector('.deleteButton');
        deleteButton.addEventListener('click', async () => {
            const confirmed = await showDeleteQuery(`Supprimer "${work.title}" ?`);
            if (!confirmed) return;

            const success = await deleteWork(work.id);
            if (success) {
                figure.remove();
                imagesArray.splice(index, 1);
                displayWorks('.gallery', imagesArray);
                displayModalWorks(imagesArray);
            }
        });
}


/**
 * Displays a confirmation dialog for deleting a work and returns the user's response as a Promise.
 *
 * @function showDeleteQuery
 * @param {string} message - The message to display in the delete confirmation modal.
 * @returns {Promise<boolean>} A promise that resolves to `true` if confirmed, or `false` if canceled.
 *
 * @example
 * // Show a confirmation dialog for deleting a work
 * const confirmed = await showDeleteQuery('Do you really want to delete "My Work"?');
 * if (confirmed) {
 *     console.log('User confirmed deletion');
 * } else {
 *     console.log('User canceled deletion');
 * }
 */
export function showDeleteQuery(message) {
    return new Promise((resolve) => {
        const addBtn = document.getElementById('addPictureBtn');
        const deleteConfirmation = document.getElementById('deleteConfirmation');
        const modalText = document.getElementById('modalText');
        const confirmDelete = document.getElementById('confirmDelete');
        const cancelDelete = document.getElementById('cancelDelete');

        addBtn.style.display = 'none';
        deleteConfirmation.style.display = 'flex';
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