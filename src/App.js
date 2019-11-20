import React, {Component} from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';
import Splash from './Splash';
import Competition from './Competition';
import TableView from './TableView';
import Settings from './Settings';
import { getCompetitionData, saveCompetitionData, newCompetitionData } from './store/actions';

import { Grommet, grommet, Box, Anchor } from 'grommet';
import { Table, Columns, SettingsOption, Cloud } from 'grommet-icons';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSetCompDataEvent = this.handleSetCompDataEvent.bind(this);
    this.handleSaveCompDataEvent = this.handleSaveCompDataEvent.bind(this);
    this.handleNewCompDataEvent = this.handleNewCompDataEvent.bind(this);
  }

  handleSetCompDataEvent(key) {
    this.props.getTheCompetitionData(key);
    this.props.history.push("/overview");
  }

  handleSaveCompDataEvent(key) {
    this.props.saveTheCompetitionData(key, this.props.comp);
  }

  handleNewCompDataEvent(key) {
    this.props.saveANewCompetitionData();
    this.props.history.push("/settings");
  }

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
            <Anchor href="#settings" icon={<SettingsOption />} />
            <Anchor href="#splash/adm" icon={<Cloud />} />
          </Box>
        </Box>

        <Box direction="row-responsive">
          <Box id="view" flex={true}>
            <Switch>
              <Route path="/" exact component={Splash} />
              <Route path="/splash" render={() => <Splash adm={true} />} />
              <Route path="/overview" component={Competition} />
              <Route path="/tables" component={TableView} />
              <Route path="/settings" component={Settings} />
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
    getTheCompetitionData: (cid) => {
      dispatch(getCompetitionData(cid));
    },
    saveTheCompetitionData: (key, comp) => {
      dispatch(saveCompetitionData(key, comp))
    },
    saveANewCompetitionData: () => {
      dispatch(newCompetitionData())
    },
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default withRouter(AppContainer);
//export default App;
