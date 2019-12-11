import React, {Component} from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Text, Heading, Box, Layer, Button } from 'grommet';
//import {ChipSet, Chip} from '@material/react-chips';
import { Add } from 'grommet-icons';

import EventTable from './EventTable';
import EventForm from './EventForm';

class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Table View",
      sidePanelActive: undefined,
    };
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
      <Box>
        <Link to={this.props.match.url+"/form/9999"}>
          <Button id="butAddEvent"
            plain={false}
            hoverIndicator
            icon={<Add />}
            onClick={this.handleOpenSidePanel}
          />
        </Link>

        <Box direction='column' pad='medium' background="light-1">
          <Heading level="3">{this.props.name}
            <Text weight="normal" size="medium" textAlign="end" alignSelf="stretch"> version ({this.props.version})</Text>
          </Heading>
          <EventTable key="eventstable" onEditRow={this.handleOpenSidePanel} />
        </Box>

        {this.state.sidePanelActive && (
          <Layer
            margin={topMargin}
            position="top-right"
            modal
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
                elevation="medium"
                margin="none"
                pad="none"
                gap="xsmall"
                overflow="scroll"
              >
              <Switch>
                <Route path={this.props.match.path+"/form/:id"}>
                  <EventForm onClose={this.handleCloseSidePanel}/>
                </Route>
              </Switch>
            </Box>
          </Layer>
        )}
      </Box>
    )
  }
}

  // Store handling

  const mapStateToProps = state => ({
    comp: state.competition,
    name: state.competition.name,
    version: state.competition.version,
    id: state.activeID,
  });

  const mapDispatchToProps = dispatch => ({
      setXXXColor: (c) => {
        //dispatch(setXXX(c));
    },
  });

  const TableViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(TableView);

  export default withRouter(TableViewContainer);
