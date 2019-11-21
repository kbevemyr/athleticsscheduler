import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Heading, Text, Box, CheckBox, Markdown } from 'grommet';
import { Alert } from 'grommet-icons';

import { healthCheckSchema2, inCollision, overlapCheckSchema2, getEvent } from './misc';

import { setCollision } from './store/actions';

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
    this.props.setTheCollision({key: id, value: cId});
  }

  render() {
    console.log("just to call healthCheckSchema2 for day "+this.props.day);
    var eventcollisions = healthCheckSchema2(this.props.events, this.props.day);

    console.log("calling overlapCheckSchema for day "+this.props.day);
    var eventoverlaps = overlapCheckSchema2(this.props.events, this.props.day);
    console.log(eventoverlaps);

    let ret = <Text>There are no event collisions.</Text>;
    if (eventcollisions.length > 0) {
      ret =
      <Box>
        <Heading level= {3}>
          <Box background="white" width='medium'>
            <Alert color="status-warning" size='medium' />
          </Box>
          {this.state.name}
        </Heading>
        {eventcollisions.map(x => {
          var event1 = getEvent(this.props.comp, x.key);
          var event2 = getEvent(this.props.comp, x.value);
          return (
            <CheckBox
              key={"collisionbox"+event1.id+event2.id+this.props.day}
              checked={inCollision(this.props.collisions,event1.id)}
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
    collisions: state.collisions,
  });

  const mapDispatchToProps = dispatch => ({
      setTheCollision: (x) => {
        dispatch(setCollision(x));
      },
  });

  const CollisionPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(CollisionPanel);

  export default withRouter(CollisionPanelContainer);
