import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { setActiveDay } from './store/actions';

import { Box, Heading, Text, Menu, Accordion, AccordionPanel, Button } from 'grommet';

import CollisionPanel from './CollisionPanel';
import ExportDialog from './ExportDialog';

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

        <Menu label="Välj dag"
          items={dayItems}
        />
      <Button label="Print" onClick={() => exportPdf("pdfpage", this.props.name+" "+this.props.version)} />
        <Accordion>
          <AccordionPanel label="Export">
            <ExportDialog />
          </AccordionPanel>
          <AccordionPanel label="Collisions">
            <CollisionPanel />
          </AccordionPanel>
          <AccordionPanel label="Overlaps">
          </AccordionPanel>
        </Accordion>
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
