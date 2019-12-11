import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';

import { templateKeys } from './store/templates';
import { localKeys } from './store/MOCKdata';
import { getKeys, getCompetitionData } from './store/actions';

import { Box, Heading, Menu } from 'grommet';
import { CloudDownload } from 'grommet-icons';

function renderKeyMenuItem(key, action) {
  let item = {label: key, onClick: action};
  return(item);
}

class OpenDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recent: undefined,
    }
    this.props.getTheKeys();
    this.handleSetCompDataEvent = this.handleSetCompDataEvent.bind(this);
  }

  handleSetCompDataEvent(datastore, key) {
    this.props.getTheCompetitionData(datastore, key);
    //this.props.history.push("/overview");
    this.props.onClose();
  }

  render() {
    let serverKeyItems =
      this.props.keys.map(key => {
        return renderKeyMenuItem(key, () => this.handleSetCompDataEvent('server', key));
      });
    let localKeyItems =
      localKeys.map(key => {
        return renderKeyMenuItem(key,  () => this.handleSetCompDataEvent('local', key));
      });
    let templateKeyItems =
      templateKeys.map(key => {
        return renderKeyMenuItem(key, () => this.handleSetCompDataEvent('template', key));
      });

    return (
      <Box>
        <CloudDownload />
        <Heading level="3">Open schedule</Heading>

        <Menu label="Localt test data"
          dropAlign={{ top: 'top', right: 'right' }}
          items={localKeyItems}
          />

        <Menu label="Schemamallar"
          dropAlign={{ top: 'top', right: 'right' }}
          items={templateKeyItems}
          />

        <Menu label="Scheman från server"
            dropAlign={{ top: 'top', right: 'right'}}
            items={serverKeyItems}
          />

      </Box>
    );
  }
}

// Store handling

const mapStateToProps = state => ({
  key: state.competition.key,
  keys: state.keys,
});

const mapDispatchToProps = dispatch => ({
    getTheCompetitionData: (datastore, cid) => {
      dispatch(getCompetitionData(datastore, cid));
    },
    getTheKeys: () => {
      dispatch(getKeys());
    },
});

const OpenDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenDialog);

export default withRouter(OpenDialogContainer);
