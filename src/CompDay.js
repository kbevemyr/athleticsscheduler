import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { getTypeArenas, getDayStarttime, getDayEndtime, getBoxSize } from './misc';

import Arena from './Arena';
import Timeline from './Timeline';
import { Box, Stack } from 'grommet';

class CompDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starttime: getDayStarttime(this.props.comp, this.props.id),
      endtime: getDayEndtime(this.props.comp, this.props.id),
      runarenas: getTypeArenas(this.props.comp, this.props.id, "run"),
      techarenas: getTypeArenas(this.props.comp, this.props.id, "tech"),

      marked: false,
      markedPosY: 0,
      unset: "",
    };

    this.handleMarked = this.handleMarked.bind(this);
    this.handleUnMarked = this.handleUnMarked.bind(this);
  }

  handleMarked(y,cb) {
    console.log("handleMarked: "+y);
    this.setState({marked: true, markedPosY: y, unset: cb});
  }

  handleUnMarked() {
    console.log("handleUnMarked");
    this.setState({marked: false});
    //this.state.unset;
  }

  render() {
    let key = new Date().valueOf();
    var arenaheight = getBoxSize(this.state.starttime, this.state.endtime);
    var wRun = (this.state.runarenas.length + 0.5)*100;
    var wTech = (this.state.techarenas.length + 0.5)*100;
    let hOffset = 27;

    // Line present when Event is marked.
    let lineStyle = {stroke: "#333333", "strokeWidth": 2};

    return (
      <Box className="compday-main">
        <Box className="compday-header">
          {this.props.name}
        </Box>
        <Box
          direction="row-responsive"
          pad={{horizontal:"small", vertical:"xxsmall"}}>
          <Stack>
            <Box
              direction="row"
              margin={{horizontal:"small", vertical:"xxsmall"}}
              className="compday-areanaarea">
              <Timeline key={key} id={key} height={arenaheight} day={this.props.id} grentyp="run"/>
              {this.state.runarenas.map(x =>
                    (<Arena key={x} id={x} day={this.props.id} height={arenaheight} onMarkedEvent={this.handleMarked}/>)
                  )
              }
            </Box>
            {this.state.marked &&
              <Box margin={{horizontal:"small", vertical:"xxsmall"}} onClick={this.handleUnMarked}>
                <svg height={arenaheight} width={wRun}>
                  <line x1={0} y1={this.state.markedPosY+hOffset} x2={wRun} y2={this.state.markedPosY+hOffset} style={lineStyle} />
                </svg>
              </Box>
            }
          </Stack>
          <Stack>
            <Box
              direction="row"
              margin={{horizontal:"small", vertical:"xxsmall"}}
              className="compday-areanaarea">
              <Timeline key={key} id={key} height={arenaheight} day={this.props.id} grentyp="tech"/>
              {this.state.techarenas.map(x =>
                    (<Arena key={x} id={x} day={this.props.id} height={arenaheight} onMarkedEvent={this.handleMarked}/>)
                  )
              }
            </Box>
            {this.state.marked &&
              <Box margin={{horizontal:"small", vertical:"xxsmall"}} onClick={this.handleUnMarked}>
                <svg height={arenaheight} width={wTech}>
                  <line x1={0} y1={this.state.markedPosY+hOffset} x2={wTech} y2={this.state.markedPosY+hOffset} style={lineStyle} />
                </svg>
              </Box>
            }
          </Stack>
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
