import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { DataTable, Clock, Text, Box } from 'grommet';

import { presentTime } from './misc';
import { setActiveEvent } from './store/actions';

class EventTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Table View of Events",
    };
    //this.handleOnClickRow = this.handleOnClickRow.bind(this);
  }

  handleOnClickRow (e, cb) {
    //console.log("handleOnClickRow "+JSON.stringify(e.datum));
    cb(e.datum, e.datum.id);
  }

  render() {
    // events
    return (
      <Box background='light-1' >
        <DataTable
          alignSelf="start"
          size='medium'
          sortable={true}
          primaryKey="id"
          onClickRow={(e) => this.handleOnClickRow(e, this.props.onEdit)}
          columns={[
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
              property: 'preptime',
              header: <Text>Ställtid</Text>,
              render: x => (
                <Box>
                <Clock type="digital"
                       precision="minutes"
                       time={"T"+presentTime(x.preptime)+":00"}
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
              property: 'grentype',
              header: <Text>Grentyp</Text>,
            },
            {
              property: 'note',
              header: <Text>Not</Text>,
              render: x => (
                <Text>{"//"+this.props.overlap[x.id]}</Text>
              )
            },
          ]}
          data={this.props.comp.events}
        />
      </Box>
    )
  }
}


  // Store handling

  const mapStateToProps = state => ({
    comp: state.competition,
    events: state.competition.events,
    active: state.activeID,
    overlap: state.overlap,
  });

  const mapDispatchToProps = dispatch => ({
      setTheActiveEvent: (id) => {
        dispatch(setActiveEvent(id));
    },
  });

  const EventTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventTable);

  export default withRouter(EventTableContainer);
