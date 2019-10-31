import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Text, Form, FormField, Button, Box } from 'grommet';

import DayTable from './DayTable';
import ArenaTable from './ArenaTable';

//import { getEvent } from './misc';

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
        <Text>{this.state.name}</Text>
        <Form>
          <FormField name="name" label="Name" />
          <Button type="submit" primary label="Submit" />
          <FormField name="key" label="Key" />
          <Button type="submit" primary label="Submit" />
          <FormField name="version" label="Version" />
          <Button type="submit" primary label="Submit" />
        </Form>

        <DayTable />
        <ArenaTable />
      </Box>
);
  }
}

/*
<Form>
  <FormField name="name" label="Name" />
  <Button type="submit" primary label="Submit" />
  <FormField name="key" label="Key" />
  <Button type="submit" primary label="Submit" />
  <FormField name="version" label="Version" />
  <Button type="submit" primary label="Submit" />
  <FormField name="globalid" label="Global Id" />
  <Button type="submit" primary label="Submit" />
</Form>

*/


  // Store handling

  const mapStateToProps = state => ({
    comp: state.competition,
  });

  const mapDispatchToProps = dispatch => ({
      setXXXColor: (c) => {
        //dispatch(setXXX(c));
    },
  });

  const SettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Settings);

  export default withRouter(SettingsContainer);
