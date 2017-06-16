import React from 'react';
import Reflux from 'reflux';
import Model from './board/model';

/**
 * List of available actions
 */
var Actions = Reflux.createActions([
    'startStop',
    'next',
    'reset',
    'changeWidth',
    'changeHeight',
    'changeIntegral',
    'changeTemperature',
    'changeExternalField',
    'changeTempStep',
    'simulate',
    'downloadTemp'
]);

/**
 * Store with data used in the application
 */
class Store extends Reflux.Store {
    constructor() {
        super();
        this.state = {
            time: 0,
            started: false,
            interval: null,
            width: 100,
            height: 100,
            integral: 1,
            temperature: 0,
            extField: 0,
            tempStep: 0.1
        };
        this.state.model = new Model(this.state.width, this.state.height, this.state.integral, this.state.temperature, this.state.extField);

        this.state.timeChartConfig = {
            xAxis: {
                categories: [],
                title: {
                    text: "Czas"
                }
            },
            series: [{
                data: [],
                showInLegend: false,
                name: 'Namagnesowanie',
                marker: {
                    enabled: false
                }
            }],
            yAxis: {
                min: -1,
                max: 1,
                title:{
                    text:'Namagnesowanie',
                    rotation: -90
                }
            },
            chart: {
                width: '590',
                height: '170',
                animation: false
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            }
        };

        this.state.tempChartConfig = {
            xAxis: {
                categories: [],
                title: {
                    text: "Temperatura"
                }
            },
            series: [{
                data: [],
                showInLegend: false,
                name: 'Namagnesowanie',
                marker: {
                    enabled: false
                }
            }],
            yAxis: {
                min: -1,
                max: 1,
                title:{
                    text:'Namagnesowanie',
                    rotation: -90
                }
            },
            chart: {
                width: '390',
                height: '170',
                animation: false
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            }
        };

        this.listenables = Actions;
    }

    onStartStop() {
        if (this.state.started == false) {
            let store = this;
            let newInterval = setInterval(function(){
                store.onNext();
            }, 80);
            this.setState({started: true, interval: newInterval});
        } else {
            clearInterval(this.state.interval);
            this.setState({started: false, interval: null});
        }
    }

    onNext() {
        this.state.model.nextStep();
        let newModel = this.state.model;
        let newChartConfig = this.state.chartConfig;
        let newTime = ++this.state.time;
        this.setState({model:newModel, time:newTime, chartConfig: newChartConfig});
    }

    onReset() {
        this.state.model.generateBoard(
            this.state.width,
            this.state.height,
            this.state.integral,
            this.state.temperature,
            this.state.extField
        );
        this.state.model.tempCollection.reset();
        let newModel = this.state.model;
        let newTimeChartConfig = this.state.timeChartConfig;
        let newTempChartConfig = this.state.tempChartConfig;
        this.setState({model:newModel, time:0, timeChartConfig: newTimeChartConfig, tempChartConfig: newTempChartConfig});
    }

    onChangeWidth(event) {
        this.setState({"width":parseInt(event.target.value)});
        this.state.model.initializeStates();
    }

    onChangeHeight(event) {
        this.setState({"height":parseInt(event.target.value)});
        this.state.model.initializeStates();
    }

    onChangeIntegral(event) {
        this.setState({"integral":parseFloat(event.value)});
        this.state.model.initializeStates(this.state.integral, this.state.temperature, this.state.extField);
    }

    onChangeTemperature(event) {
        this.setState({"temperature":parseFloat(event.target.value)});
        this.state.model.initializeStates(this.state.integral, this.state.temperature, this.state.extField);
        this.state.model.tempCollection.update();
    }

    onChangeExternalField(event) {
        this.setState({"extField":parseFloat(event.target.value)});
        this.state.model.initializeStates(this.state.integral, this.state.temperature, this.state.extField);
    }

    onChangeTempStep(event) {
        this.setState({"tempStep":parseFloat(event.target.value)});
    }

    onSimulate(event) {
        var obj = this;
        if (!obj.state.started) {
            obj.onReset();
            obj.onChangeTemperature({target: {value: 0}});
            obj.state.model.tempCollection.setOnUpdate(function (d) {
                var newValue = Math.round((obj.state.temperature + obj.state.tempStep)*100)/100;
                obj.onChangeTemperature({target: {value: newValue}});
            });
        }
        obj.onStartStop();
    }

    onDownloadTemp(event) {
        this.state.model.tempCollection.saveAsCSV();
    }
}

export {Store, Actions};