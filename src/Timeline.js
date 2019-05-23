import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { MinutesToPX, getArenaSize, presentTime } from './misc';

import { Box } from 'grommet';
//import { Grid, Box } from 'grommet'; Testade att ha en arena som en grid


function getTimeLineData (comp, day) {
  var es = comp.events.filter(e => e.day === day);
  return Array.from(new Set(es.map(e => e.starttime)));
}

function createLocalStyle (time) {
  return {height: MinutesToPX("5"), //TODO
          top: MinutesToPX(time)-getArenaSize,
          background: 'yellow',
         };
}

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Tid",
      color: 'yellow',
      ts: getTimeLineData(this.props.comp, this.props.day),
    }
  }

  render() {
    var divStyle = {height: this.props.height};
    //console.log(this.props.day+" times items: "+this.state.ts.length);
    let key = new Date().valueOf();

    return (
      <div className="timeline-main">
        <div className="arena-header">{this.state.name}</div>
        <div className="arena-eventarea" style={divStyle}>
        {this.state.ts.map(x =>
           (
            <Box key={key+x} id={key+x}
              style={createLocalStyle(x)}
              className="event-main"
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
