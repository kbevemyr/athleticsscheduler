import React, {Component} from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Text, Button, Box, Layer } from 'grommet';
import { FormEdit, FormTrash } from 'grommet-icons';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { getEvent, presentTime, getCollisions, healthCheckSchema } from './misc';
import { setActiveEvent, deleteEvent } from './store/actions';

const ConfirmationDialog = ({ onClose, onCancel })  => (
      <Layer
        position='top'
        onClickOutside={onCancel}
        >
        <Box pad='large' gap='medium'>
          <Text>
            Är du säker att du vill tabort detta?
          </Text>
          <Box direction='row' gap='medium' align='center'>
            <Button label='Yes' onClick={onClose} />
            <Button label='No' primary={true} onClick={onCancel} />
          </Box>
        </Box>
      </Layer>
);

function presentEvents(comp, collisions) {
  var ds = {};
  comp.days.forEach(x => ds[x.id] = x.name);
  var as = {};
  comp.arenas.forEach(x => as[x.id] = x.name);

  return (comp.events.map(event => {
    var os = getCollisions(collisions, event.id);

    var os2 = [];
    collisions.forEach(x => os2.push(getEvent(comp, x.value)));
    // TODO: Only shows the first collision for now.

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
      collisions: (os.length > 0 ? os2[0].class+" "+os2[0].gren : "")+
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
      confirmation: undefined,
    };
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

  handleDeleteEvent(id) {
    console.log("handleDeleteEvent "+id);
    let action = () => this.props.deleteTheEvent(id);
    this.setState({
      confirmation:
        <ConfirmationDialog
          onClose={() => {action(); this.setState({confirmation: undefined});}}
          onCancel={() => this.setState({confirmation: undefined})}
        />
    });
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
        key: 'collisions',
        label: "Kolliderar med",
      },
    ];

    return (
      <Box>
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
                  <Box direction="row">
                    <Link to={this.props.match.url+"/form/"+x.id}>
                      <Button
                        icon={<FormEdit />}
                        onClick={this.props.onEditRow}
                      />
                    </Link>
                    <Button
                      fill={false}
                      icon={<FormTrash />}
                      onClick={(e) => this.handleDeleteEvent(x.id)}
                    />
                  </Box>
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
                  {x.collisions}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {this.state.confirmation}
      </Box>
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
      deleteTheEvent: (id) => {
        dispatch(deleteEvent(id));
    },
  });

  const EventTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventTable);

  export default withRouter(EventTableContainer);
