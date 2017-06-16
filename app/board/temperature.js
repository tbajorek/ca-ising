import Average from './average'

/**
 * History of temperature according to magnetism
 */
class Temperature {
    constructor() {
        this.data = [];
        this.updated = false;
        this.fresh = false;
        this.onUpdate = function(d){};
        this.avg = new Average(35, 0.0001);
    }
    reset() {
        this.data = [];
        this.avg.reset();
    }
    addValue(temp, value) {
        if(this.updated && this.avg.isInAvg(temp)) {
            this.data[this.data.length] = {"temp":temp, "val":value};
            this.updated = false;
            this.fresh = true;
            this.onUpdate(this.data);
        }
        this.avg.addNewValue(temp);
    }
    setOnUpdate(f) {
        this.onUpdate = f;
    }
    update() {
        this.updated = true;
    }
    isUpdated() {
        return this.updated;
    }
    isFresh() {
        if(this.fresh) {
            this.fresh = false;
            return true;
        } else {
            return false;
        }
    }
    getAvgValue() {
        return this.avg.getAvg();
    }
    getLength() {
        return this.data.length;
    }
    getLastValue() {
        return this.data[this.data.length-1];
    }
    saveAsCSV() {
        var arrData = typeof this.data != 'object' ? JSON.parse(this.data) : this.data;
        var CSV = '';
        var row = "";
        //header line
        for (var index in arrData[0]) {
            row += index + ',';
        }
        row = row.slice(0, -1);
        CSV += row + '\r\n';

        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }
            row.slice(0, row.length - 1);
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }

        //Generate a CSV file
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        link.download = "temperature.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

export default Temperature;