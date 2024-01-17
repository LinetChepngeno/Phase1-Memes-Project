document.addEventListener('DOMContentLoaded', function (){
    const memeContainer = document.getElementById('meme details');
    const memeList = document.getElementById('memes');
//Function to fetch meme details
    function fetchMemeDetails(memeId) {
        fetch(`http://localhost:3000/data/${memeId}`)
            .then(response => response.json())
            .then(data => displayMemeDetails(data));
    }
})
// Function to display meme details
function to displayMemeDetails(data) {
        const memeDetailsHTML =`
        <h2>${data.name}</h2
        <img src="${data.url}" alt="${data.name}"
        `
       
        
}