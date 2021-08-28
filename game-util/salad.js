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
    MAX_ITEM_BET: 6
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const saladGame = {
    nextDrawTime: 0,
    allowBet: false,
    drawTimer: 30000,
    restTimer: 10000,
    last8Results: new Array(),
    lastResult:"",
    roundCount: 0,
    roundCap: 5,
    getResultType: 1,
    initiateGame: function() {
        this.nextDrawTime = this.getNextDrawTime() + this.restTimer;
        this.allowBet = true;
    },
    getResultTypeZero() {
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
            result = BET_ITEM_TYPE.HIGH_YIELD_ITEM.JAGUAR;
        } else {
            result = BET_ITEM_TYPE.HIGH_YIELD_ITEM.LION;
        }

        return result;
    },
    getResultTypeOne() {
        // high yield lower bandwith have almost as many as low yield
        let randomVal = getRandomInt(gameSetting.MAX_RANDOMIZED);
        let result = '';

        if (randomVal <= 149) {
            result = BET_ITEM_TYPE.LOW_YIELD_ITEM.BULL;
        } else if (randomVal > 149 && randomVal <= 299) {
            result = BET_ITEM_TYPE.LOW_YIELD_ITEM.DOG;
        } else if (randomVal > 299 && randomVal <= 449) {
            result = BET_ITEM_TYPE.LOW_YIELD_ITEM.ELEPHANT;
        } else if (randomVal > 449 && randomVal <= 599) {
            result = BET_ITEM_TYPE.LOW_YIELD_ITEM.ORCA;
        } else if (randomVal > 599 && randomVal <= 749) {
            result  = BET_ITEM_TYPE.HIGH_YIELD_ITEM.FOX;
        } else if (randomVal > 749 && randomVal <= 899) {
            result = BET_ITEM_TYPE.HIGH_YIELD_ITEM.SNAKE;
        } else if (randomVal > 899 && randomVal <= 970) {
            result = BET_ITEM_TYPE.HIGH_YIELD_ITEM.JAGUAR;
        } else {
            result = BET_ITEM_TYPE.HIGH_YIELD_ITEM.LION;
        }

        return result;
    },
    getResultTypeTwo() {
        // high yield lower bandwith have almost as many as low yield
        let randomVal = getRandomInt(gameSetting.MAX_RANDOMIZED);
        let result = '';

        if (randomVal <= 50) {
            result = BET_ITEM_TYPE.LOW_YIELD_ITEM.BULL;
        } else if (randomVal > 50 && randomVal <= 100) {
            result = BET_ITEM_TYPE.LOW_YIELD_ITEM.DOG;
        } else if (randomVal > 100 && randomVal <= 150) {
            result = BET_ITEM_TYPE.LOW_YIELD_ITEM.ELEPHANT;
        } else if (randomVal > 150 && randomVal <= 200) {
            result = BET_ITEM_TYPE.LOW_YIELD_ITEM.ORCA;
        } else if (randomVal > 200 && randomVal <= 400) {
            result  = BET_ITEM_TYPE.HIGH_YIELD_ITEM.FOX;
        } else if (randomVal > 400 && randomVal <= 600) {
            result = BET_ITEM_TYPE.HIGH_YIELD_ITEM.SNAKE;
        } else if (randomVal > 600 && randomVal <= 800) {
            result = BET_ITEM_TYPE.HIGH_YIELD_ITEM.JAGUAR;
        } else {
            result = BET_ITEM_TYPE.HIGH_YIELD_ITEM.LION;
        }

        return result;
    },
    getNextDrawTime() {
        return new Date().getTime() + this.drawTimer;
    },
    pickResultType: function() {
        let random = getRandomInt(gameSetting.MAX_RANDOMIZED);
        if (random <= 400) {
            this.getResultType = 0;
        } else if (random > 400 && random <= 930) {
            this.getResultType = 1;
        } else {
            this.getResultType = 2;
        }
    },
    pickItemType : function() {
        let result = '';

        if (this.roundCount > this.roundCap) {

            // if rouncCount over rouncCap switch resultType
            this.pickResultType();

            if (this.getResultType === 0 || this.getResultType === 1) {
                let roundCap = getRandomInt(20) + 10; 
                this.roundCap = roundCap;
                // resset roundCount
                this.roundCount  = 0;
            } else {
                let roundCap = getRandomInt(5) + 2;
                this.roundCap = roundCap;
                this.roundCount = 0;
            }
        }
       
        // get result base on resultType
        if (this.getResultType === 0) {
            result = this.getResultTypeZero();
        } else if (this.getResultType === 1) {
            result = this.getResultTypeOne();
        } else {
            result = this.getResultTypeTwo();
        }

        // increment roundCount
        this.roundCount = this.roundCount + 1;

        
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