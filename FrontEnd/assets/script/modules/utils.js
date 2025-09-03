export function clearHTMLElement(elementToClear){
    const element = document.querySelector(elementToClear);
    if (element) {
        element.innerHTML = "";
    } else {
        console.warn(`Aucun élément trouvé pour le sélecteur "${elementToClear}"`);
    }
}
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

export function clearSessionStorage(item) {
  sessionStorage.removeItem(item);
}