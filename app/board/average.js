/**
 * Model of collection of average values
 */
class Average {
    constructor(size, range) {
        if (size == undefined) {
            size = 10;
        }
        if (range == undefined) {
            range = 0.001;
        }
        this.size = size;
        this.range = range;
        this.values = [];
    }

    reset() {
        this.values = [];
    }

    setSize(size) {
        if (size < 0) {
            size = 1;
        }
        this.size = size;
    }

    addNewValue(value) {
        if (this.values.length >= this.size) {
            this.values.shift();
        }
        this.values[this.values.length] = value;
    }

    getAvg() {
        return (this.values.length > 0)?this.values.reduce(function(a, b) { return a + b; }, 0)/this.values.length:0;
    }

    isInAvg(value) {
        return Math.abs(value-this.getAvg()) <= this.range && this.values.length >= this.size;
    }
}

export default Average;