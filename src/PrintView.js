import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Box, Heading, Form, FormField, Select, Button } from 'grommet';

class PrintView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Print page",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit () {

  }

  render() {
    return (
      <Box>
        <Heading level={1}>{this.state.name}</Heading>
        <Form onSubmit={this.handleSubmit}>
          <FormField
            name="printDay"
            label="Day to print"
            onChange = {(e) => this.setState({dayValue: e.value})}
            component={Select}
            options={this.props.days.map(x => x.id)}
            required={true}
          />

          <Button type="submit" primary label="Submit" />
        </Form>
        <Box id="printarea">
        </Box>
      </Box>
    );
  }
}

  // Store handling

  const mapStateToProps = state => ({
    name: state.competition.name,
    compID: state.competition.key,
    version: state.competition.version,
    days: state.competition.days,
  });

  const mapDispatchToProps = dispatch => ({
      addTheDay: (d) => {
        dispatch();
    },
  });

  const PrintViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PrintView);

  export default withRouter(PrintViewContainer);
