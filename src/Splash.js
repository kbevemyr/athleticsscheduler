import React, {Component} from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';
import CompetitionAdm from './CompetitionAdm';

import { Box, Layer } from 'grommet';
import { Cloud } from 'grommet-icons';


class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidePanelActive: undefined,
    }
  }

  handleOpenSidePanel = (e) => {
    console.log("handleOpenSidePanel");
    this.setState({ sidePanelActive: true });
  }

  handleCloseSidePanel = (e) => {
    console.log("handleCloseSidePanel");
    this.setState({ sidePanelActive: undefined });
    this.props.history.goBack();
  }

  render() {
    const topMargin = { left: "0px", top: "10vh", right: "0px", bottom: "0px" };

    return (
      <Box direction="row">
          <Box flex={true}>
            <Cloud size='large' />
          </Box>

          {(this.state.sidePanelActive || this.props.adm) && (
            <Layer
              margin={topMargin}
              position="top-right"
              modal={false}
              animation="slide"
              onClickOutside={this.handleCloseSidePanel}
              onEsc={this.handleCloseSidePanel}
            >
              <Box
                  background = {{
                    color: "#D1C1FF",
                    dark: false,
                    opacity: "medium",
                  }}
                  border={{
                    color: "#7553D3",
                    size: "medium",
                    side: "all",
                  }}
                  animation="slideLeft"
                  elevation="medium"
                  margin="none"
                  pad="small"
                  gap="xsmall"
                >
                  <Switch>
                    <Route path={this.props.match.path}>
                      <CompetitionAdm />
                    </Route>
                  </Switch>
                </Box>
              </Layer>
            )}
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
