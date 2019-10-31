import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Box, CheckBox, Text } from 'grommet';

import { healthCheckSchema, isOverlap } from './misc';

import { setOverlap } from './store/actions';

class CollisionPanel extends Component {
  constructor(props) {
    super(props);
    this.handleViewEvent = this.handleViewEvent.bind(this);
    this.state = {
      name: "Collision of Peers Events",
      //eventcollisions: healthCheckSchema(this.props.events)
    };
  }

  handleViewEvent (e, id, cId) {
    var cObj = {};
    cObj[id] = cId;
    //console.log("I want to view the collision "+JSON.stringify(id));
    this.props.setTheOverlap({key: id, value: cId});
  }

  render() {
    console.log("just to call healthCheckSchema");
    var eventcollisions = healthCheckSchema(this.props.events);

    return (
      <Box background='light-1' >
        <Text weight="bold" >{this.state.name}</Text>
        {Object.keys(eventcollisions).map(x => {
          return (
            <CheckBox
              key={"collisionbox"+x}
              checked={isOverlap(this.props.overlap,x)}
              label={x+" || " + eventcollisions[x]}
              onChange={(e) => this.handleViewEvent(e, x, eventcollisions[x])}
            />
        )})}
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
