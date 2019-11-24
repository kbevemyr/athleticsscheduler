import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';

import { getCompetitionData } from './store/actions';

import { Box, Heading, Menu } from 'grommet';
import { CloudDownload } from 'grommet-icons';


class OpenDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recent: undefined,
    }
    this.handleSetCompDataEvent = this.handleSetCompDataEvent.bind(this);
  }

  handleSetCompDataEvent(key) {
    this.props.getTheCompetitionData(key);
    //this.props.history.push("/overview");
    this.props.onClose();
  }

  render() {
    return (
      <Box>
        <CloudDownload />
        <Heading level="3">Open schedule</Heading>

        <Menu label="Local test data"
          dropAlign={{ top: 'top', right: 'right' }}
          items={[
                  { label: 'local 2017', onClick: () => { this.handleSetCompDataEvent('2017') }},
                  { label: 'local 2018', onClick: () => { this.handleSetCompDataEvent('2018') }},
                  { label: 'local 2019', onClick: () => { this.handleSetCompDataEvent('2019') }},
                  { label: 'local 2019 Indoor ver1', onClick: () => { this.handleSetCompDataEvent('2019indoorv1') }},
                  { label: 'local 2019 Indoor ver2', onClick: () => { this.handleSetCompDataEvent('2019indoorv2') }},
                  { label: 'server test', onClick: () => { this.handleSetCompDataEvent('test') }},
                 ]}
          />

      </Box>
    );
  }
}

/*
        <Button label="Latest" />
        <Menu label="Recent"
          dropAlign={{ top: 'top', right: 'right'}}
          items={this.state.recent}
        />
*/

// Store handling

const mapStateToProps = state => ({
  key: state.competition.key,
});

const mapDispatchToProps = dispatch => ({
    getTheCompetitionData: (cid) => {
      dispatch(getCompetitionData(cid));
    },
});

const OpenDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenDialog);

export default withRouter(OpenDialogContainer);
