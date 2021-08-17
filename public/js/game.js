const socket = io('http://localhost:8080', { secure: true, reconnect: true, requestCert: false, rejectUnauthorized: false });

socket.on('connect', (data) => {
    socket.emit('join', 'Client joined');
})

socket.on('update', () => {
    console.log('update result');
})

let token = window.localStorage.getItem('token');
if (!token) {
    window.location.href = "http://localhost:8080/";
    window.location.replace("http://localhost:8080/");
}
