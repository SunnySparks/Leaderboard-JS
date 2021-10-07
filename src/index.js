import './style.css';


const result = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/1/scores/'

var form = document.getElementById('form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    console.log('click');

    var datos = new FormData(form);
    console.log(datos);
    console.log(datos.get('user'));
    console.log(datos.get('score'));

    fetch(result, {
        method: 'POST',
        body: datos
    })
    .then( res => res.json())
    .then( data =>  {
        console.log(data);
    })
});

/*
fetch(result, {
    method: 'POST',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "score": "225",
        "user": "Pepito"
    }
})
.then(response => response.json() )
.then(data => {
    console.log(data);
})
.catch(err=>console.log(err))*/