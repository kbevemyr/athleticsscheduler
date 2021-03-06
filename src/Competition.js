import React, {Component} from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';
import CompDay from './CompDay';
import ControlPanel from './ControlPanel';
import EventDetails from './EventDetails';
import EventForm from './EventForm';

import { Box, Layer, Heading, Text } from 'grommet';

// Defines the area to generate pdf of a CompDay
import Page from './Page';

class Competition extends Component {
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
    this.setState({ sidePanelActive: false });
    this.props.history.goBack();
  }

  render() {
    const topMargin = { left: "0px", top: "10vh", right: "0px", bottom: "0px" };
    const modalState = this.props.location.pathname === "/overview" ? false: true;

    return (
      <Box direction="row">
          <Box flex={true}>
            <Page id='pdfpage' >
              <Heading level="3">{this.props.name}
              <Text weight="normal" size="medium" textAlign="end" alignSelf="stretch"> version ({this.props.version})</Text>
              </Heading>
              <CompDay />
            </Page>
          </Box>

          <Layer
            margin={topMargin}
            position="top-right"
            modal={ modalState }
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
              overflow="scroll"
            >
              <Switch>
                <Route exact path={this.props.match.path}>
                  <ControlPanel />
                </Route>
                <Route path={this.props.match.path+"/event/:id"}>
                  <EventDetails onClose={this.handleCloseSidePanel} />
                </Route>
                <Route path={this.props.match.path+"/form/:id"}>
                  <EventForm onClose={this.handleCloseSidePanel} />
                </Route>
              </Switch>
            </Box>
          </Layer>
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
