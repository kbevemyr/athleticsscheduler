import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';
import CompDay from './CompDay';

import { Tabs, Tab, Box, Text } from 'grommet';

class Competition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "dev",
    }
  }

  render() {
    return (
      <div>
        <Box>
          <Text>Competition: {this.props.name}</Text>
        </Box>
        <Tabs justify="start">
          {this.props.days.map(x =>
            (
              <Tab key={"T."+x.id} title={x.name}>
                  <CompDay key={x.id} id={x.id} name={x.name} starttime={x.starttime} />
              </Tab>
          )
          )}
        </Tabs>
      </div>
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
    getTheFilter: (cid) => {
      console.log("implement dispatch(getCompetitionData(cid)");
  },
});

const CompetitionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Competition);

export default withRouter(CompetitionContainer);

//export default Competition;
