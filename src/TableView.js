import React, {Component} from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Text, Box, Layer, Button } from 'grommet';
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
    return (
      <Box>
        <Link to={this.props.match.url+"/form/9999"}>
          <Button id="butAddEvent"
            plain={false}
            hoverIndicator
            icon={<Add />}
            onClick={this.handleOpenForm}
          />
        </Link>

        <Box direction='column' pad='medium' background="light-1">
          <Text weight="bold" >{this.state.name}</Text>
          <EventTable key="eventstable" onEditRow={this.handleOpenForm} />
        </Box>

        {this.state.sidePanelActive && (
          <Layer
            position="right"
            modal
            animation="slide"
            onClickOutside={this.handleCloseForm}
            onEsc={this.handleCloseForm}
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
              >
              <Switch>
                <Route path={this.props.match.path+"/form/:id"}>
                  <EventForm onClose={this.handleCloseForm}/>
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
