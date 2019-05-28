import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Form, FormField, Select, MaskedInput, Button } from 'grommet';

const cOPTIONS = ['F13', 'P13', 'K'];

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayValue: "",
      arenaValue: "",
      starttimeValue: "",
      durationValue: "",
      classValue: "",
      classOptions: cOPTIONS,
      grenValue: "",
    };
  }

  render() {
    let sValue = this.state.starttimeValue;
    let dValue = this.state.durationValue;

    // events
    return (
      <Form>
        id
        <FormField name="day" label="Day">
          <Select
            options={['lördag', 'söndag']}
            value={this.state.dayValue}
            onChange={(event) => this.setState({
                dayValue: event.value,
              })}
          />
        </FormField>
        <FormField name="arena" label="Arena">
          <Select
            options={['Kula', 'Löpning', 'Längd']}
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
            Change={(event) => this.setState({
                classValue: event.value,
                classOptions: cOPTIONS,
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
        <Button type="submit" primary label="Submit" onClick={(e) => console.log("got submit")}/>
      </Form>
  )
  }
}
/*
onSearch={(txt) => {
  const regexp = new RegExp(txt, 'i');
  this.setState({ classOptions: cOPTIONS.filter(o => o.match(regexp))});
}}
on
*/

  // Store handling

  const mapStateToProps = state => ({
    comp: state.competition,
    events: state.competition.events,
  });

  const mapDispatchToProps = dispatch => ({
      setXXXColor: (c) => {
        //dispatch(setXXX(c));
    },
  });

  const EventFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventForm);

  export default withRouter(EventFormContainer);
