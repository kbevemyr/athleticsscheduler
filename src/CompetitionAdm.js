import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { getCompetitionData, saveCompetitionData, newCompetitionData } from './store/actions';

import { Text, Box, Anchor, Menu } from 'grommet';
import { Cloud, Desktop } from 'grommet-icons';

class CompetitionAdm extends Component {
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
    this.props.history.push("/");
  }

  render() {
    return (
        <Box>
          <Text>Local static data</Text>
          <Menu
            dropAlign={{ top: 'top', right: 'right' }}
            items={[
                    { label: '2017', onClick: () => { this.handleSetCompDataEvent('2017') }},
                    { label: '2018', onClick: () => { this.handleSetCompDataEvent('2018') }},
                    { label: '2019', onClick: () => { this.handleSetCompDataEvent('2019') }},
                    { label: 'new', onClick: () => { this.handleNewCompDataEvent() }},
                   ]}
            />
          <Text>Server data</Text>
          <Box direction="row">

          </Box>
            <Menu
              dropAlign={{ top: 'top', right: 'right' }}
              items={[
                      { label: 'test', onClick: () => { this.handleSetCompDataEvent('test') }},
                      { label: 'save', onClick: () => { this.handleSaveCompDataEvent('test') }},
                      { label: 'new', onClick: () => { this.handleNewCompDataEvent() }},
                     ]}
              />
        </Box>
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

const CompetitionAdmContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompetitionAdm);

export default withRouter(CompetitionAdmContainer);
//export default CompetitionAdm;
