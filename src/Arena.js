import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { getEventsID, getArena, overlapCheckSchema2 } from './misc';

import Event from './Event';

class Arena extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: 'navojowhite',
    }
  }

  render() {
    let name = getArena(this.props.comp, this.props.id).name;
    let es = getEventsID(this.props.comp, this.props.id, this.props.day);

    console.log("calling overlapCheckSchema2("+this.props.id+", "+this.props.day+")");
    var eventOverlaps = overlapCheckSchema2(this.props.comp.events, this.props.id, this.props.day);
    console.log(eventOverlaps);

    //console.log("EVENTDATA "+this.eventstest[0].duration);
    //var divStyle = {height: getArenaSize()};
    //var es = getEventsID(comptest, this.props.id);
    var divStyle = {height: this.props.height, background: this.state.background};

    return (
      <div className="arena-main">
        <div className="arena-header">{name}</div>
        <div className="arena-eventarea" style={divStyle}>
        {es.map(x =>
           (
            <Event
              key={x}
              id={x}
              overlap={eventOverlaps[x]}
              onMarked={this.props.onMarkedEvent}
            />
           ))
        }
        </div>
      </div>
    );
  }
}

// Store handling

const mapStateToProps = state => ({
  comp: state.competition,
});

const mapDispatchToProps = dispatch => ({
    getXxx: (cid) => {
      console.log("implement dispatch(getXxx(cid)");
  },
});

const ArenaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Arena);

export default withRouter(ArenaContainer);

//export default Arena;
