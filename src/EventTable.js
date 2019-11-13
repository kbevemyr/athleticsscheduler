import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Text, Anchor } from 'grommet';
import { FormEdit } from 'grommet-icons';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { getEvent, presentTime, getOverlaps, healthCheckSchema } from './misc';
import { setActiveEvent } from './store/actions';


function presentEvents(comp, overlaps) {
  var ds = {};
  comp.days.forEach(x => ds[x.id] = x.name);
  var as = {};
  comp.arenas.forEach(x => as[x.id] = x.name);

  return (comp.events.map(event => {
    var os = getOverlaps(overlaps, event.id);

    var os2 = [];
    overlaps.forEach(x => os2.push(getEvent(comp, x.value)));
    // TODO: Only shows the first overlap for now.

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
      overlap: (os.length > 0 ? os2[0].class+" "+os2[0].gren : "")+
                (os.length > 1 ? "..." : ""),
    });
  }));
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


class EventTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Table View of Events",
      order: "asc",
      orderBy: "arena",
    };
  }

  handleOnRowClick (e) {
    let data = e.target.value;
    console.log("handleOnRowClick "+JSON.stringify(data));
    this.props.history.push("/form/"+data);
  }

  createSortHandler = property => event => {
    this.handleRequestSort(event, property);
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  }

  render() {
    let DATA = presentEvents(this.props.comp, this.props.eventcollisions);

    let columns = [
      {
        key: 'day',
        label: "Dag",
      },
      {
        key: 'arena',
        label: "Arena",
      },
      {
        key: 'preptime',
        label: "Ställtid",
      },
      {
        key: 'starttime',
        label: "Starttid",
      },
      {
        key: 'duration',
        label: "Duration",
      },
      {
        key: 'class',
        label: "Klass",
      },
      {
        key: 'gren',
        label: "Gren",
      },
      {
        key: 'grentype',
        label: "Grentyp",
      },
      {
        key: 'overlap',
        label: "Kolliderar med",
      },
    ];

    return (
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell key='thactions'>

              </TableCell>
              {columns.map(x =>
                <TableCell
                  key={"th"+x.key}
                  sortDirection={this.state.orderBy === x.id ? this.state.order : false}
                >
                  <TableSortLabel
                    active={this.state.orderBy === x.key}
                    direction={this.state.order}
                    onClick={this.createSortHandler(x.key)}
                  >
                    <Text>{x.label}</Text>
                  </TableSortLabel>
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {stableSort(DATA, getSorting(this.state.order, this.state.orderBy)).map(x =>
              <TableRow
                key={"tr"+x.id}
              >
                <TableCell>
                  <Anchor href={"#form/"+x.id} icon={<FormEdit />} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {x.day}
                </TableCell>
                <TableCell scope="row">
                  {x.arena}
                </TableCell>
                <TableCell scope="row">
                  {presentTime(x.preptime)}
                </TableCell>
                <TableCell scope="row">
                  {presentTime(x.starttime)}
                </TableCell>
                <TableCell scope="row">
                  {presentTime(x.duration)}
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
