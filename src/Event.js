import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { setColor } from './store/actions';

import { MinutesToPX, getEvent, getArenaSize, getDayStarttime } from './misc';

function getBoxColor(paintSchema, newColor, eventClass) {
  var color = 'lightgray';
  var paint = paintSchema.find(x => (x.id === eventClass));
  if(paint == null) {
    newColor(eventClass);
  } else {
    color = paint.color;
  }
  return color;
}

// time unit is minutes
class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: getEvent(this.props.comp, this.props.id),
      starttime: parseInt(getEvent(this.props.comp, this.props.id).starttime, 10),
      duration: parseInt(getEvent(this.props.comp, this.props.id).duration, 10),
      marked: false,
    };
  }

  render() {
    let color = getBoxColor(this.props.paintschema, this.props.setNewColor, getEvent(this.props.comp, this.props.id).class);
    let divStyle = {height: MinutesToPX(this.state.duration),
                    top: MinutesToPX(this.state.starttime-parseInt(getDayStarttime(this.props.comp, this.state.event.day), 10)),
                    background: color,
                  };
    let lineStyle = {stroke:"rgb(255,0,0)"};

    return (
      <div id={this.props.id}
        style={divStyle}
        className="event-main"
        onClick={() => this.setState({marked: !this.state.marked})}
      >
      {this.state.marked &&
      <svg height={210} width={500}>
        <line x1={0} y1={0} x2={200} y2={0} style={lineStyle} />
      </svg>
      }
        {this.state.event.class+" "+this.state.event.gren}
      </div>
    );
  }
}

// Store handling

const mapStateToProps = state => ({
  comp: state.competition,
  paintschema: state.painting,
});

const mapDispatchToProps = dispatch => ({
    setNewColor: (c) => {
      dispatch(setColor(c));
  },
});

const EventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);

export default withRouter(EventContainer);

//export default Event;
