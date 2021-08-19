const URL = "http://localhost:8080";

window.onload = function() {
    const form = document.getElementById('login');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.email.value;
        const password = form.password.value;

        fetch('/users/login', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                email,
                password
            })
        }).then((res) => res.json())
        .then(data => {
            window.sessionStorage.setItem('token', data.token);
            window.location.href = "/";
            window.location.replace("/");
        })
        .catch(function() {
                console.log("error");
            });
    })
}