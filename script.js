function showImages() {
    const urlHighLight = "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=the"

    fetch(urlHighLight)
        .then(response => response.json())
        .then(data=> {


            let randomUrlHighLightImage = data.objectIDs[Math.floor(Math.random() * data.objectIDs.length)]
            
            const pageImage = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + randomUrlHighLightImage
            
            fetch(pageImage)
                .then(response2 => response2.json())
                .then(data2 => {
                    let imagi = document.querySelector(img)
                    imagi.src = data2.primaryImage
                })
                .catch(error => {
                    console.error(`deu merda: ${error}`);
                })

            
        })
}