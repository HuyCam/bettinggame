const rankingManager = {
    bigWinnerQueue: [],
    addBigWinner: function(winnerInfo) {
        /*
        {
            name: '1234',
            winAmount: 123
        }
        */
        let tempWinnerHolder = winnerInfo;
        let tempWinnerHolder2 = null;
        let newBigWinnerQueue = this.bigWinnerQueue.map(winner => {
            if (tempWinnerHolder.winAmount > winner.winAmount) {
                tempWinnerHolder2 = tempWinnerHolder;
                tempWinnerHolder = winner;
                return tempWinnerHolder2;
            } else {
                return winner;
            }
        });

        this.bigWinnerQueue = newBigWinnerQueue;
    },
    resetWinnerQueue: function() {
        this.bigWinnerQueue = [{
            name: null,
            winAmount: 0
        }, {
            name: null,
            winAmount: 0
        }, {
            name: null,
            winAmount: 0
        }];
    }
}

exports.rankingManager = rankingManager;