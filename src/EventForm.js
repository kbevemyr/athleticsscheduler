import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Box, Form, FormField, Select, MaskedInput, Button, Text } from 'grommet';
import { updateEvent } from './store/actions';
import { getEvent, timeStrToMinutes, presentTime, getEmptyEvent, getName } from './misc';


function populateValues(x, comp) {
  const stateObj = {
    editId: x.id,
    dayValue: {id: x.day, name: getName(x.day, comp, 'days')},
    arenaValue: {id: x.arena, name: getName(x.arena, comp, 'arenas')},
    starttimeStr: presentTime(x.starttime),
    durationStr: presentTime(x.duration),
    preptimeStr: presentTime(x.preptime),
    classValue: {id: x.class, name: getName(x.class, comp, 'classes')},
    grenValue: {id: x.gren, name: getName(x.gren, comp, 'grenar')},
    grentypeValue: x.grentype,

    gtOptions: [ "run", "tech" ],
  };
  return (stateObj);
}

class EventForm extends Component {

  constructor(props) {
    super(props);

    let currentEvent = getEmptyEvent();
    this.state = populateValues(currentEvent, this.props.comp);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.handleChangeGren = this.handleChangeGren.bind(this);
    this.handleChangeDay = this.handleChangeDay.bind(this);
    this.handleChangeArena = this.handleChangeArena.bind(this);
    this.handleChangeGrentype = this.handleChangeGrentype.bind(this);
  };


  componentDidMount() {
    var theEvent = undefined;
    if (this.props.id !== undefined) {
      theEvent = getEvent(this.props.comp, this.props.id);
    } else if (this.props.match.params.id !== undefined) {
      theEvent = getEvent(this.props.comp, this.props.match.params.id);
    }

    console.log("EventData "+JSON.stringify(theEvent));

    if (theEvent != null) {
      let newState = populateValues(theEvent, this.props.comp);
      console.log(newState);
      this.setState(newState);
    }
  }


  handleSubmit(event) {
    console.log("State: ",this.state);
    var update = {
      id: this.state.editId,
      day: this.state.dayValue.id,
      arena: this.state.arenaValue.id,
      starttime: timeStrToMinutes(this.state.starttimeStr)+"",
      duration: timeStrToMinutes(this.state.durationStr)+"",
      preptime: timeStrToMinutes(this.state.preptimeStr)+"",
      class: this.state.classValue.id,
      gren: this.state.grenValue.id,
      grentype: this.state.grentypeValue,
    };
    console.log("Submit in EventForm: ", update);
    this.props.updateTheEvent(update);
    this.props.onClose();
  }

  handleCancel(event) {
    this.props.onClose();
  }

  handleChangeClass(event) {
    let option = event.option;
    //console.log("handleChangeClass");
    //console.log(event);
    this.setState({ classValue: option });
  }
  handleChangeGren(event) {
    let option = event.option;
    this.setState({ grenValue: option });
  }
  handleChangeDay(event) {
    let option = event.option;
    this.setState({ dayValue: option });
  }
  handleChangeArena(event) {
    let option = event.option;
    this.setState({ arenaValue: option });
  }
  handleChangeGrentype(event) {
    let option = event.option;
    this.setState({ grentypeValue: option });
  }

  render() {

    return (
      <Box pad="medium" background="light-3">
        <Text weight="bold">Edit Event {this.state.editId}</Text>
        <Form onSubmit={this.handleSubmit} onReset={this.handleCancel}>
          <FormField
            htmlFor="comp-class"
            label="Klass"
          >
            <Select
              id="comp-class"
              value={this.state.classValue.name}
              options = {this.props.comp.classes}
              onChange = {this.handleChangeClass}
              required={true}
              >
              {option => option.name}
            </Select>
          </FormField>

          <FormField
            htmlFor="comp-gren"
            label="Gren"
          >
            <Select
              id="comp-gren"
              value={this.state.grenValue.name}
              options = {this.props.comp.grenar}
              onChange = {this.handleChangeGren}
              required={true}
              >
              {option => option.name}
            </Select>
          </FormField>

          <FormField
            htmlFor="comp-grentype"
            label="Grentyp"
          >
            <Select
              id="comp-grentype"
              value={this.state.grentypeValue}
              options = {this.state.gtOptions}
              onChange = {this.handleChangeGrentype}
              required={true}
              >
            </Select>
          </FormField>

          <FormField
            htmlFor="comp-day"
            label="Dag"
          >
            <Select
              id="comp-day"
              value={this.state.dayValue.name}
              options = {this.props.comp.days}
              onChange = {this.handleChangeDay}
              required={true}
              >
              {option => option.name}
            </Select>
          </FormField>

          <FormField
            htmlFor="comp-arena"
            label="Arena"
          >
            <Select
              id="comp-arena"
              value={this.state.arenaValue.name}
              options = {this.props.comp.arenas}
              onChange = {this.handleChangeArena}
              required={true}
              >
              {option => option.name}
            </Select>
          </FormField>

          <FormField
            htmlFor="comp-preptime"
            label="Ställtid"
          >
            <MaskedInput
              id="comp-preptime"
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
        </FormField>

        <FormField
          htmlFor="comp-starttime"
          label="Starttid"
          >
            <MaskedInput
              id="comp-starttime"
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
          </FormField>

          <FormField
            htmlFor="comp-duration"
            label="Duration"
            >
            <MaskedInput
              id="comp-duration"
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
        </FormField>
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
