// const socket = io('');
/*
socket.on('connection', () => {
    socket.emit('join');
})
socket.on('update', () => {
    socket.emit('getresult', (error, success, body) => {
        if (error) {
            console.log(error);
        } else if (success) {
            console.log('next draw time ' + processNextDrawTime(body.nextDrawTime));
        }
    })
})

socket.on('gamesetting', (body, callback) => {
    console.dir(body);
    let nextDrawTime = new Date(body.nextDrawTime).getTime();
    let now = new Date().getTime();
    let timeDif = nextDrawTime - now;
    console.log('timedif ' + timeDif);
    timeCount = timeDif;
    callback(null, 'hello back');
})

var timeCount = null;
setInterval(function() {
    let displayTime = Math.trunc(timeCount / 1000);
    if (displayTime >= 0 && displayTime <= 30) {
        
        document.getElementById('timer').textContent = displayTime ;
        
    }

    timeCount -= 1000;
}, 1000)

const processNextDrawTime = (utcNextDrawTime) => {
    let nextDrawTime = new Date(utcNextDrawTime).getTime();
    let now = new Date().getTime();
    let timeDif = nextDrawTime - now;
    timeCount = timeDif;
    return timeDif;
}

document.getElementById('bet').addEventListener('click', (e) => {
    console.dir(e.target.tagName);
    console.log(e.target.textContent);

    if (e.target.tagName === "BUTTON") {
        socket.emit('bet', {
            "_id": "611b53d67be5f30194404d7e",
            "bet": {
                    "item": e.target.textContent,
                    "value": 200
            }
        }, (error,success) => {
            if (error) {
                // if you can not bet due to time is over
                console.log(error);
            } else {
                console.log(success);
            }
        })
    }

})
*/