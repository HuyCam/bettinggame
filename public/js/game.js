const BET_ITEM_TYPE = {
    HIGH_YIELD_ITEM: {
        TYPE: 'PINK',
        FOX: 'FOX',
        SNAKE: 'SNAKE',
        JAGUAR: 'JAGUAR',
        LION: 'LION'
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
        JAGUAR: 25,
        LION: 45,
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
        JAGUAR: '/img/jaguar.svg',
        LION: '/img/lion.svg',
        CASH: '/img/cash.svg',
        GOLD_BAR: '/img/gold-bar.svg',
        GOLD_COIN: '/img/gold-coin.svg'
    },
    itemDataIndex: {
        DOG: 7,
        BULL: 6,
        FOX: 5,
        SNAKE: 4,
        JAGUAR: 3,
        LION: 2,
        ORCA: 1,
        ELEPHANT: 0
    },
    gameState: {
        BETTING: 'BETTING',
        DRAWING: 'DRAWING',
        RESULTING: 'RESULTING'
    },
    spinInterval: 200,
    betInterval: 1000,
    resultInterval: 1000,
    spinCountDown: 500,
    resultCountDown: 5
    
}

let view = {
    createBoardGame: function() {
        let itemWinTimes = gameSetting.ITEM_WIN_TIMES;
        let html = `<div class="container game-board">
                <div class="row">
                    <div class="item-container col-md">
                        <div class="item item-detail">
                            ${itemWinTimes.DOG} times
                        </div>
                        <div class="item item-icon animate__animated" data-index="7">
                            <img class="bet-item animate__animated"  id="dog" src="${gameSetting.imageSrc.DOG}" alt="dog">
                        </div>
                        <div class="item item-bet" id="dog-bet-amount">
                            
                        </div>   
                    </div>
                    <div class="item-container col-md">
                        <div class="item item-detail">
                            ${itemWinTimes.BULL} times
                        </div>
                        <div class="item item-icon animate__animated" data-index="6">
                            <img class="bet-item animate__animated"  id="bull" src="${gameSetting.imageSrc.BULL}" alt="bull">
                        </div>
                        <div class="item item-bet" id="bull-bet-amount">
                            
                        </div>  
                    </div>
                    <div class="item-container col-md">
                        <div class="item item-detail">
                            ${itemWinTimes.FOX} times
                        </div>
                        <div class="item item-icon animate__animated" data-index="5">
                            <img class="bet-item animate__animated"  id="fox" src="${gameSetting.imageSrc.FOX}" alt="fox">
                        </div>
                        <div class="item item-bet" id="fox-bet-amount">
                            
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="item-container col-md">
                        <div class="item item-detail">
                            ${itemWinTimes.ELEPHANT} times
                        </div>
                        <div class="item item-icon animate__animated" data-index="0">
                            <img class="bet-item animate__animated"   id="elephant" src="${gameSetting.imageSrc.ELEPHANT}" alt="elephant">
                        </div>
                        <div class="item item-bet" id="elephant-bet-amount">
                            
                        </div>
                    </div>
                    <div class="item-container col-md">
                        <div class="item ">
                            <p>Timer</p>
                            <p id="timer"></p>
                            <p id="noti-text"></p>
                        </div>
                        
                    </div>
                    <div class="item-container col-md">
                        <div class="item item-detail">
                            ${itemWinTimes.SNAKE} times
                        </div>
                        <div class="item item-icon animate__animated" data-index="4">
                            <img class="bet-item animate__animated"  id="snake" src="${gameSetting.imageSrc.SNAKE}" alt="snake">
                        </div>
                        <div class="item item-bet" id="snake-bet-amount">
                            
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="item-container col-md">
                        <div class="item item-detail">
                            ${itemWinTimes.ORCA} times
                        </div>
                        <div class="item item-icon animate__animated" data-index="1">
                            <img class="bet-item animate__animated"  id="orca" src="${gameSetting.imageSrc.ORCA}" alt="orca">
                        </div>
                        <div class="item item-bet" id="orca-bet-amount">
                            
                        </div>
                    </div>
                    <div class="item-container col-md">
                        <div class="item item-detail">
                            ${itemWinTimes.LION} times
                        </div>
                        <div class="item item-icon animate__animated" data-index="2">
                            <img class="bet-item animate__animated"  id="lion" src="${gameSetting.imageSrc.LION}" alt="lion">
                        </div>
                        <div class="item item-bet" id="lion-bet-amount">
                            
                        </div>
                    </div>
                    <div class="item-container col-md">
                        <div class="item item-detail">
                            ${itemWinTimes.JAGUAR} times
                        </div>
                        <div class="item item-icon animate__animated" data-index="3">
                            <img class="bet-item animate__animated"  id="jaguar" src="${gameSetting.imageSrc.JAGUAR}" alt="jaguar">
                        </div>
                        <div class="item item-bet" id="jaguar-bet-amount">
                            
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

            switch(value) {
                case BET_ITEM_TYPE.HIGH_YIELD_ITEM.FOX:
                case BET_ITEM_TYPE.HIGH_YIELD_ITEM.SNAKE:
                case BET_ITEM_TYPE.HIGH_YIELD_ITEM.JAGUAR:
                case BET_ITEM_TYPE.HIGH_YIELD_ITEM.LION:
                    imgEle.classList.add("high-yield-item");
                    break;
            }

            $('#result').append(imgEle)
        })
    },
    displayTime: function(newTime) {
        document.getElementById('timer').textContent = newTime;
    },
    displayNotiText: function(text) {
        $('#noti-text').html(text);
    },
    displayWinnerBoard: function(html) {
        $('#winner-board').html(html);
    }
}

let model = {
    nextDrawTime: null,
    gameState: '',
    id: '',
    lastResult:'',
    lastWinAmount: '',
    lastBetAmount: '',
    bigWinnerQueue:[],
    last8Results: [],
    notiText:'',
    betamount: 0,
    betItem: {
        bull: 0,
        dog: 0,
        elephant: 0,
        orca: 0,
        fox: 0,
        snake: 0,
        jaguar: 0,
        lion: 0
    },
    timeCount: 0,
    spinCountDown: 0,
    spinIntervalTime: 200,
    secondIntervalTime: 1000,
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
        this.betItem.jaguar = 0;
        this.betItem.lion = 0;
    },
    calculateBetAmount: function() {
        let lastBetAmount = 0;
        lastBetAmount += this.betItem.bull;
        lastBetAmount += this.betItem.dog;
        lastBetAmount += this.betItem.elephant;
        lastBetAmount += this.betItem.orca;
        lastBetAmount += this.betItem.fox;
        lastBetAmount += this.betItem.snake;
        lastBetAmount += this.betItem.jaguar;
        lastBetAmount += this.betItem.lion;
        this.lastBetAmount = lastBetAmount;
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
    },
    setSpinCountDown: function (time) {
        // time in mili
        this.spinCountDown = time;
    },
    timeCountDown: function(deductAmount) {
        model.timeCount -= deductAmount;
    },
    setGameState: function(gameState) {
        let result = false;
        switch(gameState) {
            case gameSetting.gameState.BETTING:
            case gameSetting.gameState.DRAWING:
            case gameSetting.gameState.RESULTING:
                this.gameState = gameState;
                result = true;
                return result;
            default:
                return result;
        }
        
    },
    setResult: function(result) {
        this.lastResult = result;
    },
    setBigWinnerQueue: function(queue) {
        this.bigWinnerQueue = queue;
    }
}


let control = {
    initializeUser: async function() {
        control.setGameState(gameSetting.gameState.BETTING);
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
            model.user = body.user;
            model.id = body.user._id;
        }
    },
    renderBoardGame: function() {
        let html = view.createBoardGame();
        document.getElementById('main').innerHTML = html;

        // add event listener to those added element
    },
    processNextDrawTime: (utcNextDrawTime) => {
        let nextDrawTime = new Date(utcNextDrawTime).getTime();
        model.nextDrawTime = nextDrawTime;
        let now = new Date().getTime();
        let timeDif = nextDrawTime - now;
        model.timeCount = timeDif;
        return timeDif;
    },
    getTimeRemaining: function (nextDrawTime) {
        let now = new Date().getTime();
        return model.nextDrawTime - now;
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

        if (model.gameState === gameSetting.gameState.BETTING) {
            view.updateMoneyView();
        }
        
    },
    calculateBetAmount: function() {
        model.calculateBetAmount();
    },
    setMoney: function(money) {
        model.setMoney(money);
        view.updateMoneyView();
    },
    calculateResult: function(result) {
        const betItemName = result.toLowerCase();
        const itemWinTimes = gameSetting.ITEM_WIN_TIMES[result];
        const winAmount = parseInt(model.betItem[betItemName]) *  parseInt(itemWinTimes);
        model.lastWinAmount = winAmount;
        control.calculateBetAmount();
        this.calculateMoney(winAmount);
    },
    setLast8Results: function(last8Results) {
        model.setLast8Results(last8Results);
    },
    setGameState: function(gameState) {
        let result = model.setGameState(gameState);
        if (!result) {
            throw new Error('Invalid Game State');
        }
    },
    displayTime: function(newTime) {
        view.displayTime(newTime);
    },
    setResult: function(result) {
        model.setResult(result);
    },
    displayNoti: function(text) {
        model.notiText = text;
        view.displayNotiText(model.notiText);
    },
    displayResult: function(html) {
        $('#last-result-view').removeClass('hiden');
        $('#result-noti').html(html);
    },
    hideResult: function() {
        $('#last-result-view').addClass('hiden');
        $('#result-noti').html('');
    },
    displayLast8Results: function() {
        view.displayLast8Results(model.last8Results);
    },
    displayWinnerBoard: function() {
        let html = '';
        model.bigWinnerQueue.forEach(winner => {
            if (winner.name) {
                html += `<div>${winner.name}</br><img src="${gameSetting.imageSrc.GOLD_BAR}"/> ${winner.winAmount}</div>`
            }
        })
        view.displayWinnerBoard(html);
    },
    setBettingInterval: function() {
        control.displayNoti('');
        control.setGameState(gameSetting.gameState.BETTING);
        $('.bet-item').removeClass('animate__flash');
        clearInterval(spinInterval);
        itemSelectionInterval = setInterval(timeCountFunction, 1000);
    },
    setBigWinnerQueue: function(winnerQueue) {
        model.setBigWinnerQueue(winnerQueue);
    }
}

// const initializeUser = async function() {
   
// }

window.onload = async function() {
    await control.initializeUser();
    const socket = io('');
    control.renderBoardGame();
    
    
    view.updateMoneyView();

    // add event listener for bet option
    $('.bet-amount').on('click', function(e) {
        const value = $(this).text();
        model.betamount  =parseInt(value);
        $('.bet-amount').removeClass('bet-picked');
        $(this).addClass('bet-picked');
    })

    $('.bet-item').on('click', (e) => { 
        e.preventDefault();
        e.stopPropagation()
        if (model.gameState !== gameSetting.gameState.BETTING) {
            return;
        }
        const betAmount = utils.clone(model.betamount);
        const betItem = e.target.id;
        const betElementId = `#${betItem}-bet-amount`;
        // emit bet value to server        
            socket.emit('bet', {
                "_id": model.user._id,
                "bet": {
                        "item": betItem.toUpperCase(),
                        "value": betAmount
                }
            }, (error,success, body) => {
                if (error) {
                    // if you can not bet due to time is over
                    console.log(error);
                } else {
                    // update bet on model
                    const result = model.updateBetAmount(betItem, betAmount);
                    // deduct money
                    control.calculateMoney(0 - body.bet.value);
                    
                    $(betElementId).text(result);
                }
            })
    })

    socket.on('update', () => {
        socket.emit('getresult', (error, success, body) => {
            if (error) {
                console.log(error);
            } else if (success) {
                //save game result
                model.lastResult = utils.clone(body.result);
            
                // update money
                control.calculateResult(body.result);
                
                // display 8 results
                control.setLast8Results(body.last8Results);

                // handle big winner queue
                control.setBigWinnerQueue(body.bigWinnerQueue);

                //set game state
                model.setGameState(gameSetting.gameState.RESULTING);
                console.log('next draw time ' + control.processNextDrawTime(body.nextDrawTime));
            }
        })
    })

    socket.on('drawing', () => {
        control.setGameState(gameSetting.gameState.DRAWING);
    })

    socket.on('gamesetting', (body, callback) => {
        // let nextDrawTime = new Date(body.nextDrawTime).getTime();
        // let now = new Date().getTime();
        // let timeDif = nextDrawTime - now;
        // model.timeCount = timeDif;
        control.processNextDrawTime(body.nextDrawTime);

        control.setLast8Results(body.last8Results);
        control.displayLast8Results();
        callback(null, 'succesfully set up gamesetting');
    })

    // update time and part of board view every second
    var spinInterval = null;

    var timeCountFunction = function() {
        let displayTime = Math.trunc(control.getTimeRemaining() / 1000);
        if (displayTime >= 0 && displayTime <= 30) {
            control.displayTime(displayTime);
        }
        
        // animate pulse animation
        $('.item-icon').removeClass('animate__pulse');
        let $item = $(`div[data-index='${displayTime % 8}']`);
        $item.addClass('animate__pulse');

        // if displayTime  is 0 or gamestate is drawing start another interval
        if (displayTime <= 1 || model.gameState === gameSetting.gameState.DRAWING) {
            control.displayNoti('Drawing please wait ...');
            control.displayTime(0);
            let $itemIconEle = $('.item-icon').removeClass('animate__pulse');
            model.setSpinCountDown(gameSetting.spinCountDown);
            spinInterval = setInterval(spinFunction, 100);
            clearInterval(itemSelectionInterval);
        }
    };

    var itemSelectionInterval = setInterval(timeCountFunction, 1000);
    
    var startResultingTimeout = function() {
        view.updateMoneyView();
        // highlight win result
        let index = gameSetting.itemDataIndex[model.lastResult];
        
        // let $item = $(`div[data-index="${gameSetting.itemDataIndex[model.lastResult]}"]`).removeClass('dim-item');
        let $item = $(`div[data-index='${gameSetting.itemDataIndex[model.lastResult]}']`).removeClass('dim-item');
        $item.addClass('red-item');
        //display result
        control.displayResult(`<img src="${gameSetting.imageSrc[model.lastResult]}" class="result-main-image" /> <p>You win this round: <img src="${gameSetting.imageSrc.GOLD_BAR}" /> ${model.lastWinAmount}</p> <p>You bet this round: <img src="${gameSetting.imageSrc.GOLD_COIN}" /> ${model.lastBetAmount}<p/>`);
        control.displayWinnerBoard();

        setTimeout(startBettingInterval, 5000);
        control.displayLast8Results();
    }

    var startBettingInterval = function() {
        control.displayNoti('');
        control.hideResult();
        $item = $('.item-icon').removeClass('dim-item red-item');

        control.setGameState(gameSetting.gameState.BETTING);
        
        // reset bet
        control.resetBet();
        
        itemSelectionInterval = setInterval(timeCountFunction, 1000);
    }
    

    var spinFunction = function() {
        let displayTime = Math.trunc(control.getTimeRemaining() / 1000);
        let timeCount = Math.trunc(model.spinCountDown); 
       
        let index = Math.abs(timeCount % 8);

        // spin animation
        $('.item-icon').addClass('dim-item');
        $(`div[data-index='${index}']`).removeClass('dim-item');

        if (displayTime <= 35 && model.gameState === gameSetting.gameState.RESULTING) {
            $('.item-icon').addClass('dim-item');
            // startBettingInterval();
            startResultingTimeout();
            clearInterval(spinInterval);
            return;
        }
        let remainingSpinCount = model.spinCountDown - 1;
        model.setSpinCountDown(remainingSpinCount);
    }


    
    
}

