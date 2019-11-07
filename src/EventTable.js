import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { DataTable, Clock, Text, Box } from 'grommet';

import { presentTime } from './misc';
import { setActiveEvent } from './store/actions';

function presentEvents(comp) {
  var ds = {};
  comp.days.forEach((x) => ds[x.id] = x.name);
  var as = {};
  comp.arenas.forEach((x) => as[x.id] = x.name);
  return (comp.events.map(event => {
    return({id: event.id, day: ds[event.day], arena: as[event.arena], starttime: event.starttime, duration: event.duration, preptime: event.preptime, class: event.class, gren: event.gren, grentype: event.grentype});
  }));
}

class EventTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Table View of Events",
    };
  }

  handleOnClickRow (e) {
    console.log("handleOnClickRow "+JSON.stringify(e.datum));
    this.props.history.push("/form/"+e.datum.id);
  }

  render() {
    let DATA = presentEvents(this.props.comp);

    return (
      <Box background='light-1' >
        <DataTable
          alignSelf="start"
          size='medium'
          sortable={true}
          primaryKey="id"
          onClickRow={(e) => this.handleOnClickRow(e)}
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
          data={DATA}
        />
      </Box>
    )
  }
}


  // Store handling

  const mapStateToProps = state => ({
    comp: state.competition,
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
