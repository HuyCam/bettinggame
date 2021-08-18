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
    MAX_ITEM_BET: 6
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const saladGame = {
    nextDrawTime: 0,
    allowBet: false,
    drawTimer: 0,
    restTimer: 0,
    last8Results: new Array(),
    lastResult:"",
    initiateGame: function() {
        this.restTimer = 5 * 1000;
        this.drawTimer = 30 * 1000;
        this.nextDrawTime = this.getNextDrawTime();
        this.allowBet = true;
    },
    getNextDrawTime() {
        return new Date().getTime() + this.drawTimer;
    },
    pickItemType : function() {
        let randomVal = getRandomInt(gameSetting.MAX_RANDOMIZED);
        let result = '';

        if (randomVal <= 199) {
            result = BET_ITEM_TYPE.LOW_YIELD_ITEM.BULL;
        } else if (randomVal > 199 && randomVal <= 399) {
            result = BET_ITEM_TYPE.LOW_YIELD_ITEM.DOG;
        } else if (randomVal > 399 && randomVal <= 599) {
            result = BET_ITEM_TYPE.LOW_YIELD_ITEM.ELEPHANT;
        } else if (randomVal > 599 && randomVal <= 799) {
            result = BET_ITEM_TYPE.LOW_YIELD_ITEM.ORCA;
        } else if (randomVal > 799 && randomVal <= 880) {
            result  = BET_ITEM_TYPE.HIGH_YIELD_ITEM.FOX;
        } else if (randomVal > 880 && randomVal <= 930) {
            result = BET_ITEM_TYPE.HIGH_YIELD_ITEM.SNAKE;
        } else if (randomVal > 930 && randomVal <= 970) {
            result = BET_ITEM_TYPE.HIGH_YIELD_ITEM.LION;
        } else {
            result = BET_ITEM_TYPE.HIGH_YIELD_ITEM.T_REX;
        }

        return result;
    },
    draw: function() {
        console.log('Stop betting, waiting for');
        const that = this;
        this.allowBet = false;
        let item;
        // pick food type
        item = this.pickItemType();

        setTimeout(function() {
            console.log('You can start betting');
            that.allowBet = true;
            
        }, that.restTimer);

        // save result
        this.saveResult(item);
        // set nextDrawTime
        this.nextDrawTime = this.getNextDrawTime() + that.restTimer;
        // return result
        return item;
    },
    saveResult: function(item) {
        this.lastResult = item;
        if (this.last8Results.length === 8) {
            this.last8Results.pop();
            this.last8Results.unshift(item);
        } else if (this.last8Results.length < 8) {
            this.last8Results.unshift(item);
        }
    }
}



exports.saladGame = saladGame;
exports.BET_ITEM_TYPE = BET_ITEM_TYPE;
exports.gameSetting = gameSetting;