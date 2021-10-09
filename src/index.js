import './style.css';
import Bg from './bg.png';

const gameID = '6mi2WimEXfqkQBRDCbJa';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`;
const wrapper = document.getElementById('leaderboard-cont');

const searchID = (id) => document.getElementById(id);

const fillRank = async () => {
  try {
    const fetching = await fetch(url);
    const res = await fetching.json();
    const data = res;
    const leaderboard = data.result;
    leaderboard.forEach((element, index) => {
      const liElement = document.createElement('li');
      const liDiv = document.createElement('div');
      const liParagraph = document.createElement('p');
      liParagraph.classList.add('p-1');

      if (index % 2 === 0) {
        liDiv.classList.add('white-bg', 'p-1');
        liParagraph.innerHTML += `
                    ${element.user}: 
                    ${element.score}`;
      } else {
        liDiv.classList.add('light-bg', 'p-1');
        liParagraph.innerHTML += `
                    ${element.user}: 
                    ${element.score}`;
      }

      liDiv.appendChild(liParagraph);
      liElement.appendChild(liDiv);
      wrapper.appendChild(liElement);
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendToApi = async () => {
  const user = searchID('user').value;
  const score = searchID('score').value;
  const userData = { user, score };

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(userData),
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const refresh = document.getElementById('refresh');
refresh.addEventListener('click', () => {
  wrapper.innerHTML = '';
  fillRank();
});

const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  wrapper.innerHTML = '';
  sendToApi();
  fillRank();
});

fillRank();