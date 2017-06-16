/**
 * Model of magnetism's timeHistory
 */

class History {
    constructor(limit, maxValue, precision) {
        if (limit == undefined) {
            limit = 100;
        }
        if (maxValue == undefined) {
            maxValue = 1;
        }
        if (precision == undefined) {
            precision = 2;
        }
        this.limit = limit;
        this.time = -1;
        this.maxValue = maxValue;
        this.lastValue = null;
        this.precision = precision;
    }

    add(value) {
        this.lastValue = this.getWithPrecision(value, this.precision);
        ++this.time;
    }

    addNormalized(value) {
        this.lastValue = this.getWithPrecision(value/this.maxValue, this.precision);
        ++this.time;
    }

    getWithPrecision(value, precision) {
        return Number(value).toFixed(precision);
    }

    getValue() {
        return parseFloat(this.getWithPrecision(this.lastValue, this.precision));
    }

    isFull() {
        return this.time >= this.limit;
    }
}

export default History;