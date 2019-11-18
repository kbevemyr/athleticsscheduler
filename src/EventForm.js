import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Box, Form, FormField, Select, MaskedInput, Button, Text } from 'grommet';
import { updateEvent } from './store/actions';
import { getEvent, timeStrToMinutes, presentTime, getEmptyEvent } from './misc';


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
      grentypeValue: currentEvent.grentype,

      dOptions: this.props.comp.days.map(x => x.name),
      aOptions: this.props.comp.arenas.map(x => x.name),
      cOptions: this.props.comp.classes.map(x => x.name),
      gOptions: this.props.comp.grenar.map(x => x.name),
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
        aOptions: this.props.comp.arenas.map(x => x.name),
        cOptions: this.props.comp.classes.map(x => x.name),
        gOptions: this.props.comp.grenar.map(x => x.name),
        gtOptions: [ "run", "tech" ],
      };
    }
  };


  componentDidMount() {
    var theEvent = undefined;
    if (this.props.id !== undefined) {
      theEvent = getEvent(this.props.comp, this.props.id);
    } else if (this.props.match.params.id !== undefined) {
      theEvent = getEvent(this.props.comp, this.props.match.params.id);
    }

    console.log("EventData eventdata "+JSON.stringify(theEvent));

    if (theEvent != null) {
      this.setState({
        editId: theEvent.id,
        dayValue: theEvent.day,
        arenaValue: theEvent.arena,
        starttimeStr: presentTime(theEvent.starttime),
        durationStr: presentTime(theEvent.duration),
        preptimeStr: presentTime(theEvent.preptime),
        classValue: theEvent.class,
        grenValue: theEvent.gren,
        grentypeValue: theEvent.grentype,

        dOptions: this.props.comp.days.map(x => x.name),
        aOptions: this.props.comp.arenas.map(x => x.name),
        cOptions: this.props.comp.classes.map(x => x.name),
        gOptions: this.props.comp.grenar.map(x => x.name),
        gtOptions: [ "run", "tech" ],
      });
    }
  }




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
      <Box pad="medium" background="light-3" width="30%">
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
            name="day"
            label="Dag"
          >
            <Select
              options = {this.props.comp.days}
              onChange = {({option}) => this.setState({ dayValue: option })}
              >
              {option => option.name}
            </Select>
          </FormField>
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
