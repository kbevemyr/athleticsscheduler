import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

//import { setColor } from './store/actions';
import DayTable from './DayTable';
import ArenaTable from './ArenaTable';
import EventTable from './EventTable';
import EventForm from './EventForm';
import { Accordion, AccordionPanel, Text, Box } from 'grommet';

class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Table View",
      editID: -1,
    };
    this.handleOpenEditForm = this.handleOpenEditForm.bind(this);
    this.handleCloseEditForm = this.handleCloseEditForm.bind(this);
  }

  handleCloseEditForm () {
    this.setState({editID: -1});
  }

  handleOpenEditForm (e, id) {
    console.log("I want to edit the event "+id);
    this.setState({editID: id});
  }

  render() {
    // competition
    return (
      <Box direction='column' pad='medium' background="light-1">
        <Text weight="bold" >{this.state.name}</Text>
        <Accordion>
          <AccordionPanel label="Days">
            <DayTable />
          </AccordionPanel>
          <AccordionPanel label="Arenas">
            <ArenaTable />
          </AccordionPanel>
          <AccordionPanel label="Events">
            <EventTable onEdit={this.handleOpenEditForm} />
          </AccordionPanel>
        </Accordion>
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
