import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { MinutesToPX, presentTime, getDayStarttime } from './misc';

import { Box } from 'grommet';
//import { Grid, Box } from 'grommet'; Testade att ha en arena som en grid


function getTimeLineData (comp, day, type) {
  let ts = comp.events.filter(e => (e.day === day && e.grentype.startsWith(type)));
  let tss = Array.from(new Set(ts.map(e => e.starttime)));
  //console.log("getTimeLineData("+type+"). times =");
  //console.log(tss);
  return tss;
}

function createLocalStyle (time, color) {
  return {height: MinutesToPX("5"), //TODO
          top: MinutesToPX(time),
          background: color,
         };
}

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Tid",
      color: 'lightgray',
      ts: getTimeLineData(this.props.comp, this.props.day, this.props.grentyp),
    }
  }

  render() {
    var divStyle = {height: this.props.height};
    let key = new Date().valueOf();
    let daystart = getDayStarttime(this.props.comp, this.props.day);

    return (
      <div className="timeline-main">
        <div className="arena-header">{this.state.name}</div>
        <div className="arena-eventarea" style={divStyle}>
        {this.state.ts.map(x =>
           (
            <Box key={key+x} id={key+x}
              style={createLocalStyle(x-daystart, this.state.color)}
              className="event-main"
              justify='start'
              border={{ color: 'black', size: 'small' , 'side': 'top'}}
            >
              {presentTime(x)}
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
