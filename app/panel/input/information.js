import React from 'react';
import Reflux from 'reflux';
import {Store, Actions} from '../../store'

/**
 * Component with information about amount of cells and a time of simulation
 */
class Information extends Reflux.Component {
    constructor() {
        super();
        this.state = {};
        this.store = Store;
    }

    render() {
        return(
            <div className="info-block">
                <span className="param">Namagnesowanie:&nbsp;{this.state.model.timeHistory.getValue()}</span>
                <span className="param">Czas:&nbsp;{this.state.model.timeHistory.time}</span>
            </div>
        );
    }
}

export default Information;