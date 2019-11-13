import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Box, Form, FormField, Select, MaskedInput, Button, Text } from 'grommet';
import { updateEvent } from './store/actions';
import { timeStrToMinutes, presentTime, getEmptyEvent, getAllClasses, getAllGrens } from './misc';


class EventForm extends Component {

  constructor(props) {
    super(props);

    let currentEvent = getEmptyEvent();
    this.state = {
      editId: 9999,
      dayValue: currentEvent.day,
      arenaValue: currentEvent.arena,
      starttimeStr: presentTime(currentEvent.starttime),
      durationStr: presentTime(currentEvent.duration),
      preptimeStr: presentTime(currentEvent.preptime),
      classValue: currentEvent.class,
      grenValue: currentEvent.gren,

      dOptions: this.props.comp.days.map(x => x.name),
      //dOptions: getAllDays(this.props.comp.events),
      aOptions: this.props.comp.arenas.map(x => x.name),
      //aOptions = getAllArenas(this.props.comp.events),
      cOptions: getAllClasses(this.props.comp.events),
      gOptions: getAllGrens(this.props.comp.events),
      gtOptions: [ "run", "tech" ],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    var theEvent = this.props.comp.events.find(
      x => x.id === this.props.match.params.id
    );

    if (theEvent != null) {
      this.state = {
        editId: this.props.match.params.id,
        dayValue: theEvent.day,
        arenaValue: theEvent.arena,
        starttimeStr: presentTime(theEvent.starttime),
        durationStr: presentTime(theEvent.duration),
        preptimeStr: presentTime(theEvent.preptime),
        classValue: theEvent.class,
        grenValue: theEvent.gren,
        grentypeValue: theEvent.grentype,

        dOptions: this.props.comp.days.map(x => x.name),
        //dOptions: getAllDays(this.props.comp.events),
        aOptions: this.props.comp.arenas.map(x => x.name),
        //aOptions = getAllArenas(this.props.comp.events),
        cOptions: getAllClasses(this.props.comp.events),
        gOptions: getAllGrens(this.props.comp.events),
        gtOptions: [ "run", "tech" ],
      };
    }
  };

/* funkar inte formuläret uppdateras inte VARFÖR?
  componentDidMount() {
    console.log("EventForm lookup data for id "+this.props.match.params.id);
    var theEvent = this.props.comp.events.find(
      x => x.id === this.props.match.params.id
    );

    console.log("EventForm eventdata "+JSON.stringify(theEvent));

    if (theEvent != null) {
      this.setState({
        dayValue: theEvent.day,
        arenaValue: theEvent.arena,
        starttimeStr: presentTime(theEvent.starttime),
        durationStr: presentTime(theEvent.duration),
        preptimeStr: presentTime(theEvent.preptime),
        classValue: theEvent.class,
        grenValue: theEvent.gren,
        grentypeValue: theEvent.grentype,
      });
    }
  }
  */

  handleSubmit(event) {
    console.log("State: ",this.state);
    var update = {
      id: this.state.editId,
      day: this.state.dayValue,
      arena: this.state.arenaValue,
      starttime: timeStrToMinutes(this.state.starttimeStr),
      duration: timeStrToMinutes(this.state.durationStr),
      preptime: timeStrToMinutes(this.state.preptimeStr),
      class: this.state.classValue,
      gren: this.state.grenValue,
      grentype: this.state.grentypeValue,
    };
    console.log("Submit in EventForm: ", update);
    this.props.updateTheEvent(update);
    this.props.history.goBack();
  }

  handleCancel(event) {
    this.props.history.goBack();
  }

  render() {

    return (
      <Box pad="medium" background="light-3" width="50%">
        <Text weight="bold">Edit Event {this.state.editId}</Text>
        <Form onSubmit={this.handleSubmit} onReset={this.handleCancel}>
          <FormField
            name="class"
            label="Klass"
            value = {this.state.classValue}
            onChange = {(e) => this.setState({classValue: e.value})}
            component={Select}
            options={this.state.cOptions}
            required={true}
          />
          <FormField
            name="gren"
            label="Gren"
            value = {this.state.grenValue}
            onChange = {(e) => this.setState({grenValue: e.value})}
            component={Select}
            options={this.state.gOptions}
            required={true}
          />
          <FormField
            name="grentype"
            label="Grentyp"
            value = {this.state.grentypeValue}
            onChange = {(e) => this.setState({grentypeValue: e.value})}
            component={Select}
            options={this.state.gtOptions}
            required={true}
          />
          <FormField
            name="dayValue"
            label="Dag"
            value = {this.state.dayValue}
            onChange = {(e) => this.setState({dayValue: e.value})}
            component={Select}
            options={this.state.dOptions}
            required={true}
          />
          <FormField
            name="arenaValue"
            label="Arena"
            value = {this.state.arenaValue}
            onChange = {(e) => this.setState({arenaValue: e.value})}
            component={Select}
            options={this.state.aOptions}
            required={true}
          />
          <FormField
            name="preptime"
            label="Ställtid"
            component={MaskedInput}
            value={this.state.preptimeStr}
            onChange={(e) => this.setState({preptimeStr: e.target.value})}
            required={true}
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
          name="starttime"
          label="Starttid"
          component={MaskedInput}
          value={this.state.starttimeStr}
          onChange={(e) => this.setState({starttimeStr: e.target.value})}
          required={true}
          mask={[
            {
              length: 2,
              regexp: /^[0-1]*[0-9]$|^2[0-4]$/,
              placeholder: 'hh',
            },
            { fixed: ':' },
            {
              length: 2,
              regexp: /^[0-5]*[0-9]$/,
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
            required={true}
            mask={[
              {
                length: 1,
                regexp: /^1[0-2]$|^[0-9]$/,
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
        <Button type="reset" primary label="Cancel" />
          <Button type="submit" primary label="Submit" />
        </Form>
      </Box>
  )
  }
}


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
