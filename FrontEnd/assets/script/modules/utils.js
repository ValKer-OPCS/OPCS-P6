/**
 * Clears the inner HTML content of the given element specified by the CSS selector.
 *
 * @param {string} elementToClear - A CSS selector string representing the element to be cleared.
 */
export function clearHTMLElement(elementToClear){
    const element = document.querySelector(elementToClear);
    if (element) {
        element.innerHTML = "";
    } else {
        console.warn(`Aucun élément trouvé pour le sélecteur "${elementToClear}"`);
    }
}


/**
 * Adds an event listener to the window object to perform a smooth scroll on page load if there is a hash in the URL.
 * When the window is loaded, the function finds the target element corresponding to the hash and scrolls to it smoothly.
 */
export function smoothScrollOnLoad(){
    window.addEventListener("load", () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }
});
}

/**
 * Removes the specified item from the session storage.
 *
 * @param {string} item - The key of the item to be removed from session storage.
 */
export function clearSessionStorage(item) {
  sessionStorage.removeItem(item);
}