import React from 'react';
const ReactHighcharts = require('react-highcharts');

/**
 * Component of chart of magnetism according to time
 */
class TimeChart extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        let chart = this.refs.timechart.getChart();
        let history = nextProps.model.timeHistory;
        if (history.time == 0) {
            chart.series[0].setData([]);
            chart.redraw();
        }
        if (history.isFull()) {
            chart.series[0].data[0].remove();
        }
        chart.series[0].addPoint({x: history.time, y: history.getValue()});
        return history.time == 0;
    }
    render() {
        return(
            <div className="time-chart">
                <ReactHighcharts config={this.props.config} ref="timechart" />
            </div>
        );
    }
}

export default TimeChart;