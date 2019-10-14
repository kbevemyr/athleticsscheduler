import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';
import CompDay from './CompDay';

import { Tabs, Tab, Box, Text } from 'grommet';

import PrintButton from './PrintButton';
import Page from './Page';

class Competition extends Component {
  constructor(props) {
    super(props);
    this.props.getTheCompetitionData('local');
    this.state = {
      state: "dev",
    }
  }

  render() {
    return (
      <Box key="competitionschema" pad="small">
        <Box>
          <Text>{this.props.name} ({this.props.compID})</Text>
          Schema Version: {this.props.version}
        </Box>

        <PrintButton id={"pdfpage"} label={"Print PDF page"} />

        <Tabs justify="start">
          {this.props.days.map(x =>
            (
              <Tab key={"T."+x.id} title={x.name}>
                <Page id='pdfpage'>
                  <CompDay
                    key={x.id}
                    id={x.id}
                    name={x.name}
                  />
                </Page>
              </Tab>
            )
          )}
        </Tabs>
      </Box>
    );
  }
}

// Store handling

const mapStateToProps = state => ({
  compID: state.competition.key,
  name: state.competition.name,
  version: state.competition.version,
  days: state.competition.days,
});

const mapDispatchToProps = dispatch => ({
    getTheCompetitionData: (cid) => {
      //dispatch(getCompetitionData(cid));
    },
});

const CompetitionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Competition);

export default withRouter(CompetitionContainer);
