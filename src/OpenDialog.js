import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';

import { getCompetitionData } from './store/actions';

import { Box, Text, Menu } from 'grommet';
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
        <Text>Open schedule</Text>

        <Menu label="Local test data"
          dropAlign={{ top: 'top', right: 'right' }}
          items={[
                  { label: 'local 2017', onClick: () => { this.handleSetCompDataEvent('2017') }},
                  { label: 'local 2018', onClick: () => { this.handleSetCompDataEvent('2018') }},
                  { label: 'local 2019', onClick: () => { this.handleSetCompDataEvent('2019') }},
                  { label: 'local 2019 Indoor', onClick: () => { this.handleSetCompDataEvent('2019indoor') }},
                  { label: 'server test', onClick: () => { this.handleSetCompDataEvent('test') }},
                 ]}
          />
        <Menu label="Recent"
          dropAlign={{ top: 'top', right: 'right'}}
          items={this.state.recent}
        />

      </Box>
    );
  }
}

/*
        <Button label="Latest" />
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
