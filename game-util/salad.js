const BET_ITEM_TYPE = {
    MEAT: {
        TYPE: 'MEAT',
        HOT_DOG: 'HOT_DOG',
        MEAT_SKEWER: 'MEAT_SKEWER',
        CHICKEN_THIGH: 'CHICKEN_THIGH',
        BEEF: 'BEEF'
    },
    VEGETABLE: {
        TYPE: 'VEGETABLE',
        TOMATO: 'TOMATO',
        CABBAGE: 'CABBAGE',
        CORN: 'CORN',
        CARROT: 'CARROT'
    }
};

const gameSetting = {
    MAX_RANDOMIZED: 1000,
    FOOD_WIN_TIMES: {
        HOT_DOG: 10,
        MEAT_SKEWER: 15,
        CHICKEN_THIGH: 25,
        BEEF: 45,
        TOMATO: 5,
        CABBAGE: 5,
        CORN: 5,
        CARROT: 5
    },
    MAX_FOOD_BET: 2
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
    pickFoodType : function() {
        let randomVal = getRandomInt(gameSetting.MAX_RANDOMIZED);
        let result = '';

        if (randomVal <= 175) {
            result = BET_ITEM_TYPE.VEGETABLE.TOMATO;
        } else if (randomVal > 175 && randomVal <= 350) {
            result = BET_ITEM_TYPE.VEGETABLE.CABBAGE;
        } else if (randomVal > 350 && randomVal <= 525) {
            result = BET_ITEM_TYPE.VEGETABLE.CORN;
        } else if (randomVal > 525 && randomVal <= 700) {
            result = BET_ITEM_TYPE.VEGETABLE.CARROT;
        } else if (randomVal > 700 && randomVal <= 790) {
            result  = BET_ITEM_TYPE.MEAT.HOT_DOG;
        } else if (randomVal > 790 && randomVal <= 860) {
            result = BET_ITEM_TYPE.MEAT.MEAT_SKEWER;
        } else if (randomVal > 860 && randomVal <= 930) {
            result = BET_ITEM_TYPE.MEAT.CHICKEN_THIGH;
        } else {
            result = BET_ITEM_TYPE.MEAT.BEEF;
        }

        return result;
    },
    draw: function() {
        console.log('Stop betting, waiting for');
        const that = this;
        this.allowBet = false;
        let foodType,food;
        // pick food type
        food = this.pickFoodType();

        setTimeout(function() {
            console.log('You can start betting');
            that.allowBet = true;
        }, that.restTimer);

        // save result
        this.lastResult = food;
        if (this.last8Results.length === 8) {
            this.last8Results.pop();
            this.last8Results.unshift(food);
        } else if (this.last8Results.length < 8) {
            this.last8Results.unshift(food);
        }
        // return result
        return food;
    }
}



exports.saladGame = saladGame;
exports.FOOD_TYPE = BET_ITEM_TYPE;
exports.gameSetting = gameSetting;