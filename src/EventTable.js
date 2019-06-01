import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { DataTable, Clock, Text, Box, Button } from 'grommet';

import { MinutesToPX, presentTime } from './misc';

class EventTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Table View of Events",
    };
  }

  render() {
    // events
    return (
      <Box background='light-1' >
    <DataTable
      alignSelf="start"
      size='small'
      columns={[
        {
          property: 'id',
          header: <Text>Id</Text>,
          primary: true,
        },
        {
          property: 'day',
          header: <Text>Day</Text>,
        },
        {
          property: 'arena',
          header: <Text>Arena</Text>,
        },
        {
          property: 'starttime',
          header: <Text>Start Time</Text>,
          render: x => (
            <Box>
            <Clock type="digital"
                   precision="minutes"
                   time={"T"+presentTime(x.starttime)+":00"}
            />
            </Box>
          ),
        },
        {
          property: 'duration',
          header: <Text>Duration</Text>,
          render: x => (
            <Box>
            <Clock type="digital"
                   precision="minutes"
                   time={"T"+presentTime(x.duration)+":00"}
            />
            </Box>
          ),
        },
        {
          property: 'class',
          header: <Text>Class</Text>,
        },
        {
          property: 'gren',
          header: <Text>Gren</Text>,
        },
        {
          property: 'editEvent',
          render: x => (
            <Button>Edit {x.id}</Button>
          ),
        },
      ]}
      data={this.props.comp.events}
    />
    </Box>
  )
  }
}
/*
render: x => (
  <Box>
  <Clock type="digital"
         precision="minutes"
         time={"T"+presentTime(x.starttime)+":00"}
  />
  </Box>
),

*/

  // Store handling

  const mapStateToProps = state => ({
    comp: state.competition,
    events: state.competition.events,
  });

  const mapDispatchToProps = dispatch => ({
      setXXXColor: (c) => {
        //dispatch(setXXX(c));
    },
  });

  const EventTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventTable);

  export default withRouter(EventTableContainer);
