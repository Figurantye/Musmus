let meuBotao = document.querySelector('button');

meuBotao.addEventListener('click', showImage);

function showImage(){
    
    let txtSearch = document.querySelector('#theLostCanva');
    let pesquisa = txtSearch.value;
    
    const urlDataCanva = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + pesquisa;

    fetch(urlDataCanva)
        .then(response => response.json())
        .then(data => {
            for (let index = 0; index < data.ObjectIDs.length; index++) {
                
            }
        })

}