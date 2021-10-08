import './style.css';

const gameID = '6mi2WimEXfqkQBRDCbJa';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`;
const wrapper = document.getElementById('leaderboard-cont');

function searchID(id) {
    return document.getElementById(id);
}

async function fillRank() {
    try {
        const fetching = await fetch(url);
        const res = await fetching.json();
        const data = res;
        let result = Object.entries(data);
        let leaderboard = data.result;
        leaderboard.forEach((element, index) => {
            var liElement = document.createElement('li');
            var liDiv = document.createElement('div');
            var liParagraph = document.createElement('p');
    
            if (index % 2 == 0){
                liDiv.classList.add('p-1');
                liParagraph.innerHTML += `
                    ${element.user}: 
                    ${element.score}`
            }else{
                liDiv.classList.add('bg-light', 'p-1');
                liParagraph.innerHTML += `
                    ${element.user}: 
                    ${element.score}`
            }
            
            liDiv.appendChild(liParagraph);
            liElement.appendChild(liDiv);
            wrapper.appendChild(liElement);
    
        });
    } catch(error) {
        throw new Error(error.message);
}
}

async function sendToApi(){
    const datos = new FormData(form);
    const user = searchID('user').value;
    const score = searchID('score').value;
    let userData = { user, score }

    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(userData)
        })
    } catch(error) {
        throw new Error(error.message);
}
       
}

const refresh = document.getElementById('refresh');
refresh.addEventListener('click', function(e){
    fillRank();
})

const form = document.getElementById('form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    wrapper.innerHTML = '';
    sendToApi();
    fillRank();
});


window.onload = function() {
    fillRank();
};
