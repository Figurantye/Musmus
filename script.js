let meuBotao = document.querySelector('button');
meuBotao.addEventListener('click', showImage);

function showImage(){
    let txtSearch = document.querySelector('#theLostCanva');
    let pesquisa = txtSearch.value;
    const urlDataCanva = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + pesquisa;

    try {
        let cont = document.getElementById('container')
        cont.remove()
    } catch (error) {
        console.error(error);
    }

    let ywch = document.getElementById('god')

    let container = document.createElement('div')
    container.id = 'container'
    container.className = 'row'
    
    let checkCanva = document.getElementById('onlyCanva')

    fetch(urlDataCanva)
        .then(response => response.json())
        .then(data => {
            for (let index = 0; index < data.total; index++) {
                let dados = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + data.objectIDs[index]
                let total = document.getElementById('total')
                try {
                    total.innerText = 'results: ' + data.total
                } catch (error) {
                    total.innerText = 'results: 0'
                    console.error(error);

                }
                fetch(dados)
                    .then(response => response.json())
                    .then(data2 => {
                        try {
                            if (!data2.primaryImage || data2.primaryImage == "") {
                                index++
                            } else {
                                if (checkCanva.checked == true) {
                                    if (data2.objectName == "Painting" || data2.objectName == "Drawing" || data2.objectName == "Folio" || data2.objectName == "Tangka" || data2.objectName == "Wall painting" || data2.objectName == "Hanging scroll" || data2.objectName == "Print" || data2.objectName == "Handscroll" || data2.objectName == "Woodblock print" || data2.objectName == "Screens") {
                                        let newDiv = document.createElement('div')
                                        newDiv.className = 'arts col-3'
                                        let title = document.createElement('div')
                                        title.id = 'title'+index
                                        let author = document.createElement('div')
                                        author.id = 'author'+index
                                        let fullImg = document.createElement('a')
                                        fullImg.href = data2.primaryImage
                                        fullImg.target = 'blank'
                                        let newImg = document.createElement('img')
                                        newImg.src = data2.primaryImageSmall

                                        ywch.appendChild(container)
                                        container.appendChild(newDiv)
                                        newDiv.appendChild(fullImg)
                                        newDiv.appendChild(title)
                                        newDiv.appendChild(author)
                                        fullImg.appendChild(newImg)
                                    
                                        document.getElementById('title'+index).innerText = "title: " + data2.title 
                                        document.getElementById('author'+index).innerText = 'author: '+ data2.constituents[0].name
                                    } else {
                                        index++
                                    }
                                } else {
                                    let newDiv = document.createElement('div')
                                    newDiv.className = 'arts col-3'
                                    let title = document.createElement('div')
                                    title.id = 'title'+index
                                    let author = document.createElement('div')
                                    author.id = 'author'+index
                                    author.onclick="creator(data2.constituents[0].name)"
                                    let fullImg = document.createElement('a')
                                    fullImg.href = data2.primaryImage
                                    fullImg.target = 'blank'
                                    let newImg = document.createElement('img')
                                    newImg.src = data2.primaryImageSmall
                                    ywch.appendChild(container)
                                    container.appendChild(newDiv)
                                    newDiv.appendChild(fullImg)
                                    newDiv.appendChild(title)
                                    newDiv.appendChild(author)
                                    fullImg.appendChild(newImg)
                                
                                    document.getElementById('title'+index).innerText = "title: " + data2.title 
                                    document.getElementById('author'+index).innerText = 'author: '+ data2.constituents[0].name
                                }
                            }
                        } catch (error) {

                        }
                        })
                    }
                    })  
                .catch(error => {
                    console.error(`deu merda: ${error}`);
        })
}

