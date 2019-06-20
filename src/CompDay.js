import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { getArenas, getTypeArenas, getDayStarttime, getDayEndtime, getBoxSize } from './misc';

import Arena from './Arena';
import Timeline from './Timeline';
import { Box } from 'grommet';

class CompDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arenas: getArenas(this.props.comp, this.props.id),
      starttime: getDayStarttime(this.props.comp, this.props.id),
      endtime: getDayEndtime(this.props.comp, this.props.id),
      runarenas: getTypeArenas(this.props.comp, this.props.id, "run"),
      techarenas: getTypeArenas(this.props.comp, this.props.id, "tech"),
    };
  }

  render() {
    let key = new Date().valueOf();
    var arenaheight = getBoxSize(this.state.starttime, this.state.endtime);

    return (
      <Box className="compday-main">
        <Box className="compday-header">
          {this.props.name}
        </Box>
        <Box
          direction="row"
          pad={{horizontal:"small", vertical:"xxsmall"}}>
          <Box
            direction="row"
            margin={{horizontal:"small", vertical:"xxsmall"}}
            className="compday-areanaarea">
            <Timeline key={key} id={key} height={arenaheight} day={this.props.id} grentyp="run"/>
            {this.state.runarenas.map(x =>
                  (<Arena key={x} id={x} day={this.props.id} height={arenaheight} />)
                )
            }
          </Box>
          <Box
            direction="row"
            margin={{horizontal:"small", vertical:"xxsmall"}}
            className="compday-areanaarea">
            <Timeline key={key} id={key} height={arenaheight} day={this.props.id} grentyp="tech"/>
            {this.state.techarenas.map(x =>
                  (<Arena key={x} id={x} day={this.props.id} height={arenaheight} />)
                )
            }
          </Box>
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
    getXxx: (cid) => {
      console.log("implement dispatch(getXxx(cid)");
  },
});

const CompDayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompDay);

export default withRouter(CompDayContainer);
