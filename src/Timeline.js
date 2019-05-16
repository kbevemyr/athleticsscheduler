import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { MinutesToPX } from './misc';

import { Box } from 'grommet';
//import { Grid, Box } from 'grommet'; Testade att ha en arena som en grid


function getTimeLineData () {
    return [0, 5, 20, 40];
  }

function createLocalStyle (time) {
  return {height: MinutesToPX("5"),
                  top: MinutesToPX(time),
                  background: 'yellow',
                };
}

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Tid",
      color: 'yellow',
      ts: getTimeLineData()
    }
  }

  render() {
    var divStyle = {height: this.props.height};
    //var ts = getTimeLineData();

    return (
      <div className="arena-main">
        <div className="arena-header">{this.state.name}</div>
        <div className="arena-eventarea" style={divStyle}>
        {this.state.ts.map(x =>
           (
            <Box key={"time."+x} id={"time."+x}
              style={createLocalStyle(x)}
              className="event-main"
            >
              kl
            </Box>
           ))
        }
        </div>
      </div>
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

const TimelineContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);

export default withRouter(TimelineContainer);

//export default Timeline;
