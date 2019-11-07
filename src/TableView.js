import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import EventTable from './EventTable';
import { Text, Box, Button } from 'grommet';
import {ChipSet, Chip} from '@material/react-chips';
import { Add } from 'grommet-icons';

class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Table View",
    };
    this.handleOpenAddForm = this.handleOpenAddForm.bind(this);
  }

  handleOpenAddForm (e) {
    console.log("handleOpenAddForm");
    this.props.history.push("/form/9999");
  }

  render() {
    return (
      <Box direction='column' pad='medium' background="light-1">
        <Button id="butAddEvent"
          icon={<Add />}
          onClick={this.handleOpenAddForm}
        />

        <Text weight="bold" >{this.state.name}</Text>

        <ChipSet>
        </ChipSet>

        <EventTable key="eventstable" onEdit={this.handleOpenEditForm} />

      </Box>
  )
  }
}

  // Store handling

  const mapStateToProps = state => ({
    comp: state.competition,
    id: state.activeID,
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
