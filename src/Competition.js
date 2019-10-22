import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';
import CompDay from './CompDay';
import CollisionPanel from './CollisionPanel';

import { Grid, Tabs, Tab, Box, Text } from 'grommet';

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
      <Grid key="competitionschema"
        rows={['xsmall', 'auto']}
        columns={['auto', '1/4']}
        gap="small"
        areas={[
          { name: 'header', start: [0,0], end: [1,0] },
          { name: 'main', start: [0,1], end: [0,1] },
          { name: 'notes', start: [1,1], end: [1,1] },
        ]}
      >
        <Box gridArea='header'>
          <Text>{this.props.name} ({this.props.compID})</Text>
          Schema Version: {this.props.version}
          <PrintButton id={"pdfpage"} label={"Print PDF page"} />
        </Box>

        <Box gridArea='main' direction="row">
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

        <Box gridArea='notes'>
          <CollisionPanel />
        </Box>
      </Grid>
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
