import React, { PropTypes } from 'react'
import d3 from 'd3';
import './Map.css';
import { fetchUnits, fetchViewState } from './MapActions.js';
import Unit from '../unit/Unit.js';
import Region from '../region/Region.js';
import Constants from '../Constants.js';

class BaseMap extends React.Component {

    static propTypes: {
        regions: PropTypes.array,
        units: PropTypes.array,
        onRegionClick: PropTypes.func.isRequired,
        onMapDrag: PropTypes.func.isRequired,
        onMapDragStart: PropTypes.func.isRequired,
        onMapDragEnd: PropTypes.func.isRequired,
        onMapZoom: PropTypes.func.isRequired,
        onUnitClick: PropTypes.func.isRequired,
        onUnitStackClick: PropTypes.func.isRequired,
        onUnitDragStart: PropTypes.func.isRequired,
        onUnitDragEnd: PropTypes.func.isRequired,
        onUnitMove: PropTypes.func.isRequired,
        viewState: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.props.store.dispatch(fetchViewState({ zoomLevel: 3, pan: {x: -145, y:-126}}));
    }

    componentDidUpdate(){
        if(this.props.regions && !this.props.units){
            let centroidMap = new Map();
            d3.select('svg').selectAll('path')[0].forEach((path) => {
                centroidMap.set(path.attributes.id.nodeValue, path.getBBox());
            });
            this.props.store.dispatch(fetchUnits(Constants.Units.DefaultPositions, centroidMap));
        }
    }

    _getViewTransformString = (viewState) => {
        return viewState ? 'scale('+viewState.zoomLevel+')translate('+viewState.pan.x + ',' + viewState.pan.y + ')' : null;
    };

    render() {
        if (this.props.regions) {
            return (
                <div className='turnbase-map-outer'>
                    <svg onMouseDown={this.props.onMapDragStart} onMouseMove={this.props.viewState.mapDragStart ? this.props.onMapDrag : null} onMouseUp={this.props.onMapDragEnd} onWheel={this.props.onMapZoom} >
                        <g transform={this._getViewTransformString(this.props.viewState)}>
                            {Region.getRegionPaths(this.props.regions, this.props.onRegionClick)}
                            {this.props.units ? Unit.getUnitPaths(this.props.regions, this.props.units, this.props.onUnitClick,
                                this.props.onUnitStackClick, this.props.centroidMap, this.props.onUnitDragStart, this.props.onUnitDragEnd, this.props.onUnitMove) : null}
                        </g>
                    </svg>
                </div>);
        }
        else {
            return (<div>No Map</div>);
        }
    }

}

export default BaseMap;