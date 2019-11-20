import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Box, Anchor, Text } from 'grommet';
import { Table, TableBody, TableCell, TableHeader, TableRow } from 'grommet';
import { FormEdit } from 'grommet-icons';
import { presentTime, getEvent, getName } from './misc';


class EventDetails extends Component {

  constructor(props) {
    super(props);

    let theEvent = getEvent(this.props.comp, this.props.match.params.id);

    if (theEvent != null) {
      this.state = {
        currentEvent: theEvent,
      };
    } else {
      this.state = {
        currentEvent: undefined,
      }
    };
    this.handleClose = this.handleClose.bind(this);
  }


  componentDidMount() {
    var theEvent = undefined;
    if (this.props.id !== undefined) {
      theEvent = getEvent(this.props.comp, this.props.id);
    } else if (this.props.match.params.id !== undefined) {
      theEvent = getEvent(this.props.comp, this.props.match.params.id);
    }

    console.log("EventData eventdata "+JSON.stringify(theEvent));

    if (theEvent != null) {
      this.setState({currentEvent: theEvent });
    }
  }

  handleClose(event) {
    this.props.history.goBack();
  }

  render() {
    let comp = this.props.comp;
    let renderedEvent = <Text>No event to show</Text>;

    if (this.state.currentEvent !== undefined) {
      let endtime = parseInt(this.state.currentEvent.starttime, 10)+parseInt(this.state.currentEvent.duration, 10);
      let values = [
        {
          label: "Dag",
          value: getName(this.state.currentEvent.day, comp, 'days'),
        },
        {
          label: "Arena",
          value: getName(this.state.currentEvent.arena, comp, 'arenas'),
        },
        {
          label: "Ställtid",
          value: presentTime(this.state.currentEvent.preptime),
        },
        {
          label: "Starttid",
          value: presentTime(this.state.currentEvent.starttime),
        },
        {
          label: "Duration",
          value: presentTime(this.state.currentEvent.duration),
        },
        {
          label: "Sluttid",
          value: presentTime(endtime),
        },
      ];

      renderedEvent =
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>
                <Text weight='bold'>
                  {
                    getName(this.state.currentEvent.class, comp, 'classes')+
                    " "+
                    getName(this.state.currentEvent.gren, comp, 'grenar')
                  }
                </Text>
              </TableCell>
              <TableCell>
                <Anchor href={"#form/"+this.state.currentEvent.id} icon={<FormEdit />} />
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {values.map(x =>
              <TableRow key={"detailsPart"+x.label}>
                <TableCell>
                  <Text><b>{x.label+":"}</b></Text>
                </TableCell>
                <TableCell>
                  <Text>{x.value}</Text>
                </TableCell>
              </TableRow>
            )
          }
          </TableBody>
        </Table>

    }

    return (
      <Box>
        {renderedEvent}
      </Box>
    );
  }
}


  // Store handling

  const mapStateToProps = state => ({
    events: state.competition.events,
    comp: state.competition,
  });

  const mapDispatchToProps = dispatch => ({
      updateTheEvent: (e) => {
        //dispatch(updateEvent(e));
    },
  });

  const EventDetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventDetails);

  export default withRouter(EventDetailsContainer);
