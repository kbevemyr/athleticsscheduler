import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Stack, Box } from 'grommet';
import { Accessibility as HLIcon, FormEdit } from 'grommet-icons';

import { setColor, setActiveEvent, setActiveClass } from './store/actions';
import { defaultColor, getTextColor, MinutesToPX, getEvent, getDayStarttime, isOverlap } from './misc';

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

function isActive(xs, x) {
  var res = xs[x];
  if (res == null) {
    res = false;
  }
  //if (res) all is false -> no activeID then all schould be active ...
  if (Object.keys(xs).length === 0) {
    res = true;
  }

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
      preptime: parseInt(getEvent(this.props.comp, this.props.id).preptime, 10),
    };
    this.handleMarkEvent = this.handleMarkEvent.bind(this);
    this.handleUnMarkEvent = this.handleUnMarkEvent.bind(this);
    this.handleHighLightEvent = this.handleHighLightEvent.bind(this);
  }

  handleMarkEvent(e, y) {
    if (e.shiftKey) {
      this.handleHighLightEvent(e);
    } else {
      console.log("handleMarkEvent "+y);
      this.props.onMarked(y, this.handleUnMarkEvent);
    }
  }

  handleUnMarkEvent(e) {
    if (e.shiftKey) {
      this.handleHighLightEvent(e);
    } else {
      console.log("handleUnMarkEvent ");
    }
  }

  handleHighLightEvent(e) {
    console.log("handelHighLightEvent");
    this.props.setTheActiveClass(this.state.event.class);
  }

  render() {
    let color = getBoxColor(this.props.paintschema, this.props.setNewColor, this.state.event.class);
    if (isActive(this.props.activeIDs, this.props.id)) {
      //color = colorLuminance(color, 0.50);
    } else {
      color = defaultColor;
    }

    // Event Main Box
    let textColor = getTextColor(color);
    let heightE = MinutesToPX(this.state.duration);
    let topE = MinutesToPX(this.state.starttime-parseInt(getDayStarttime(this.props.comp, this.state.event.day), 10));
    let markerStyle = {
      height: heightE,
      background: color,
      color: textColor,
    };

    // Event Prep Box
    let prepColor = "#F2F2F2";
    let prepTextColor = getTextColor(prepColor);
    let prepHeightE = MinutesToPX(this.state.preptime);
    let prepTopE = topE - prepHeightE;
    let prepDivStyle = {
      height: prepHeightE,
      background: prepColor,
      color: prepTextColor,
    };
    let mainStyle = {
      top: prepTopE,
    };

    return (
      <div
        id={"event-main"+this.props.id}
        className="event-main"
        style={mainStyle}
        >
        {this.state.preptime >0 &&
        <div
          id={"prep"+this.props.id}
          style={prepDivStyle}
        >
          {"ställtid: "+this.state.preptime+" min"}
        </div>
        }
        <div
          id={"marker"+this.props.id}
          style={markerStyle}
          onDoubleClick={this.handleHighLightEvent}
          onClick={e => this.handleMarkEvent(e, topE)}
        >
          <Stack anchor="top-right">
            {this.state.event.class+" "+this.state.event.gren}
            <Box direction="row">
              {isOverlap(this.props.overlaps, this.props.id) &&
                <Box background="white" round>
                  <HLIcon color="accent-1" size='small' />
                </Box>
              }
              <Box background="white" round>
                <a href={"#form/"+this.props.id}>
                  <FormEdit size='small' />
                </a>
              </Box>
            </Box>
          </Stack>
        </div>
      </div>
    );
  }
}

// Store handling

const mapStateToProps = state => ({
  comp: state.competition,
  paintschema: state.painting,
  activeIDs: state.activeID,
  overlaps: state.overlap,
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
