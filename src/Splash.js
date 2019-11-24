import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';

import { Box, Image } from 'grommet';


class Splash extends Component {

  render() {
    return (
      <Box direction="row">
          <Box flex={true} pad="none">
            <Image
              fit="cover"
              src="images/people-doing-marathon-618612.jpg"
            />
          </Box>
      </Box>
    );
  }
}


// Store handling

const mapStateToProps = state => ({
  name: state.competition.name,
});

const mapDispatchToProps = dispatch => ({
    getTheCompetitionData: (cid) => {
      //dispatch(getCompetitionData(cid));
    },
});

const SplashContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);

export default withRouter(SplashContainer);
