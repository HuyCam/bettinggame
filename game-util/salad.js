const FOOD_TYPE = {
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
    MAX_RANDOMIZED: 100
}


const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const saladGame = {
    nextDrawTime: 0,
    allowBet: false,
    drawIntervalTime: 0,
    restTime: 0,
    last8Results: [],
    initiateGame: function() {
        this.restTime = 5 * 1000;
        this.drawIntervalTime = 30 * 1000;
        this.nextDrawTime = new Date().getTime + this.drawIntervalTime;
        this.allowBet = true;
    },
    pickFoodType : function() {
        let randomVal = getRandomInt(gameSetting.MAX_RANDOMIZED);
        let result = '';
        if (randomVal <= 80) {
            result = FOOD_TYPE.VEGETABLE.TYPE;
            return result;
        } else {
            result = FOOD_TYPE.MEAT.TYPE;
            return result;
        }
        
    },
    pickMeatType: function() {
        let randomVal = getRandomInt(gameSetting.MAX_RANDOMIZED);
        let result = '';
    
        if (randomVal <= 75 && randomVal <= 50) {
            result = FOOD_TYPE.MEAT.HOT_DOG;
        } else if (randomVal <= 75 && randomVal > 50) {
            result = FOOD_TYPE.MEAT.MEAT_SKEWER;
        } else if (randomVal > 75 && randomVal <= 90) {
            result = FOOD_TYPE.MEAT.CHICKEN_THIGH;
        } else {
            result = FOOD_TYPE.MEAT.BEEF;
        }
    
        return result;
    },
    pickVegetableType: function() {
        let randomVal = getRandomInt(gameSetting.MAX_RANDOMIZED);
        let result = '';
    
        if (randomVal >= 0 && randomVal <= 24  ) {
            result = FOOD_TYPE.VEGETABLE.TOMATO;
        } else if (randomVal > 24 && randomVal <= 49) {
            result = FOOD_TYPE.VEGETABLE.CABBAGE;
        } else if (randomVal > 49 && randomVal <= 74) {
            result = FOOD_TYPE.VEGETABLE.CORN;
        } else {
            result = FOOD_TYPE.VEGETABLE.CARROT;
        }
    
        return result;
    },
    draw: function() {
        let foodType,food;
        // pick food type
        foodType = this.pickFoodType();
        // pick meat/vegetable type
        if (foodType === FOOD_TYPE.MEAT.TYPE) {
            food = this.pickMeatType();
        } else {
            food = this.pickVegetableType();
        }
        // return resul
        return food;
    }
    
}



exports.saladGame = saladGame;