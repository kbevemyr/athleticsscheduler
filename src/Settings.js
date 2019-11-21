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

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeVersion = this.handleChangeVersion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChangeName(event) {
    console.log("handleChangeName");
    this.setState({nameVal: event.target.value});
  }

  handleChangeVersion(event) {
    console.log("handleChangeVersion");
    this.setState({versionVal: event.target.value});
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

          <Form onSubmit={this.handleSubmit} onReset={this.handleCancel}>
            <FormField htmlFor="comp-name" label="Name">
              <TextInput
                id='comp-name'
                value = {this.state.nameVal}
                onChange = {this.handleChangeName}
                >
              </TextInput>
            </FormField>

            <FormField htmlFor="comp-version" label="Version">
              <TextInput
                id='comp-version'
                value = {this.state.versionVal}
                onChange = {this.handleChangeVersion}
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


  // Store handling

  const mapStateToProps = state => ({
    name: state.competition.name,
    compKey: state.competition.key,
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
