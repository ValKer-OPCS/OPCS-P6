import { deleteWork } from "./fetcher.js";
import { displayWorks } from "./gallery.js";
import { displayModalWorks } from "./modal.js"

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