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
  }

  render() {
    let starttime = getDayStarttime(this.props.comp, this.props.id);
    let endtime = getDayEndtime(this.props.comp, this.props.id);
    let runarenas = getTypeArenas(this.props.comp, this.props.id, "run");
    let techarenas = getTypeArenas(this.props.comp, this.props.id, "tech");

    let key = new Date().valueOf();
    var arenaheight = getBoxSize(starttime, endtime);
    var wRun = (runarenas.length + 0.5)*100;
    var wTech = (techarenas.length + 0.5)*100;
    let hOffset = 27;

    // Line present when Event is marked.
    let lineStyle = {stroke: "#333333", "strokeWidth": 2};

    return (
      <Box className="compday-main" gap='small'>
        <Box
          direction="row-responsive"
          pad={{horizontal:"small", vertical:"xxsmall"}}>
          {runarenas.length > 0 &&
            <Stack>
              <Box
                direction="row"
                margin={{horizontal:"small", vertical:"xxsmall"}}
                className="compday-areanaarea">
                <Timeline key={key} id={key} height={arenaheight} day={this.props.id} grentyp="run"/>
                {runarenas.map(x =>
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
          }
          {techarenas.length > 0 &&
            <Stack>
              <Box
                direction="row"
                margin={{horizontal:"small", vertical:"xxsmall"}}
                className="compday-areanaarea">
                <Timeline key={key} id={key} height={arenaheight} day={this.props.id} grentyp="tech"/>
                {techarenas.map(x =>
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
          }
        </Box>
      </Box>
    );
  }
}

// Store handling

const mapStateToProps = state => ({
  id: state.activeD,
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
