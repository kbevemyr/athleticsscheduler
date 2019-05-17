import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { setColor } from './store/actions';

import { MinutesToPX, getEvent } from './misc';

function getBoxColor(paintSchema, newColor, eventClass) {
  var color = 'lightgray';
  var paint = paintSchema.find(x => (x.id == eventClass));
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
      name: "N."+this.props.id,
      starttime: parseInt(getEvent(this.props.comp, this.props.id).starttime, 10),
      duration: parseInt(getEvent(this.props.comp, this.props.id).duration, 10),
      color: getBoxColor(this.props.paintschema, this.props.setNewColor, getEvent(this.props.comp, this.props.id).class),
    };
  }

  render() {
    var divStyle = {height: MinutesToPX(this.state.duration),
                    top: MinutesToPX(this.state.starttime),
                    background: this.state.color,
                  };

    return (
      <div id={this.props.id}
        style={divStyle}
        className="event-main"
        onClick={() => this.setState({name: 'X'})}
      >
        {this.state.starttime}
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
