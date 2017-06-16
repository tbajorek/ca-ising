import React from 'react';
import InputArea from './inputarea';
import ButtonArea from './buttonarea';
import Simulate from './simulate';
import About from './about';

/**
 * Component groups all subpanels of the application
 */
class Panel extends React.Component {
    render() {
        return(
            <div className="panel">
                <InputArea />
                <ButtonArea />
                <hr />
                <Simulate />
                <hr />
                <About />
            </div>
        );
    }
}

export default Panel;