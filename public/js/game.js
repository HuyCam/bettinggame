const BET_ITEM_TYPE = {
    HIGH_YIELD_ITEM: {
        TYPE: 'PINK',
        FOX: 'FOX',
        SNAKE: 'SNAKE',
        LION: 'LION',
        T_REX: 'T_REX'
    },
    LOW_YIELD_ITEM: {
        TYPE: 'BLUE',
        BULL: 'BULL',
        DOG: 'DOG',
        ELEPHANT: 'ELEPHANT',
        ORCA: 'ORCA'
    }
};

const gameSetting = {
    MAX_RANDOMIZED: 1000,
    ITEM_WIN_TIMES: {
        FOX: 10,
        SNAKE: 15,
        LION: 25,
        T_REX: 45,
        BULL: 5,
        DOG: 5,
        ELEPHANT: 5,
        ORCA: 5
    },
    MAX_ITEM_BET: 6,
    imageSrc: {
        BULL: '/img/bull.svg',
        DOG: '/img/dog.svg',
        ELEPHANT: '/img/elephant.svg',
        ORCA: '/img/orca.svg',
        FOX: '/img/fox.svg',
        SNAKE: '/img/snake.svg',
        LION: '/img/lion.svg',
        T_REX: '/img/t_rex.svg',
        CASH: '/img/cash.svg'
    }
}

let view = {
    createBoardGame: function(userBet) {
        let itemWinTimes = gameSetting.ITEM_WIN_TIMES;
        let html = `<div class="container game-board">
                <div class="row">
                    <div class="item-container col-sm">
                        <div class="item item-detail">
                            ${itemWinTimes.DOG} times
                        </div>
                        <div class="item item-icon">
                            <img class="bet-item" id="dog" src="${gameSetting.imageSrc.DOG}" alt="dog">
                        </div>
                        <div class="item item-bet" id="dog-bet-amount">
                            
                        </div>   
                    </div>
                    <div class="item-container col-sm">
                        <div class="item item-detail">
                            ${itemWinTimes.BULL} times
                        </div>
                        <div class="item item-icon">
                            <img class="bet-item" id="bull" src="${gameSetting.imageSrc.BULL}" alt="bull">
                        </div>
                        <div class="item item-bet" id="bull-bet-amount">
                            
                        </div>  
                    </div>
                    <div class="item-container col-sm">
                        <div class="item item-detail">
                            ${itemWinTimes.FOX} times
                        </div>
                        <div class="item item-icon">
                            <img class="bet-item" id="fox" src="${gameSetting.imageSrc.FOX}" alt="fox">
                        </div>
                        <div class="item item-bet" id="fox-bet-amount">
                            
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="item-container col-sm">
                        <div class="item item-detail">
                            ${itemWinTimes.ELEPHANT} times
                        </div>
                        <div class="item item-icon">
                            <img class="bet-item" id="elephant" src="${gameSetting.imageSrc.ELEPHANT}" alt="elephant">
                        </div>
                        <div class="item item-bet" id="elephant-bet-amount">
                            
                        </div>
                    </div>
                    <div class="item-container col-sm">
                        <div class="item item-icon">
                            <p>Timer</p>
                            <p id="timer"></p>
                        </div>
                        
                    </div>
                    <div class="item-container col-sm">
                        <div class="item item-detail">
                            ${itemWinTimes.SNAKE} times
                        </div>
                        <div class="item item-icon">
                            <img class="bet-item" id="snake" src="${gameSetting.imageSrc.SNAKE}" alt="snake">
                        </div>
                        <div class="item item-bet" id="snake-bet-amount">
                            
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="item-container col-sm">
                        <div class="item item-detail">
                            ${itemWinTimes.ORCA} times
                        </div>
                        <div class="item item-icon">
                            <img class="bet-item" id="orca" src="${gameSetting.imageSrc.ORCA}" alt="orca">
                        </div>
                        <div class="item item-bet" id="orca-bet-amount">
                            
                        </div>
                    </div>
                    <div class="item-container col-sm">
                        <div class="item item-detail">
                            ${itemWinTimes.T_REX} times
                        </div>
                        <div class="item item-icon">
                            <img class="bet-item" id="t_rex" src="${gameSetting.imageSrc.T_REX}" alt="t_rex">
                        </div>
                        <div class="item item-bet" id="t_rex-bet-amount">
                            
                        </div>
                    </div>
                    <div class="item-container col-sm">
                        <div class="item item-detail">
                            ${itemWinTimes.LION} times
                        </div>
                        <div class="item item-icon">
                            <img class="bet-item" id="lion" src="${gameSetting.imageSrc.LION}" alt="lion">
                        </div>
                        <div class="item item-bet" id="lion-bet-amount">
                            
                        </div>     
                    </div>
                </div>
            </div>`;

        return html;
    },
    createBetOption: function() {

    },
    updateGameBoard: function() {
        $('.item-bet').text('');
        this.updateMoneyView();
    },
    updateMoneyView: ()=> {
        $('#money').text(model.user.money);
    },
    displayLast8Results: function(last8Results) {
        $('#result').empty();
        last8Results.forEach((value) => {
            let imgEle = document.createElement("img");
            imgEle.classList.add("result-item");
            imgEle.src = gameSetting.imageSrc[value];
            $('#result').append(imgEle)
        })
    }
}

let model = {
    gameState: '',
    id: '',
    last8Results: [],
    betamount: 0,
    betItem: {
        bull: 0,
        dog: 0,
        elephant: 0,
        orca: 0,
        fox: 0,
        snake: 0,
        lion: 0,
        t_rex: 0
    },
    timeCount: 0,
    updateBetAmount: function(betItem, amount) {
        this.betItem[betItem] += amount;
        return this.betItem[betItem];
        
    },
    resetBet: function() {
        this.betItem.bull = 0;
        this.betItem.dog = 0;
        this.betItem.elephant = 0;
        this.betItem.orca = 0;
        this.betItem.fox = 0;
        this.betItem.snake = 0;
        this.betItem.lion = 0;
        this.betItem.t_rex = 0;
    },
    setMoney: function(money) {
        this.user.money = money;
    },
    addMoney: function(money) {
        this.user.money += money;
    },
    deductMoney: function(money) {
        this.user.money += money;
    },
    setLast8Results: function(last8Results) {
        this.last8Results = last8Results;
    }
}

let control = {
    renderBoardGame: function() {
        let html = view.createBoardGame();
        document.getElementById('main').innerHTML = html;

        // add event listener to those added element
    },
    processNextDrawTime: (utcNextDrawTime) => {
        let nextDrawTime = new Date(utcNextDrawTime).getTime();
        let now = new Date().getTime();
        let timeDif = nextDrawTime - now;
        model.timeCount = timeDif;
        return timeDif;
    },

    resetBet: () => {
        model.resetBet();
        view.updateGameBoard();
    },
    calculateMoney: function(money) {
        if (money >= 0) {
            model.addMoney(money);
        } else {
            model.deductMoney(money);
        }

        view.updateMoneyView();
    },
    setMoney: function(money) {
        model.setMoney(money);
        view.updateMoneyView();
    },
    calculateResult: function(result) {
        const betItemName = result.toLowerCase();
        const itemWinTimes = gameSetting.ITEM_WIN_TIMES[result];
        const winAmount = parseInt(model.betItem[betItemName]) *  parseInt(itemWinTimes);

        this.calculateMoney(winAmount);
    },
    setLast8Results: function(last8Results) {
        model.setLast8Results(last8Results);
        view.displayLast8Results(model.last8Results);
    }
}

const initializeUser = async function() {
    const token = window.sessionStorage.getItem('token');

    if (!token) {
        window.location.href = "/login.html";
        window.location.replace("/login.html");
    } else {
        // fetch user info and display boardgame, attach event listener etc
        const response = await fetch('/me', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });

        const body = await response.json();
        console.log(body);
        model.user = body.user;
        model.id = body.user._id;
    }
}

window.onload = async function() {
    await initializeUser();
    const socket = io('');
    control.renderBoardGame();
    
    view.updateMoneyView();

    // add event listener for bet option
    $('.bet-amount').on('click', function(e) {
        const value = $(this).text();
        model.betamount  =parseInt(value);
        $('.bet-amount').removeClass('bet-picked');
        $(this).addClass('bet-picked');
        console.log('model ', model.betamount);
    })

    $('.bet-item').on('click', (e) => { 
        console.log('click bet-item');
        const betAmount = model.betamount;
        const betItem = e.target.id;
        const betElementId = `#${betItem}-bet-amount`;
        // emit bet value to server        
            socket.emit('bet', {
                "_id": model.user._id,
                "bet": {
                        "item": betItem.toUpperCase(),
                        "value": betAmount
                }
            }, (error,success) => {
                if (error) {
                    // if you can not bet due to time is over
                    console.log(error);
                } else {
                    // update bet on model
                    const result = model.updateBetAmount(betItem, betAmount);
                    // deduct money
                    control.calculateMoney(0 - betAmount);
                    
                    $(betElementId).text(result);
                    console.log(success);
                }
            })
    })

    socket.on('update', () => {
        socket.emit('getresult', (error, success, body) => {
            if (error) {
                console.log(error);
            } else if (success) {
                // update money
                control.calculateResult(body.result);
                // reset bet
                control.resetBet();
                // display results
                control.setLast8Results(body.last8Results);
                
                console.log('next draw time ' + control.processNextDrawTime(body.nextDrawTime));
            }
        })
    })

    socket.on('gamesetting', (body, callback) => {
        let nextDrawTime = new Date(body.nextDrawTime).getTime();
        let now = new Date().getTime();
        let timeDif = nextDrawTime - now;
        model.timeCount = timeDif;

        control.setLast8Results(body.last8Results);
        callback(null, 'succesfully set up gamesetting');
    })

    setInterval(function() {
        let displayTime = Math.trunc(model.timeCount / 1000);
        if (displayTime >= 0 && displayTime <= 30) {
            document.getElementById('timer').textContent = displayTime;
        }
    
        model.timeCount -= 1000;
    }, 1000)
    
    
}

