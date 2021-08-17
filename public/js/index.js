let form = document.getElementById('form');
let loginURL = "http://localhost:8080/users/login"

form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.dir(form.username.value);
    

    
    
})

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
  
postData(loginURL, { 
    email: 'thanhmy@gmail.com',
    password: 'hellothere123'
}).then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
    window.localStorage.setItem('token', data.token);
    window.location.href = "http://localhost:8080/game";
    window.location.replace("http://localhost:8080/game");
  });