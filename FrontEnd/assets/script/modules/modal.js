

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
if (sessionStorage.getItem("token")){

    const modal = document.getElementById('modal')
    const modalOpenBtn = document.getElementById('editBtn')

    modalOpenBtn.addEventListener('click', () => {
        modal.showModal()
    });
displayWorks('.modalGallery',images, true)



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


        function resetModal() {
            deleteConfirmation.style.display = 'none';
            addBtn.style.display = 'inline-block';
        }

        function onConfirm(event) {
            event.preventDefault();
            resetModal();
            resolve(true);
        }

        function onCancel(event) {
            event.preventDefault();
            resetModal();
            resolve(false);
        }

        confirmDelete.addEventListener('click', onConfirm);
        cancelDelete.addEventListener('click', onCancel);
    });
}