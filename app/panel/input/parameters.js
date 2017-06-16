import React from 'react';
import Reflux from 'reflux';
import {Store, Actions} from '../../store';
import Select from 'react-select';
import '!style-loader!css-loader!react-select/dist/react-select.css';

/**
 * Component with density field in the panel
 */
class Parameters extends Reflux.Component {
    constructor() {
        super();
        this.state = {};
        this.store = Store;
        this.options = [
            { value: 1, label: 'dodatnia' },
            { value: -1, label: 'ujemna' }
        ];
    }

    render() {
        return(
            <div>
                <div className="param-block">
                    <span className="param">Całka wymiany:&nbsp;</span>
                    <Select
                        name="form-field-name"
                        value={this.state.integral}
                        disabled={this.state.started}
                        options={this.options}
                        onChange={Actions.changeIntegral}
                        />
                </div>
                <div className="param-block">
                    <span className="param">Temperatura:&nbsp;</span>
                    <input type="number" step="0.01" max="50" min="-50" className="param" value={this.state.temperature} onChange={Actions.changeTemperature} disabled={this.state.started ? "true" : ""} />
                </div>
                <div className="param-block">
                    <span className="param">Pole zewnętrzne:&nbsp;</span>
                    <input type="number" step="0.01" max="10" min="-10" className="param" value={this.state.extField} onChange={Actions.changeExternalField} disabled={this.state.started ? "true" : ""} />
                </div>
            </div>
        );
    }
}

export default Parameters;
