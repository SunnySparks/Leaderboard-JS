import './style.css';

//const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/QzGv34LB2uIZhM79CnAe/scores'
const gameID = '6mi2WimEXfqkQBRDCbJa';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`;
const wrapper = document.getElementById('leaderboard-cont');
/*
fetch(url, {
    method: 'POST',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(
        { 
            "name": "My Game" 
        }
    )
})
.then( res => res.json())
.then( data =>  {
    console.log(data);
})
*/

function searchID(id) {
    return document.getElementById(id);
}
  

class usersDatabase {
    constructor() {
      this.userList = [];
    }
  
    addNewUser(userInfo) {
      this.userList.push(userInfo);
    }
  
    deleteUser(userInfo) {
      this.userList = this.userList.filter((element) => element.id !== userInfo.id);
    }
}

/*
const Users = new usersDatabase();

function addUsers() {
    const userName = searchID('user').value;
    const score = searchID('score').value;
    const id = Date.now();
    const object = new User(userName, score, id);
    Users.addNewUser(object);
    //showUser(object);
    localStorage.usersList = JSON.stringify(Users.userList);
  }

*/


const form = document.getElementById('form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    //console.log('click');

    const datos = new FormData(form);
    //console.log(datos);
    //let user = datos.get('user');
    //let score = datos.get('score');
    const user = searchID('user').value;
    const score = searchID('score').value;
    let userData = { user, score }
    //console.log(user);
    //console.log(score);

    /*
    fetch(url, {
    })
    .then( res => res.json())
    .then( data =>  {
    })
    */

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(userData)
    })
    .then( res => {
        return res.json()
    })
    .then( data =>  {
        //console.log(data);
        console.log(userData);
    })
});


fetch(url, {
})
.then( res => {
    return res.json()
})
.then( data =>  {
    //console.log(data);
    console.log('This is the result', data, typeof data);
    /*
    data.forEach(element => {
        console.log(element);
    });
    */
   let result = Object.entries(data);
   let leaderboard = result[0][1]
   console.log(result, typeof result);
   console.log(data);
   console.log(result[0][1], leaderboard);

   leaderboard.forEach(element => {
    console.log(element);
    wrapper.innerHTML += `
    <li class="p-1">
        <div>
            <p>
                ${element.user}: 
                ${element.score}
            </p>
        </div>
    </li>`
});
})


const handleGetGames = async () => {
    try {
        const result = fetch(url);

        console.log('result', result);

    } catch (error) {
      throw new Error(error.message);
    }
  };
