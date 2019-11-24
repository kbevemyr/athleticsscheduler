import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Stack, Box } from 'grommet';
import { Alert } from 'grommet-icons';

import { setColor, setActiveEvent, setActiveClass } from './store/actions';
import { defaultColor, getTextColor, MinutesToPX, getEvent, getDayStarttime } from './misc';
import { getEventLabel, inCollision } from './misc';


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
      dummy: "dummadu",
    };
    this.handleMarkEvent = this.handleMarkEvent.bind(this);
    this.handleUnMarkEvent = this.handleUnMarkEvent.bind(this);
    this.handleHighLightEvent = this.handleHighLightEvent.bind(this);
  }

  handleMarkEvent(e, y, eventData) {
    if (e.shiftKey) {
      this.handleHighLightEvent(e, eventData);
    } else {
      console.log("handleMarkEvent "+y);
      this.props.onMarked(y, this.handleUnMarkEvent);
    }
  }

  handleUnMarkEvent(e, eventData) {
    if (e.shiftKey) {
      this.handleHighLightEvent(e, eventData);
    } else {
      console.log("handleUnMarkEvent ");
    }
  }

  handleHighLightEvent(e, eventData) {
    console.log("handelHighLightEvent");
    this.props.setTheActiveClass(eventData.class);
  }

  render() {
    let overlap = this.props.overlap ? 0.3 : 1.0;
    let eventData = getEvent(this.props.comp, this.props.id);
    let starttime = parseInt(eventData.starttime, 10);
    let duration = parseInt(eventData.duration, 10);
    let preptime = parseInt(eventData.preptime, 10);

    let color = getBoxColor(this.props.paintschema, this.props.setNewColor, eventData.class);
    if (isActive(this.props.activeIDs, this.props.id)) {
      //color = colorLuminance(color, 0.50);
    } else {
      color = defaultColor;
    }

    // Event Main Box
    let textColor = getTextColor(color);
    let heightE = MinutesToPX(duration);
    let topE = MinutesToPX(starttime-parseInt(getDayStarttime(this.props.comp, eventData.day), 10));
    let markerStyle = {
      height: heightE,
      background: color,
      color: textColor,
    };

    // Event Prep Box
    let prepColor = "#F2F2F2";
    let prepTextColor = getTextColor(prepColor);
    let prepHeightE = MinutesToPX(preptime);
    let prepTopE = topE - prepHeightE;
    let prepDivStyle = {
      height: prepHeightE,
      background: prepColor,
      color: prepTextColor,
    };

    let mainStyle = {
      top: prepTopE,
      opacity: overlap,
    };

    let linkStyle = {
      textDecoration: "none",
      color: textColor,
    };

    return (
      <div
        id={"event-main"+this.props.id}
        className="event-main"
        style={mainStyle}
        >
        {preptime >0 &&
        <div
          id={"prep"+this.props.id}
          style={prepDivStyle}
        >
          {"ställtid: "+preptime+" min"}
        </div>
        }
        <div
          id={"marker"+this.props.id}
          style={markerStyle}
          onClick={e => this.handleMarkEvent(e, topE, eventData)}
        >
          <Stack anchor="top-right">
            <a style={linkStyle} href={"#"+this.props.match.url+"/event/"+this.props.id}>
              {getEventLabel(this.props.comp, eventData.id)}
            </a>
            <Box direction="row">
              {this.props.overlap &&
                <Box background="white">
                  <Alert color="status-critical" size='medium' />
                </Box>
              }
            </Box>
            {inCollision(this.props.collisions, this.props.id) &&
              <Box background="white">
                <Alert color="status-warning" size='medium' />
              </Box>
            }
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
  collisions: state.collisions,
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
