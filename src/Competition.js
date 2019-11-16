import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';
import CompDay from './CompDay';
import ControlPanel from './ControlPanel';

import { Box } from 'grommet';

// First atempt to render pdf of a CompDay
import Page from './Page';

class Competition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "dev",
    }
  }

  render() {
    return (
      <Box direction="row">
          <Box flex={true}>
            <Page id='pdfpage' >
              <CompDay />
            </Page>
          </Box>
          <Box>
            <ControlPanel />
          </Box>
      </Box>
    );
  }
}


// Store handling

const mapStateToProps = state => ({
  name: state.competition.name,
  version: state.competition.version,
});

const mapDispatchToProps = dispatch => ({
    getTheCompetitionData: (cid) => {
      //dispatch(getCompetitionData(cid));
    },
});

const CompetitionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Competition);

export default withRouter(CompetitionContainer);
