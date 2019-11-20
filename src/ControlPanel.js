import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { setActiveDay } from './store/actions';

import { Box, Heading, Text, Menu } from 'grommet';

import CollisionPanel from './CollisionPanel';

import { getName } from './misc';

import { exportPdf } from './PrintExport';


class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "ControlPanel",
    };
  }

  handleSelectDay = (option) => {
    this.props.setTheActiveDay(option.id);
  }

  render() {
    let dayItems = this.props.comp.days.map(x => (
      {
        label: x.name,
        onClick: () => this.handleSelectDay(x),
      })
    );

    return (
      <Box>
        <Heading level={3}>{this.props.name}</Heading>
        <Text size='small'>{getName(this.props.day, this.props.comp, 'days')} är vald.</Text>
        <Text alignSelf='end' size="small">Schema Version: {this.props.version}</Text>

        <Menu label="Välj dag"
          items={dayItems}
        />
        <Menu label="Export"
            items={[
              { label: "PDF", onClick: () => {exportPdf("pdfpage")} },
              { label: "CSV", onClick: () => {} },
            ]}
          />
          <CollisionPanel />
      </Box>
    );
  }
}


  // Store handling

  const mapStateToProps = state => ({
    name: state.competition.name,
    version: state.competition.version,
    comp: state.competition,
    day: state.activeD,
  });

  const mapDispatchToProps = dispatch => ({
    setTheActiveDay: (id) => dispatch( setActiveDay(id) ),
  });

  const ControlPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(ControlPanel);

  export default withRouter(ControlPanelContainer);
