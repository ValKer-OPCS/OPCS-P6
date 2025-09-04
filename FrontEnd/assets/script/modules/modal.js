import { displayWorks } from "./gallery.js";

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