import React, {Component} from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';
import Competition from './Competition';
import TableView from './TableView';
import EventForm from './EventForm';
import EventDetails from './EventDetails';
import Settings from './Settings';
import { getCompetitionData, saveCompetitionData, newCompetitionData } from './store/actions';

import { Grommet, grommet, Box, Anchor, Menu } from 'grommet';
import { Menu as MenuIcon } from 'grommet-icons';
import { Table, Columns, SettingsOption } from 'grommet-icons';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSetCompDataEvent = this.handleSetCompDataEvent.bind(this);
    this.handleSaveCompDataEvent = this.handleSaveCompDataEvent.bind(this);
    this.handleNewCompDataEvent = this.handleNewCompDataEvent.bind(this);
  }

  handleSetCompDataEvent(key) {
    this.props.getTheCompetitionData(key);
  }

  handleSaveCompDataEvent(key) {
    this.props.saveTheCompetitionData(key, this.props.comp);
  }

  handleNewCompDataEvent(key) {
    this.props.saveANewCompetitionData();
    this.props.history.push("/");
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
            <Anchor href="#" icon={<Columns />} />
          </Box>

          <strong>Athletics Scheduler</strong>

          <Box direction='row'>
            <Anchor href="#settings" icon={<SettingsOption />} />
            <Menu
              dropAlign={{ top: 'top', right: 'right' }}
              items={[
                      { label: '2017', onClick: () => { this.handleSetCompDataEvent('2017') }},
                      { label: '2018', onClick: () => { this.handleSetCompDataEvent('2018') }},
                      { label: '2019', onClick: () => { this.handleSetCompDataEvent('2019') }},
                      { label: 'test', onClick: () => { this.handleSetCompDataEvent('test') }},
                      { label: 'save', onClick: () => { this.handleSaveCompDataEvent('test') }},
                      { label: 'new', onClick: () => { this.handleNewCompDataEvent() }},
                     ]}
              icon={<MenuIcon color='white' />}
              />
          </Box>
        </Box>

        <Switch>
          <Route path="/" exact component={Competition} />
          <Route path="/tables" component={TableView} />
          <Route path="/form/:id" component={EventForm} />
          <Route path="/event/:id" component={EventDetails} />
          <Route path="/settings" component={Settings} />
        </Switch>

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
