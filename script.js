let meuBotao = document.querySelector('button');

meuBotao.addEventListener('click', showImage);

function showImage(){
    
    let txtSearch = document.querySelector('#theLostCanva');
    let pesquisa = txtSearch.value;
    
    const urlDataCanva = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + pesquisa;

    let container = document.getElementById('container')

    fetch(urlDataCanva)
    .then(response => response.json())
        .then(data => {
            for (let index = 0; index < data.total; index++) {
                
                let dados = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + data.objectIDs[index]
                fetch(dados)
                .then(response => response.json())
                .then(data2 => {
                    if (data2.primaryImage == "" || data2.title == "" || data2.title == "undefined" || data2.message == '"Not a valid object"') {
                        index++
                    }
                    
                    let newDiv = document.createElement('div')
                    newDiv.className = 'arts col-3'
    
                    let newImg = document.createElement('img')
                    newImg.id = 'canva'+index
    
                    let newDiv2 = document.createElement('div')
                    newDiv2.id = 'title'+index
                    newDiv2.className = 'align-items-center'
    
                    container.appendChild(newDiv)
                    newDiv.appendChild(newImg)
                    newDiv.appendChild(newDiv2)
                    let imgCanva = document.querySelector('#canva'+index)
                    imgCanva.src = data2.primaryImage
                    let canvaName = data2.title

                    document.getElementById('title'+index).innerText = canvaName
                    })
            }
        })
        .catch(error => {
            console.error(`deu merda: ${error}`);
        })
}