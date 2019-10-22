import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Box, Form, FormField, Select, MaskedInput, Button, Text } from 'grommet';
import { updateEvent } from './store/actions';
import { timeStrToMinutes, presentTime, getEmptyEvent, getAllArenas, getAllClasses, getAllGrens } from './misc';

class EventForm extends Component {
  constructor(props) {
    super(props);

    let currentEvent = getEmptyEvent();
    this.state = {
      dayValue: currentEvent.day,
      arenaValue: currentEvent.arena,
      starttimeStr: presentTime(currentEvent.starttime),
      durationStr: presentTime(currentEvent.duration),
      preptimeStr: presentTime(currentEvent.preptime),
      classValue: currentEvent.class,
      grenValue: currentEvent.gren,
    };

    var theEvent = this.props.comp.events.find(x => x.id === this.props.id);
    if (theEvent != null) {
      this.state = {
        dayValue: theEvent.day,
        arenaValue: theEvent.arena,
        starttimeStr: presentTime(theEvent.starttime),
        durationStr: presentTime(theEvent.duration),
        preptimeStr: presentTime(theEvent.preptime),
        classValue: theEvent.class,
        grenValue: theEvent.gren,
        grentypeValue: theEvent.grentype,
      };
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    console.log("State: ",this.state);
    var update = {
      id: this.props.id,
      day: this.state.dayValue,
      arena: this.state.arenaValue,
      starttime: timeStrToMinutes(this.state.starttimeStr),
      duration: timeStrToMinutes(this.state.durationStr),
      preptime: timeStrToMinutes(this.state.preptimeStr),
      class: this.state.classValue,
      gren: this.state.grenValue,
      grentype: this.state.grentypeValue,
    };
    console.log("Submit: ", update);
    this.props.updateTheEvent(update);
    //TODO: close the edit box and go back to tableView
    this.props.onDone();
  }

  handleChange(event) {
    //console.log("Changed "+event+" to " + event.value);
    //this.setState({key: event.target.value});
  }

  render() {
    let dOptions = this.props.comp.days.map(x => x.name);
    let cOptions = getAllClasses(this.props.comp.events);
    let aOptions = getAllArenas(this.props.comp.events);
    let gOptions = getAllGrens(this.props.comp.events);
    let gtOptions = [ "run", "tech" ];

    // events
    return (
      <Box pad="medium" background="light-3" width="50%">
        <Text weight="bold">Edit Event {this.props.id}</Text>
        <Form onSubmit={this.handleSubmit}>
          <FormField
            name="class"
            label="Class"
            value = {this.state.classValue}
            onChange = {(e) => this.setState({classValue: e.value})}
            component={Select}
            options={cOptions}
          />
          <FormField
            name="gren"
            label="Gren"
            value = {this.state.grenValue}
            onChange = {(e) => this.setState({grenValue: e.value})}
            component={Select}
            options={gOptions}
          />
          <FormField
            name="grentype"
            label="Grentyp"
            value = {this.state.grentypeValue}
            onChange = {(e) => this.setState({grentypeValue: e.value})}
            component={Select}
            options={gtOptions}
          />
          <FormField
            name="dayValue"
            label="Day"
            value = {this.state.dayValue}
            onChange = {(e) => this.setState({dayValue: e.value})}
            component={Select}
            options={dOptions}
          />
          <FormField
            name="arenaValue"
            label="Arena"
            value = {this.state.arenaValue}
            onChange = {(e) => this.setState({arenaValue: e.value})}
            component={Select}
            options={aOptions}
          />
        <FormField
          name="starttime"
          label="Starttid"
          component={MaskedInput}
          value={this.state.starttimeStr}
          onChange={(e) => this.setState({starttimeStr: e.target.value})}
          mask={[
            {
              length: 2,
              regexp: /^1[1-2]$|^[0-9]$/,
              placeholder: 'hh',
            },
            { fixed: ':' },
            {
              length: 2,
              regexp: /^[0-5][0-9]$|^[0-9]$/,
              placeholder: 'mm',
            },
          ]}
          />
          <FormField
            name="duration"
            label="Duration"
            component={MaskedInput}
            value={this.state.durationStr}
            onChange={(e) => this.setState({durationStr: e.target.value})}
            mask={[
              {
                length: 1,
                regexp: /^1[1-2]$|^[0-9]$/,
                placeholder: 'h',
              },
              { fixed: ':' },
              {
                length: 2,
                regexp: /^[0-5][0-9]$|^[0-9]$/,
                placeholder: 'mm',
              },
            ]}
          />
          <FormField
            name="preptime"
            label="Ställtid"
            component={MaskedInput}
            value={this.state.preptimeStr}
            onChange={(e) => this.setState({preptimeStr: e.target.value})}
            mask={[
              {
                length: 1,
                regexp: /^1[1-2]$|^[0-9]$/,
                placeholder: 'h',
              },
              { fixed: ':' },
              {
                length: 2,
                regexp: /^[0-5][0-9]$|^[0-9]$/,
                placeholder: 'mm',
              },
            ]}
          />
          <Button type="submit" primary label="Submit" />
        </Form>
      </Box>
  )
  }
}
/*
onSearch={(txt) => {
  const regexp = new RegExp(txt, 'i');
  this.setState({ classOptions: cOPTIONS.filter(o => o.match(regexp))});
}}
*/

  // Store handling

  const mapStateToProps = state => ({
    events: state.competition.events,
    comp: state.competition,
  });

  const mapDispatchToProps = dispatch => ({
      updateTheEvent: (e) => {
        dispatch(updateEvent(e));
    },
  });

  const EventFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventForm);

  export default withRouter(EventFormContainer);
