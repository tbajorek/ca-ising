import React from 'react';
const ReactHighcharts = require('react-highcharts');

/**
 * Component of chart of magnetism according to temperature
 */
class TempChart extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        let chart = this.refs.tempchart.getChart();
        let temperature = nextProps.model.tempCollection;

        if (temperature.getLength() == 0) {
            chart.series[0].setData([]);
            chart.redraw();
        }

        if (temperature.isFresh()) {
            var point = temperature.getLastValue();
            chart.series[0].addPoint({x: point.temp, y: point.val});
            return temperature.getLength() == 0;
        } else {
            return false;
        }
    }
    render() {
        return(
            <div className="time-chart">
                <ReactHighcharts config={this.props.config} ref="tempchart" />
            </div>
        );
    }
}

export default TempChart;