import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Clock, Text, Box } from 'grommet';

import { Table, TableHeader, TableBody, TableRow, TableCell} from 'grommet';

import { presentTime, getOverlaps, healthCheckSchema } from './misc';
import { setActiveEvent } from './store/actions';


function presentEvents(comp, overlaps) {
  var ds = {};
  comp.days.forEach((x) => ds[x.id] = x.name);
  var as = {};
  comp.arenas.forEach((x) => as[x.id] = x.name);

  return (comp.events.map(event => {
    var os = getOverlaps(overlaps, event.id);
    return({
      id: event.id,
      day: ds[event.day],
      arena: as[event.arena],
      starttime: event.starttime,
      duration: event.duration,
      preptime: event.preptime,
      class: event.class,
      gren: event.gren,
      grentype: event.grentype,
      overlap: (os.length > 0 ? os[0].value+" ...":"-"),
    });
  }));
}

function genTimePresentation(x) {
 return x;
}

class EventTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Table View of Events",
    };
  }

  handleOnRowClick (e, data) {
    //console.log("handleOnRowClick "+JSON.stringify(data));
    this.props.history.push("/form/"+data.id);
  }

  render() {
    let DATA = presentEvents(this.props.comp, this.props.eventcollisions);

    let columns = [
      {
        field: 'day',
        title: <Text>Dag</Text>,
        render: (x) => x.day,
      },
      {
        field: 'arena',
        title: <Text>Arena</Text>,
        render: (x) => x.arena,
      },
      {
        field: 'preptime',
        title: <Text>Ställtid</Text>,
        render: x => genTimePresentation(x.preptime),
      },
      {
        field: 'starttime',
        title: <Text>Starttid</Text>,
        render: x => x.starttime,
      },
      {
        field: 'duration',
        title: <Text>Duration</Text>,
        render: x => x.duration,
      },
      {
        field: 'class',
        title: <Text>Klass</Text>,
        render: (x) => x.class,
      },
      {
        field: 'gren',
        title: <Text>Gren</Text>,
        render: (x) => x.gren,
      },
      {
        field: 'grentype',
        title: <Text>Grentyp</Text>,
        render: (x) => x.grentype,
      },
      {
        field: 'overlap',
        title: <Text>Kolliderar med</Text>,
        render: x => (
          <Text>{x.overlap}</Text>
        ),
      },
    ];

    return (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(x =>
                <TableCell key={"th"+x.field} scope="col">
                  {x.title}
                </TableCell>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {DATA.map(x =>
              <TableRow key={"tr"+x.id}>
                <TableCell scope="row">
                  {x.day}
                </TableCell>
                <TableCell scope="row">
                  {x.arena}
                </TableCell>
                <TableCell scope="row">
                  <Box>
                  <Clock type="digital"
                         precision="minutes"
                         time={"T"+presentTime(x.preptime)+":00"}
                  />
                  </Box>
                </TableCell>
                <TableCell scope="row">
                  <Box>
                  <Clock type="digital"
                         precision="minutes"
                         time={"T"+presentTime(x.starttime)+":00"}
                  />
                  </Box>
                </TableCell>
                <TableCell scope="row">
                  <Box>
                  <Clock type="digital"
                         precision="minutes"
                         time={"T"+presentTime(x.duration)+":00"}
                  />
                  </Box>
                </TableCell>
                <TableCell scope="row">
                  {x.class}
                </TableCell>
                <TableCell scope="row">
                  {x.gren}
                </TableCell>
                <TableCell scope="row">
                  {x.grentype}
                </TableCell>
                <TableCell scope="row">
                  {x.overlap}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

    );
  }
}

/*

    {
      property: 'arena',
      title: <Text>Arena</Text>,
    },
    {
      property: 'preptime',
      title: <Text>Ställtid</Text>,
      render: x => (
        <Box>
        <Clock type="digital"
               precision="minutes"
               time={"T"+presentTime(x.preptime)+":00"}
        />
        </Box>
      ),
    },

*/


  // Store handling

  const mapStateToProps = state => ({
    comp: state.competition,
    eventcollisions: healthCheckSchema(state.competition.events),
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
