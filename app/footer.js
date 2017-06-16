import React from 'react';
import Reflux from 'reflux';
import {Store, Actions} from './store';
import TimeChart from './timechart';
import TempChart from './tempchart';

/**
 * Component with a footer of the application
 */
class Footer extends Reflux.Component {
    constructor() {
        super();
        this.state = {};
        this.store = Store;
    }
    render() {
        return(
            <div className="row footer">
                <div className="chart time-chart">
                    <TimeChart model={this.state.model} config={this.state.timeChartConfig} />
                </div>
                <div className="chart temp-chart">
                    <TempChart model={this.state.model} config={this.state.tempChartConfig} />
                </div>
            </div>
        );
    }
}

export default Footer;