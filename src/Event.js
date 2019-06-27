import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Stack } from 'grommet';
import { Accessibility as HLIcon } from 'grommet-icons';

import { setColor, setActiveEvent, setActiveClass } from './store/actions';
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

function isActive(as, x) {
  var res = as[x];
  if (res == null) {
    res = false;
  }
  //if (res) all is false -> no activeID then all schould be active ...

  //console.log("isActive "+res);
  return res;
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
    this.handleUnMarkEvent = this.handleUnMarkEvent.bind(this);
    this.handleHighLightEvent = this.handleHighLightEvent.bind(this);
  }

  handleMarkEvent(e, y) {
    if (e.shiftKey) {
      this.handleHighLightEvent(e);
    } else {
      this.setState({marked: true});
      console.log("handleMarkEvent "+y);
      this.props.onMarked(y, this.handleUnMarkEvent);
    }
  }

  handleUnMarkEvent(e) {
    if (e.shiftKey) {
      this.handleHighLightEvent(e);
    } else {
      this.setState({marked: false});
      console.log("handleUnMarkEvent ");
    }
  }

  handleHighLightEvent(e) {
    console.log("handelHighLightEvent");
    this.props.setTheActiveClass(this.state.event.class);
  }

  render() {
    let color = getBoxColor(this.props.paintschema, this.props.setNewColor, this.state.event.class);
    if (isActive(this.props.activeIDs, this.props.id) || Object.keys(this.props.activeIDs).length === 0) {
      //color = colorLuminance(color, 0.50);
    } else {
      color = defaultColor;
     }
    let textColor = getTextColor(color);
    let heightE = MinutesToPX(this.state.duration);
    let topE = MinutesToPX(this.state.starttime-parseInt(getDayStarttime(this.props.comp, this.state.event.day), 10));
    let divStyle = {height: heightE,
                    top: topE,
                    background: color,
                    color: textColor,
                  };

    return (
        <div id={this.props.id}
          style={divStyle}
          className="event-main"
          onDoubleClick={this.handleHighLightEvent}
          onClick={e => this.handleMarkEvent(e, topE)}
        >
          <Stack anchor="top">
            {this.state.event.class+" "+this.state.event.gren}
            {isActive(this.props.activeIDs, this.props.id) &&
              <HLIcon color="status-critical" />
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
  activeIDs: state.activeID,
});

const mapDispatchToProps = dispatch => {
  return {
    setNewColor: (c) => dispatch( setColor(c) ),
    setTheActiveEvent: (id) => dispatch( setActiveEvent(id) ),
    setTheActiveClass: (cl) => dispatch( setActiveClass(cl) ),
  }
}

const EventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);

export default withRouter(EventContainer);

//export default Event;
