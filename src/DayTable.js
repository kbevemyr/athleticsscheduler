import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { DataTable, Clock, Text, Box } from 'grommet';

import { MinutesToPX, presentTime, getEvent } from './misc';

class DayTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Table View of Days",
    };
  }

  render() {
    // days
    return (
      <Box direction='column' >
    <DataTable
      alignSelf="start"
      columns={[
        {
          property: 'id',
          header: <Text>Id</Text>,
          primary: true,
        },
        {
          property: 'name',
          header: <Text>Name</Text>,
        },
        {
          property: 'starttime',
          header: <Text>Start Time</Text>,
        },
      ]}
      data={this.props.comp.days}
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
    days: state.competition.days,
  });

  const mapDispatchToProps = dispatch => ({
      setXXXColor: (c) => {
        //dispatch(setXXX(c));
    },
  });

  const DayTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(DayTable);

  export default withRouter(DayTableContainer);
