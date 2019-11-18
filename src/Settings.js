import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { updateSettings } from './store/actions';

import { Heading, Text, Form, FormField, TextInput, Button, Box } from 'grommet';

import NameTable from './NameTable';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Competition Settings",
      nameVal: this.props.name,
      versionVal: this.props.version,
    };
  }

  handleSubmit(event) {
    console.log("handleUpdateSettings");
    var update = {
      name: this.state.nameVal,
      version: this.state.versionVal,
    };
    console.log("Submit in SettingsForm: ", update);
    this.props.updateTheSettings(update);
    //this.props.history.goBack();
  }

  handleCancel(event) {
    //this.props.history.goBack();
  }

  render() {
    return (
      <Box>
        <Heading level={1}>{this.props.name}</Heading>
        <Box
          key='settingsarea'
          pad='medium'
          gap='medium'
          justify='between'
          direction='row-responsive'
          align='start'
          flex={true}
          >

          <Form onSubmit={this.handleUpdateSettings} onReset={this.handleCancel}>
            <FormField name="name" label="Name">
              <TextInput
                value = {this.state.nameVal}
                placeholder = {this.props.name}
                onChange = {(e) => this.setState({nameVal: e.value})}
                >
              </TextInput>
            </FormField>

            <Text>{this.props.key}</Text>

            <FormField name="version" label="Version">
              <TextInput
                value = {this.state.versionVal}
                onChange = {(e) => this.setState({versionVal: e.value})}
                >
              </TextInput>
            </FormField>

            <Button type="reset" primary label="Cancel" />
            <Button type="submit" primary label="Submit" />
          </Form>

          <Box
            pad='none'
            gap='medium'
            justify='between'
            direction='row-responsive'
            align='start'
            basis='3/4'
            >
            <NameTable key='daytable' type='days' label="Dag"/>
            <NameTable key='arenatable' type='arenas' label="Arenor"/>
            <NameTable key='classtable' type='classes' label="Klasser"/>
            <NameTable key='grentable' type='grenar' label="Grenar"/>
          </Box>
        </Box>
      </Box>
);
  }
}

/*
<Grid
  rows={['small','small']}
  columns={['medium', 'small','medium']}
  gap='small'
  areas={[
    {name: 'misc',          start: [0, 0], end:[0, 1]},
    {name: 'days',          start: [1, 1], end:[1, 1]},
    {name: 'arenas',        start: [2, 1], end:[2, 1]},
  ]}
>
*/


  // Store handling

  const mapStateToProps = state => ({
    name: state.competition.name,
    key: state.competition.key,
    version: state.competition.version,
  });

  const mapDispatchToProps = dispatch => ({
      updateTheSettings: (d) => {
        dispatch(updateSettings(d));
    },
  });

  const SettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Settings);

  export default withRouter(SettingsContainer);
