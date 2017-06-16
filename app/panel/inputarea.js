import React from 'react';
import Size from './input/size';
import Parameters from './input/parameters';
import Information from './input/information';

/**
 * Component groups input fields with parameters of the simulation
 */
class InputArea extends React.Component {
    render() {
        return(
            <div className="control-area control-input-area">
                <Size />
                <Parameters />
                <hr />
                <Information />
            </div>
        );
    }
}

export default InputArea;