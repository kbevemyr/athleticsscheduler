import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { getArenas, getArenaSize } from './misc';

import Arena from './Arena';
import Timeline from './Timeline';
import { Box } from 'grommet';

class CompDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arenas: getArenas(this.props.comp, this.props.id),
      arenaheight: getArenaSize(),
    }
  }

  render() {
    let key = new Date().valueOf();

    return (
      <Box className="compday-main">
        <Box className="compday-header">
          {this.props.name}
        </Box>
        <div className="compday-areanaarea">
          <Timeline key={key} id={key} height={this.state.arenaheight} day={this.props.id}/>
          {this.state.arenas.map(x =>
                (<Arena key={x} id={x} height={this.state.arenaheight} starttime={this.props.starttime} />)
              )}
        </div>
      </Box>
    );
  }
}

// Store handling

const mapStateToProps = state => ({
  comp: state.competition,
});

const mapDispatchToProps = dispatch => ({
    getXxx: (cid) => {
      console.log("implement dispatch(getXxx(cid)");
  },
});

const CompDayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompDay);

export default withRouter(CompDayContainer);

//export default CompDay;
