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

let view = {
    
}

let model = {
    gameState: '',
    betItem: {
        bull: 0,
        dog: 0,
        elephant: 0,
        orca: 0,
        fox: 0,
        snake: 0,
        lion: 0,
        t_rex: 0
    }
}

let control = {

}