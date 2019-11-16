import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Heading, Text, Box, CheckBox, Markdown } from 'grommet';

import { healthCheckSchema2, isOverlap, getEvent } from './misc';

import { setOverlap } from './store/actions';

class CollisionPanel extends Component {
  constructor(props) {
    super(props);
    this.handleViewEvent = this.handleViewEvent.bind(this);
    this.state = {
      name: "Collision of Events ",
    };
  }

  handleViewEvent (e, id, cId) {
    var cObj = {};
    cObj[id] = cId;
    this.props.setTheOverlap({key: id, value: cId});
  }

  render() {
    console.log("just to call healthCheckSchema2 for day "+this.props.day);
    var eventcollisions = healthCheckSchema2(this.props.events, this.props.day);

    let ret = <Text>There are no event collisions.</Text>;
    if (eventcollisions.length > 0) {
      ret =
      <Box>
        <Heading level= {3}>{this.state.name}</Heading>
        {eventcollisions.map(x => {
          var event1 = getEvent(this.props.comp, x.key);
          var event2 = getEvent(this.props.comp, x.value);
          return (
            <CheckBox
              key={"collisionbox"+event1.id+event2.id+this.props.day}
              checked={isOverlap(this.props.overlap,event1.id)}
              label={<Markdown>{"**"+event1.class+" "+event1.gren+"** || " + event2.class+" "+ event2.gren}</Markdown>}
              onChange={(e) => this.handleViewEvent(e, event1.id, event2.id)}
            />
        )})}
      </Box>;
    }

    return (ret);
  }
}

  // Store handling

  const mapStateToProps = state => ({
    day: state.activeD,
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
