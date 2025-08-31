
async function getWorks() {
    const responseWorks = await fetch('http://127.0.0.1:5678/api/works');
    const dataWorks = await responseWorks.json();
    console.log(dataWorks);
    return dataWorks;
}



getWorks()