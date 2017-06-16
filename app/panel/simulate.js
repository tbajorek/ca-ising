import React from 'react';
import Reflux from 'reflux';
import {Store, Actions} from './../store';

/**
 * PPart of panel which is responsible for simulating temperature
 */
class Simulate extends Reflux.Component {
    constructor() {
        super();
        this.state = {};
        this.store = Store;
    }
    render() {
        return(
            <div className="simlulate-panel">
                <h4>Symulacja temperatury</h4>
                <div className="param-block">
                    <span className="param">Krok temperatury:&nbsp;</span>
                    <input type="number" step="0.01" max="1" min="0.01" className="param" value={this.state.tempStep} onChange={Actions.changeTempStep} disabled={this.state.started ? "true" : ""} />
                </div>
                <button onClick={Actions.simulate} disabled={this.state.started ? "true" : ""}>
                    <i className="fa fa-magic" aria-hidden="true"></i>&nbsp;
                    Symuluj
                </button>
                <button onClick={Actions.downloadTemp}>
                    <i className="fa fa-thermometer-full" aria-hidden="true"></i>&nbsp;
                    Pobierz wyniki
                </button>
            </div>
        );
    }
}

export default Simulate;