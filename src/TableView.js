import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { setColor } from './store/actions';
import DayTable from './DayTable';
import ArenaTable from './ArenaTable';
import EventTable from './EventTable';
import { Text, Box } from 'grommet';

import { MinutesToPX, getEvent } from './misc';

class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "TableViews",
    };
  }

  render() {
    // competition
    return (
      <Box direction='column' >
        <Text>{this.state.name}</Text>
        <Box direction='row' align='start'>
        <DayTable />
        <ArenaTable />
        <EventTable />
        </Box>
      </Box>
  )
  }
}

  // Store handling

  const mapStateToProps = state => ({
    comp: state.competition,

  });

  const mapDispatchToProps = dispatch => ({
      setXXXColor: (c) => {
        //dispatch(setXXX(c));
    },
  });

  const TableViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(TableView);

  export default withRouter(TableViewContainer);
