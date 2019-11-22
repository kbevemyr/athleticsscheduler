import React, {Component} from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';
//import './AthleticsScheduler_logo.jpg';
import Splash from './Splash';
import Competition from './Competition';
import TableView from './TableView';
import CompetitionAdm from './CompetitionAdm';

import { Grommet, grommet, Box, Anchor } from 'grommet';
import { Table, Columns, SettingsOption } from 'grommet-icons';

class App extends Component {

  render() {
    return (
      <Grommet theme={grommet} full={true} >
        <Box
          tag='header'
          background='brand'
          pad='small'
          elevation='small'
          justify='between'
          direction='row'
          align='center'
          flex={false}
        >
          <Box direction='row'>
            <Anchor href="#tables" icon={<Table />} />
            <Anchor href="#overview" icon={<Columns />} />
          </Box>

          <Anchor href="#">
            <strong>Athletics Scheduler</strong>
          </Anchor>

          <Box direction='row'>
            <Anchor href="#adm" icon={<SettingsOption />} />
          </Box>
        </Box>

        <Box direction="row-responsive">
          <Box id="view" flex={true}>
            <Switch>
              <Route path="/" exact component={Splash} />
              <Route path="/splash" render={() => <Splash />} />
              <Route path="/overview" component={Competition} />
              <Route path="/tables" component={TableView} />
              <Route path="/adm" component={CompetitionAdm} />
            </Switch>
          </Box>
        </Box>

        <Box tag='footer'
             direction='row'
             justify='start'
             pad='medium'
             flex={false}
             background={{color: "#513F82", dark: true}}
        >
          <i>GT16 App Collection</i>
        </Box>
      </Grommet>
    );
  }
}

// Store handling

const mapStateToProps = state => ({
  compID: state.competition.key,
});

const mapDispatchToProps = dispatch => ({
    setTheData: (cid) => {
      //dispatch(action(cid));
    },
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default withRouter(AppContainer);
//export default App;
