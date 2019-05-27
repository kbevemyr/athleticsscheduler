import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { setColor } from './store/actions';
import DayTable from './DayTable';
import ArenaTable from './ArenaTable';
import EventTable from './EventTable';
import EventForm from './EventForm';
import { Accordion, AccordionPanel, Text, Box } from 'grommet';

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
      <Box direction='column' pad='medium'>
        <Text>{this.state.name}</Text>
        <Accordion>
          <AccordionPanel label="Days">
            <DayTable />
          </AccordionPanel>
          <AccordionPanel label="Arenas">
            <ArenaTable />
          </AccordionPanel>
          <AccordionPanel label="Events">
            <EventTable />
          </AccordionPanel>
        </Accordion>
        <EventForm>
        </EventForm>
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
