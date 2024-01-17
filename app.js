document.addEventListener('DOMContentLoaded', function (){
    const memeContainer = document.getElementById('meme details');
    const memeList = document.getElementById('memes');
//Function to fetch meme details
    function fetchMemeDetails(memeId) {
        fetch(`http://localhost:3000/data/${memeId}`)
            .then(response => response.json())
            .then(data => displayMemeDetails(data))
            .catch(error => console.error('Error fetching meme details:'))
    }
})
// Function to display meme details
function displayMemeDetails(data) {
        const memeDetailsHTML =`
        <h2>${data.name}</h2>
        <img src="${data.url}" alt="${data.name}" style="max-width:100%;">
        <p>Dimensions: ${data.width} * ${data.height}</p>
        <p>Box Count: ${data['box_count']}</p>
        <p>Captions: ${data.captions}</p>
        `;
       memeContainer.innerHTML = memeDetailsHTML      
}
fetchMemeDetails();