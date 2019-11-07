import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Box, CheckBox, Text } from 'grommet';

import { healthCheckSchema, isOverlap, getEvent } from './misc';

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
          var event1 = getEvent(this.props.comp, x);
          var event2 = getEvent(this.props.comp, eventcollisions[x]);
          return (
            <CheckBox
              key={"collisionbox"+event1.id+event2.id}
              checked={isOverlap(this.props.overlap,event1.id)}
              label={event1.class+" "+event1.gren+" || " + event2.class+" "+ event2.gren}
              onChange={(e) => this.handleViewEvent(e, event1.id, event2.id)}
            />
        )})}
      </Box>
    );
  }
}

  // Store handling

  const mapStateToProps = state => ({
    comp: state.competition,
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
