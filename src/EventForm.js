import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Box, Form, FormField, Select, MaskedInput, Button, Text } from 'grommet';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayValue: "",
      arenaValue: "",
      starttimeValue: "",
      durationValue: "",
      classValue: "",
      grenValue: "",
    };
  }

  render() {
    let sValue = this.state.starttimeValue;
    let dValue = this.state.durationValue;
    let dOptions = this.props.comp.days.map(x => x.name);
    let cOptions = this.props.comp.arenas.map(x => x.name);

    // events
    return (
      <Box pad="medium" background="light-3">
        <Text>Edit Event {this.props.id}</Text>
        <Form onSubmit={({ value }) => console.log("Submit: ", value)}>
          <FormField name="day" label="Day">
            <Select
              options={dOptions}
              value={this.state.dayValue}
              onChange={(event) => this.setState({
                  dayValue: event.value,
                })}
            />
          </FormField>
          <FormField name="arena" label="Arena">
            <Select
              options={cOptions}
              value={this.state.arenaValue}
              onChange={(event) => this.setState({
                  arenaValue: event.value,
                })}
            />
          </FormField>
          <FormField name="starttime" label="Start Time">
            <MaskedInput
              mask={[
                {
                  length: [1, 2],
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
              value={sValue}
              onChange={event => this.setState({ starttimeValue: event.target.value })}
            />
          </FormField>
          <FormField name="duration" label="Duration">
            <MaskedInput
              mask={[
                {
                  length: [1, 2],
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
              value={dValue}
              onChange={event => this.setState({ durationValue: event.target.value })}
            />
          </FormField>
          <FormField name="class" label="Class">
            <Select
              options={this.state.classOptions}
              value={this.state.classValue}
              onChange={(event) => this.setState({
                  classValue: event.value,
                  classOptions: cOptions,
                })}
            />
          </FormField>
          <FormField name="gren" label="Gren">
            <Select
              options={['kula', 'längd', 'löpning']}
              value={this.state.grenValue}
              onChange={(event) => this.setState({
                  grenValue: event.value,
                })}
            />
          </FormField>
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
        //dispatch(updateEvent(e));
    },
  });

  const EventFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventForm);

  export default withRouter(EventFormContainer);
