
async function getWorks() {
    const responseWorks = await fetch('http://127.0.0.1:5678/api/works');
    const dataWorks = await responseWorks.json();
    console.log(dataWorks);
    return dataWorks;
}

function displayWorks(workLocation) {
    const divGallery = document.querySelector(".gallery");
    divGallery.innerHTML = "";
    workLocation.forEach(work => {
        const figure = document.createElement('figure');

        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        divGallery.appendChild(figure);
    });

}
async function init() {
    const dataWorks = await getWorks();
    displayWorks(dataWorks);
}


init()