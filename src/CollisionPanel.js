import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Box, CheckBox } from 'grommet';

import { healthCheckSchema, isOverlap } from './misc';

import { setOverlap } from './store/actions';

class CollisionPanel extends Component {
  constructor(props) {
    super(props);
    this.handleViewEvent = this.handleViewEvent.bind(this);
    this.state = {
      name: "Collision of Peers Events",
      eventcollisions: healthCheckSchema(this.props.events)
    };
  }

  handleViewEvent (e, id) {
    var cObj = {};
    cObj[id] = this.state.eventcollisions[id];
    console.log("I want to view the collision "+JSON.stringify(cObj));
    this.props.setTheOverlap(cObj);
  }

  render() {
    return (
      <Box background='light-1' >
        {Object.keys(this.state.eventcollisions).map(x => (
          <CheckBox
            key={"collisionbox"+x}
            checked={isOverlap(this.props.overlap,x)}
            label={x+" || "+this.state.eventcollisions[x]}
            onChange={(e) => this.handleViewEvent(e, x)}
          />
        ))}
      </Box>
    );
  }
}

  // Store handling

  const mapStateToProps = state => ({
    events: state.competition.events,
    overlap: state.overlap,
  });

  const mapDispatchToProps = dispatch => ({
      setTheOverlap: (x) => {
        dispatch(setOverlap(x));
      },
  });

  const CollisionPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(CollisionPanel);

  export default withRouter(CollisionPanelContainer);
