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
                    if (data2.primaryImageSmall == "" || data2.title == "" || data2.title == "undefined" || data2.message == "Not a valid object" || !data2.primaryImage) {
                        index++
                    } else {
                        let newDiv = document.createElement('div')
                        newDiv.className = 'arts col-3'
                        let newImg = document.createElement('img')
                        newImg.src = data2.primaryImageSmall
                        let title = document.createElement('div')
                        title.id = 'title'+index
                        let author = document.createElement('div')
                        author.id = 'author'+index
                        container.appendChild(newDiv)
                        newDiv.appendChild(newImg)
                        newDiv.appendChild(title)
                        newDiv.appendChild(author)

                        document.getElementById('title'+index).innerText = "title: " + data2.title 
                        document.getElementById('author'+index).innerText = 'author: '+ data2.constituents[0].name
                    }
                })
            }
        })
        .catch(error => {
            console.error(`deu merda: ${error}`);
        })
}