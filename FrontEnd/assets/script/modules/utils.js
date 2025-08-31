export function clearHTMLElement(elementToClear){
    const el = document.querySelector(elementToClear);
    if (el) {
        el.innerHTML = "";
    } else {
        console.warn(`Aucun élément trouvé pour le sélecteur "${elementToClear}"`);
    }
}