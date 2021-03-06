import React from 'react';
import MapStateContainer from './map/MapStateContainer.js';
import { fetchMap } from './map/MapActions.js';
import './App.css';

class App extends React.Component {
    constructor(props){
        super(props);
    };

    componentDidMount(){
        this.props.store.dispatch(fetchMap('./res/map/baseMap1940Sea.svg'));
    }

    render(){
        return (
            <div className='turnbase-app'>
                <MapStateContainer store={this.props.store} />
            </div>
        );
    }
};

export default App