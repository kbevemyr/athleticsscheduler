import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Stack } from 'grommet';
import { setColor, setActiveEvent } from './store/actions';

import { defaultColor, getTextColor, MinutesToPX, getEvent, getDayStarttime } from './misc';

function getBoxColor(paintSchema, newColor, eventClass) {
  var color = defaultColor;
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
    this.handleMarkEvent = this.handleMarkEvent.bind(this);
  }

  handleMarkEvent(e) {
    this.setState({marked: !this.state.marked});
    this.props.setTheActiveEvent(this.props.id);
  }

  render() {
    let color = getBoxColor(this.props.paintschema, this.props.setNewColor, getEvent(this.props.comp, this.props.id).class);
    let textColor = getTextColor(color);
    let divStyle = {height: MinutesToPX(this.state.duration),
                    top: MinutesToPX(this.state.starttime-parseInt(getDayStarttime(this.props.comp, this.state.event.day), 10)),
                    background: color,
                    color: textColor,
                  };
    let lineStyle = {stroke: "black", "strokeWidth": 4};

    return (
        <div id={this.props.id}
          style={divStyle}
          className="event-main"
          onClick={this.handleMarkEvent}
        >
          <Stack anchor="top">
            {this.state.event.class+" "+this.state.event.gren}
            {this.state.marked &&
              <svg height={20} width={500}>
                <line x1={0} y1={0} x2={600} y2={0} style={lineStyle} />
              </svg>
            }
          </Stack>
        </div>
    );
  }
}

// Store handling

const mapStateToProps = state => ({
  comp: state.competition,
  paintschema: state.painting,
});

const mapDispatchToProps = dispatch => {
  return {
    setNewColor: (c) => dispatch( setColor(c) ),
    setTheActiveEvent: (id) => dispatch( setActiveEvent(id) ),
  }
}



const EventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);

export default withRouter(EventContainer);

//export default Event;
