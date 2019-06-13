import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { DataTable, Text, Box } from 'grommet';

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
