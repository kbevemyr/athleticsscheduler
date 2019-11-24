import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { updateSettings } from './store/actions';

import { Heading, TextInput, Button, Anchor, Box, Text } from 'grommet';
import { Save } from 'grommet-icons';

import NameTable from './NameTable';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameVal: this.props.name,
      onEdit: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
  }

  handleChange(event) {
    console.log("handleChange");
    this.setState({nameVal: event.target.value});
  }

  handleChangeName(event) {
    console.log("handleChangeName");
    var update = {
      name: this.state.nameVal,
    };
    this.props.updateTheSettings(update);
    this.setState({onEdit: false});
  }


  render() {

    return (
      <Box>
        <Heading level={2} margin='small'>Tävlingsinställningar</Heading>
        <Box
          key='settingsarea'
          pad='medium'
          gap='medium'
          justify='between'
          direction='row-responsive'
          align='start'
          flex={true}
          >

          <Box gap='small' pad='small'>
            <Heading level={4} margin='xsmall'>Tävlingsnamn</Heading>
            {this.state.onEdit ?
              <Box direction="row">
                <TextInput
                  value = {this.state.nameVal}
                  onChange={this.handleChange}
                  />
                <Button icon={<Save />} onClick={this.handleChangeName}/>
              </Box>
            :
              <Anchor
                label={this.props.name}
                onClick={e => this.setState({onEdit: true, nameVal: this.props.name})}
              />
            }
            <Text>{this.props.version}</Text>
          </Box>

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
