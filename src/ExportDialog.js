import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { genCvsOutput } from './misc';

import { Box, Text, Heading, Button, RadioButtonGroup, Paragraph } from 'grommet';

const EXPORTFORMATS = ['cvs', 'json'];

function genOutput(data, format, attributes, size) {
  let res = "";
  if (format === 'cvs') {
    res = genCvsOutput(data, attributes, size);
  } else if (format === 'json') {
    res = "todo implementation of json export";
  }
    return(res);
}

class ExportDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: [],
      format: EXPORTFORMATS[0],
    };
  }

  handleExportEvent = () => {
    let { name, version } = this.props.comp;
    let fileName = "Schema_"+name+"_"+version+"."+this.state.format;

    let content = genCvsOutput(this.props.comp, this.state.format, this.state.attributes, 0);

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', fileName);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  render() {

    return (
        <Box>
          <Heading level="4">Attributes</Heading>
          <Button label="Klass" />

          <Heading level="4">Format</Heading>
          <RadioButtonGroup
            name="fileFormat"
            options={EXPORTFORMATS}
            value={this.state.format}
            onChange={(event) => this.setState({format: event.target.value})}
          />

          <Heading level="4">Preview</Heading>
          {this.props.comp.events &&
            <pre>
              {genOutput(this.props.comp, this.state.format, this.state.attributes, 5)}
            </pre>
          }

          <Button label={"Save"}
            onClick={this.handleExportEvent}
          />
        </Box>
    )
  }
}

/*
// Requires FileServer.js that implements saveAs
var content = "What's up , hello world";
// any kind of extension (.txt,.cpp,.cs,.bat)
var filename = "hello.txt";

var blob = new Blob([content], {
 type: "text/plain;charset=utf-8"
});

saveAs(blob, filename);
*/


  // Store handling

  const mapStateToProps = state => ({
    comp: state.competition,
  });

  const mapDispatchToProps = dispatch => ({

  });

  const ExportDialogContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(ExportDialog);

  export default withRouter(ExportDialogContainer);
