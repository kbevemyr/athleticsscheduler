import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { DataTable, Clock, Text, Box } from 'grommet';

import { MinutesToPX, presentTime } from './misc';

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
              property: 'name',
              header: <Text>Name</Text>,
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
              property: 'endtime',
              header: <Text>End Time</Text>,
              render: x => (
                <Box>
                  <Clock type="digital"
                       precision="minutes"
                       time={"T"+presentTime(x.endtime)+":00"}
                  />
                </Box>
              ),
            },
          ]}
          data={this.props.days}
          />
      </Box>
    )
  }
}

  // Store handling

  const mapStateToProps = state => ({
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
