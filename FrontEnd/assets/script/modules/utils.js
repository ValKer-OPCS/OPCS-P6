export function clearHTMLElement(elementToClear){
    const element = document.querySelector(elementToClear);
    if (element) {
        element.innerHTML = "";
    } else {
        console.warn(`Aucun élément trouvé pour le sélecteur "${elementToClear}"`);
    }
}