import React, {Component} from 'react';
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Settings from './Settings';
import OpenDialog from './OpenDialog';
import SaveDialog from './SaveDialog';

import { newCompetitionData } from './store/actions';

import { Box, Button, Layer } from 'grommet';
import { CloudDownload, CloudUpload, New } from 'grommet-icons';

class CompetitionAdm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidePanelActive: undefined,
    };

    this.handleOpenSidePanel = this.handleOpenSidePanel.bind(this);
    this.handleCloseSidePanel = this.handleCloseSidePanel.bind(this);
    this.handleNewCompDataEvent = this.handleNewCompDataEvent.bind(this);
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

  handleNewCompDataEvent(key) {
    this.props.saveANewCompetitionData();
    //this.props.history.push("/");
  }

  render() {
    const topMargin = { left: "0px", top: "10vh", right: "0px", bottom: "0px" };
    const buttonSize = 'large';

    return (
      <Box>
        <Box direction='row'>
          <Link to={this.props.match.url+"/open"}>
            <Button
              icon={<CloudDownload size={buttonSize} />}
              onClick={this.handleOpenSidePanel}
            />
          </Link>
          <Link to={this.props.match.url+"/save"}>
            <Button
              icon={<CloudUpload size={buttonSize} />}
              onClick={this.handleOpenSidePanel}
            />
          </Link>
          <Button
            icon={<New size={buttonSize} />}
            onClick={this.handleNewCompDataEvent}
          />
        </Box>
        <Settings />

      {this.state.sidePanelActive && (
        <Layer
          margin={topMargin}
          position="top-right"
          modal={true}
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
                <Route path={this.props.match.path+"/open"} >
                  <OpenDialog />
                </Route>
                <Route path={this.props.match.path+"/save"} >
                  <SaveDialog />
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
  compID: state.competition.key,
  comp: state.competition,
});

const mapDispatchToProps = dispatch => ({
    saveANewCompetitionData: () => {
      dispatch(newCompetitionData())
    },
});

const CompetitionAdmContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompetitionAdm);

export default withRouter(CompetitionAdmContainer);
//export default CompetitionAdm;
