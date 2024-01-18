document.addEventListener('DOMContentLoaded', function (){
    const memeContainer = document.getElementById('meme-details');
    const memeList = document.getElementById('memes');
    //Function to fetch all memes
    function fetchAllMemes( ) {
        fetch(`http://localhost:3000/data`)
        .then(response => response.json())
        .then(data => displayMemeList(data))
        .catch(error => console.error('Error fetching meme Details:', error));
    }
    // Function to fetch detailed meme information
    function fetchMemeDetails(memeId) {
        fetch(`http://localhost:3000/data/${memeId}`)
            .then(response => response.json())
            .then(data => displayMemeDetails(data))
            .catch(error => console.error('Error fetching detailed meme details:',error));
    }
    // Function to display meme list
    function displayMemeList(data) {
        //access the 'memes' array from the data object
        const memes = data.memes;
        memeList.innerHTML='';
        //iterate through the list of memes and create HTML elements
        memes.forEach(meme => {
        const memeItem = document.createElement('div');
        memeItem.innerHTML =`
        <h2>${meme.name}</h2>
        <img src="${meme.url}" alt="${meme.name}" style="max-width:100%;">
        <p>Dimensions: ${meme.width} x ${meme.height}</p>
        <p>Box Count: ${meme['box_count']}</p>
        <p>Captions: ${meme.captions}</p>
    `;
    // Adding click event listener
    memeItem.addEventListener('click', function () {
        fetchMemeDetails(meme.id);
    });
       memeList.appendChild(memeItem);     
  });
}
    //function to display detailed meme information
    function displayMemeDetails(meme) {
        const memeDetailsHTML = `
            <h2>${meme.name}</h2>
            <img src="${meme.url}" alt="${meme.name}" style="max-width:100%;">
            <p>Dimensions: ${meme.width} x ${meme.height}</p>
            <p>Box Count: ${meme['box_count']}</p>
            <p>Captions: ${meme.captions}</p>
        `;
        memeContainer.innerHTML = memeDetailsHTML;
    }

// Fetch all memes
    fetchAllMemes();
});