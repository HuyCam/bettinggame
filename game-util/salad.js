const BET_ITEM_TYPE = {
    HIGH_YIELD_ITEM: {
        TYPE: 'CARNIVORES',
        FOX: 'FOX',
        PYTHON: 'PYTHON',
        LION: 'LION',
        T_REX: 'T_REX'
    },
    LOW_YIELD_ITEM: {
        TYPE: 'HERBIVORES',
        HORSE: 'HORSE',
        PANDA: 'PANDA',
        ELEPHANT: 'ELEPHANT',
        COW: 'COW'
    }
};

const gameSetting = {
    MAX_RANDOMIZED: 1000,
    ITEM_WIN_TIMES: {
        FOX: 10,
        PYTHON: 15,
        LION: 25,
        T_REX: 45,
        HORSE: 5,
        PANDA: 5,
        ELEPHANT: 5,
        COW: 5
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
        this.nextDrawTime = new Date().getTime + this.drawIntervalTime;
        this.allowBet = true;
    },
    pickItemType : function() {
        let randomVal = getRandomInt(gameSetting.MAX_RANDOMIZED);
        let result = '';

        if (randomVal <= 175) {
            result = BET_ITEM_TYPE.LOW_YIELD_ITEM.HORSE;
        } else if (randomVal > 175 && randomVal <= 350) {
            result = BET_ITEM_TYPE.LOW_YIELD_ITEM.PANDA;
        } else if (randomVal > 350 && randomVal <= 525) {
            result = BET_ITEM_TYPE.LOW_YIELD_ITEM.ELEPHANT;
        } else if (randomVal > 525 && randomVal <= 700) {
            result = BET_ITEM_TYPE.LOW_YIELD_ITEM.COW;
        } else if (randomVal > 700 && randomVal <= 790) {
            result  = BET_ITEM_TYPE.HIGH_YIELD_ITEM.FOX;
        } else if (randomVal > 790 && randomVal <= 860) {
            result = BET_ITEM_TYPE.HIGH_YIELD_ITEM.PYTHON;
        } else if (randomVal > 860 && randomVal <= 930) {
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