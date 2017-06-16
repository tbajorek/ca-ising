import History from '../history';
import Temperature from './temperature';

/**
 * Model of board with spins and data of simulation
 */
class Model {
    constructor(width, height, integral, temperature, extField) {
        if (width == undefined &&
            height == undefined &&
            integral == undefined &&
            temperature == undefined &&
            extField == undefined
        ) return;
        this.states = [0,0,0,0,0];
        this.generateBoard(width, height, integral, temperature, extField);
        this.shifts = [
            [0,-1],
            [0,1],
            [1,0],
            [-1,0]
        ];
        this.up = 1;
        this.down = -1;
        this.tempCollection = new Temperature();
        this.tempCollection.update();
    }

    generateBoard(width, height, integral, temperature, extField) {
        var initialValue = 1;
        this.width = width;
        this.height = height;
        this.size = this.height*this.width;
        this.timeHistory = new History(100, this.size, 9);
        this.initializeStates(integral, temperature, extField);
        var board = new Array(height);
        for (var r=0;r<height;++r) {
            board[r] = new Array(width);
            for (var c=0;c<width;++c) {
                board[r][c] = initialValue;
            }
        }
        this.board = board;
        this.timeHistory.addNormalized(this.getTotalMagnetism());
    }

    getTotalMagnetism() {
        return this.board.reduce(
            function(sum, current){
                return sum + current.reduce(
                    function(sum, current) {
                        return sum + current;
                    }, 0
                );
            }, 0
        );
    }

    initializeStates(integral, temperature, extField) {
        this.integral = integral;
        this.temperature = temperature;
        this.extField = extField;
        for(var i in this.states) {
            this.states[i] = this.getThermalBath(2*i-4);
        }
    }

    getThermalBath(E) {
        var beta = 1.0/this.temperature;
        return 1.0/(1+Math.pow(Math.E, -2.0*beta*(this.integral*E+this.extField)));
    }

    getNormalizedValue(v, reference) {
        return parseInt((v+reference)%reference);
    }

    getNormalizedPoint(r,c) {
        let x = this.getNormalizedValue(c, this.width);
        let y = this.getNormalizedValue(r, this.height);
        return {"c":x,"r":y};
    }

    getValue(r, c) {
        let point = this.getNormalizedPoint(r, c);
        return this.board[point.r][point.c];
    }

    getState(r, c) {
        let counter = 0;
        for(var i in this.shifts) {
            if(this.getValue(r+this.shifts[i][0], c+this.shifts[i][1]) > 0) {
                ++counter;
            }
        }
        return counter;
    }

    getRandom(min, max) {
        var min = Math.ceil(min);
        var max = Math.floor(max);
        //return Math.floor(Math.random() * (max - min + 1)) + min;
        return 1-Math.random();
    }

    nextStep() {
        var newBoard = this.board;
        for(var r in this.board) {
            r = parseInt(r);
            for (var c in this.board[r]) {
                c = parseInt(c);
                var ri = this.states[this.getState(r, c)];
                var R = this.getRandom(0,1);
                newBoard[r][c] = (R <= ri)?this.up:this.down;
            }
        }
        this.board = newBoard;
        this.timeHistory.addNormalized(this.getTotalMagnetism());
        this.tempCollection.addValue(this.temperature, this.timeHistory.getValue());
    }
}

export default Model;