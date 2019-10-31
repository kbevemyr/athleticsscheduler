import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import EventTable from './EventTable';
import EventForm from './EventForm';
import { Text, Box, Button } from 'grommet';
import {ChipSet, Chip} from '@material/react-chips';
import { Add } from 'grommet-icons';

class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Table View",
      editID: -1,
    };
    this.handleOpenEditForm = this.handleOpenEditForm.bind(this);
    this.handleOpenAddForm = this.handleOpenAddForm.bind(this);
    this.handleCloseEditForm = this.handleCloseEditForm.bind(this);
  }

  handleCloseEditForm () {
    this.setState({editID: -1});
  }

  handleOpenAddForm (e) {
    console.log("handleOpenAddForm");
    this.setState({editID: 9999});
  }

  handleOpenEditForm (e, id) {
    console.log("handleOpenEditForm "+id);
    this.setState({editID: id});
  }

  render() {
    // competition
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

        {(this.state.editID !== -1) &&
          <EventForm id={this.state.editID} onDone={this.handleCloseEditForm}/>
        }
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
