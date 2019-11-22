import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';

import { saveCompetitionData } from './store/actions';

import { Box, Heading, TextInput, Button } from 'grommet';
import { CloudUpload } from 'grommet-icons';


class SaveDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      versionVal: "",
    }
    this.handleSaveCompDataEvent = this.handleSaveCompDataEvent.bind(this);
  }

  handleSaveCompDataEvent(key) {
    let version = this.state.versionVal;
    if(version !== "") {
      this.props.saveTheCompetitionData(key, this.props.comp);
    }
  }

  render() {
    return (
      <Box>
        <CloudUpload />
        <Heading weigth="2" >Save schedule</Heading>
        <Box>
          <TextInput
            placeholder="add a new version"
            value={this.state.versionVal}
            onChange={(e) => this.setState({versionVal: e.target.value})}
          />
          <Button label="Save test" onClick={ () => this.handleSaveCompDataEvent('test') } />
        </Box>
      </Box>
    );
  }
}


// Store handling

const mapStateToProps = state => ({
  comp: state.competition,
});

const mapDispatchToProps = dispatch => ({
      saveTheCompetitionData: (key, comp) => {
        dispatch(saveCompetitionData(key, comp))
      },
});

const SaveDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveDialog);

export default withRouter(SaveDialogContainer);
