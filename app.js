document.addEventListener('DOMContentLoaded', fetchAllMemes);
    const memeContainer = document.getElementById('meme-details');
    const memeList = document.getElementById('memes');
    let myMemes;
    //Function to fetch all memes
    function fetchAllMemes( ) {
        fetch(`https://api.imgflip.com/get_memes`)
        .then(response => response.json())
        .then(data => {
            myMemes = data
            displayMemeList(data)
        })
        .catch(error => console.error('Error fetching meme Details:', error));
    }
    // Function to display meme list
    function displayMemeList(data) {
        //access the 'memes' array from the data object
        const memes = data.data.memes;
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
       memeList.appendChild(memeItem);     
  });
}
// Fetch all memes
    fetchAllMemes();

    const addMemeForm = document.getElementById('addMemeForm')
    addMemeForm.addEventListener('submit', addMeme);

    function addMeme(event){
        event.preventDefault();
    // get values from the form
    const memeId = document.getElementById('memeId').value;
    const name = document.getElementById('name').value;
    const image = document.getElementById('image').value;
    const width = document.getElementById('width').value;
    const height = document. getElementById('height').value;
    const box_count = document.getElementById('box_count').value;
    const captions = document.getElementById('captions').value;
    // check if id,name,url,width,height and image are provided
    if(memeId && name && image && width && height &&box_count && captions) {
        //create a new meme
        const newMeme ={
            id: memeId,
            name: name,
            url: image,
            width: width,
            height: height,
            box_count: box_count,
            captions: captions,
        };
        console.log(newMeme);
        //create alert once you have added the meme
        alert ('Meme added successfully')
    //Send a post request to add the new meme to the server
    fetch('http://localhost:3000/memes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',   
        },
        body:JSON.stringify(newMeme),
    })
       .then(response => response.json())
       .then(data => {
            //Update the UI to display the new meme
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        });
        //clear the form after submission
        addMemeForm.reset();  
    } else {
        //display an alert if any detail is not captured
        alert('Please provide id, name, the image url, width, height, box_count and captions');
    }
}
// Function to display additional memes
function displayAdditionalMemes() {
    fetch('http://localhost:3000/memes')
        .then (response => response.json())
        .then (memes => {
            console.log(memes)
    memes.forEach(meme => {
        const displayJsonMeme = document.createElement('div')
        displayJsonMeme.innerHTML =`
            <h2>${meme.name}</h2>
            <img src="${meme.url}" alt="${meme.name}" style="max-width:100%;">
            <p>Dimensions: ${meme.width} x ${meme.height}</p>
            <p>Box Count: ${meme['box_count']}</p>
            <p>Captions: ${meme.captions}</p>
            <button class="delete"> Delete Meme </button>
    `;

    //Add Delete meme eventlistener
    const deleteButton = displayJsonMeme.querySelector('.delete');
    deleteButton.addEventListener('click', function (e) {
        e.stopPropagation();
        displayJsonMeme.remove();
        const memeId = meme.id;

        fetch(`http://localhost:3000/memes/${memeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => console.log(data))
            // Alert on successful deletion of the meme
                alert ('Meme deleted successfully')
            .catch(error => console.log(error));
    });

    memeList.appendChild(displayJsonMeme);
});
})
.catch(error => console.log(error));
}

displayAdditionalMemes();