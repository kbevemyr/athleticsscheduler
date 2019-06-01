import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';
import Competition from './Competition';
import { getCompetitionData, saveCompetitionData } from './store/actions';

import { Grommet, grommet, Box, Menu } from 'grommet';
import { Menu as MenuIcon } from 'grommet-icons';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSetCompDataEvent = this.handleSetCompDataEvent.bind(this);
    this.handleSaveCompDataEvent = this.handleSaveCompDataEvent.bind(this);
  }

  handleSetCompDataEvent(key) {
    this.props.getTheCompetitionData(key);
  }

  handleSaveCompDataEvent(key) {
    this.props.saveTheCompetitionData(key, this.props.comp);
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
          <strong>Athletics Scheduler</strong>
          <Menu
            dropAlign={{ top: 'top', right: 'right' }}
            items={[
                    { label: '2017', onClick: () => { this.handleSetCompDataEvent('2017') }},
                    { label: '2018', onClick: () => { this.handleSetCompDataEvent('2018') }},
                    { label: '2019', onClick: () => { this.handleSetCompDataEvent('2019') }},
                    { label: 'test', onClick: () => { this.handleSetCompDataEvent('test') }},
                    { label: 'save', onClick: () => { this.handleSaveCompDataEvent('test') }},
                   ]}
            icon={<MenuIcon color='white' />}
            />
        </Box>
        <Competition key="mycomp"/>
        <Box tag='footer'
             direction='row'
             justify='end'
             pad='medium'
             border={{side: 'top'}}
             flex={false}
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
  name: state.competition.name,
  version: state.competition.version,
  days: state.competition.days,
  comp: state.competition,
});

const mapDispatchToProps = dispatch => ({
    getTheCompetitionData: (cid) => {
      dispatch(getCompetitionData(cid));
    },
    saveTheCompetitionData: (key, comp) => {
      dispatch(saveCompetitionData(key, comp))
    },
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default withRouter(AppContainer);
//export default App;
