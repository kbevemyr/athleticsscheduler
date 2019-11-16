import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { setActiveDay } from './store/actions';

import { Box, Heading, Text, Select, Menu } from 'grommet';

import CollisionPanel from './CollisionPanel';

import { exportPdf } from './PrintExport';


class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "ControlPanel",
      selectedDay: {id: undefined, name: ""},
    };
  }

  handleSelectDay = (option) => {
    this.props.setTheActiveDay(option.id);
    this.setState({selectedDay: option});
  }

  render() {

    return (
      <Box
          background = {{
            color: "brand",
            dark: false,
            opacity: "medium",
          }}
          animation="slideLeft"
          border={{
            color: "brand",
            size: "medium",
            side: "all",
          }}
          round={{
            corner: "left",
            size: "medium"
          }}
          elevation="medium"
          margin="none"
          pad="medium"
          gap="xsmall"
        >
        <Heading level={3}>{this.props.name}</Heading>
        <Text alignSelf='end' size="small">Schema Version: {this.props.version}</Text>

      <Select
          options={this.props.days}
          value={this.state.selectedDay.name}
          onChange={({ option }) => this.handleSelectDay(option)}
          emptySearchMessage="inga dagar tillgängliga"
      >
        {option => option.name}
      </Select>
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
    days: state.competition.days,
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
