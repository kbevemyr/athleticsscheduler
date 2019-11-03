import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Heading, Text, Form, FormField, Button, Box } from 'grommet';

import NameTable from './NameTable';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Competition Settings",
    };
  }

  render() {
    return (
      <Box>
        <Heading level={1}>{this.state.name}</Heading>
        <Box
          tag='settingsarea'
          pad='medium'
          gap='medium'
          justify='between'
          direction='row-responsive'
          align='start'
          flex={false}
          >

          <Form>
            <FormField name="name" label="Name">
              <Text>{this.props.name}</Text>
            </FormField>

            <FormField name="compID" label="CompID">
              <Text>{this.props.compID}</Text>
            </FormField>

            <FormField name="version" label="Version">
              <Text>{this.props.version}</Text>
            </FormField>

            <Button type="submit" primary label="Submit" />
          </Form>

          <Box
            pad='medium'
            gap='medium'
            justify='between'
            direction='row-responsive'
            align='start'
            basis='3/4'
            >
            <NameTable key='daytable' type='day' />
            <NameTable key='arenatable' type='arena' />
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
    compID: state.competition.key,
    version: state.competition.version,
  });

  const mapDispatchToProps = dispatch => ({
      addTheDay: (d) => {
        dispatch();
    },
  });

  const SettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Settings);

  export default withRouter(SettingsContainer);
