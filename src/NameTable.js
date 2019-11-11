import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { addDay, addArena } from './store/actions';

import { Heading, DataTable, Text, TextInput, Button, Box } from 'grommet';
import { Add } from 'grommet-icons';

function setData(type, days, arenas) {
  var res;
  if (type === 'day') {
    res = days
  } else {
    res = arenas
  }
  return res;
}

class NameTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: "",
    };

    this.handleAddNewName = this.handleAddNewName.bind(this);
  }

  handleAddNewName(name) {
    console.log("handleAddNewName "+ this.props.type +" "+name);
    this.setState({newName: ""});
    if(this.props.type === 'day') {
      this.props.addTheDay(name);
    } else {
      this.props.addTheArena(name);
    }
  }

  render() {
    return (
      <Box gap='small' pad='small'>
        <Heading level={4}>{this.props.label}</Heading>
        <Box>
          <Box direction='row'>
              <TextInput
                placeholder="add a new name"
                onChange={(e) => this.setState({newName: e.target.value})}
              />
              <Button icon={<Add />} onClick={() => this.handleAddNewName(this.state.newName)}/>
          </Box>
          <DataTable
            alignSelf="start"
            size='medium'
            sortable={true}
            primaryKey="id"
            columns={[
              {
                property: 'name',
                header: <Text>Name</Text>,
              },
            ]}
            data={setData(this.props.type, this.props.days, this.props.arenas)}
            />
        </Box>
      </Box>
    )
  }
}

  // Store handling

  const mapStateToProps = state => ({
    days: state.competition.days,
    arenas: state.competition.arenas,
  });

  const mapDispatchToProps = dispatch => ({
    addTheDay: (n) => {
      dispatch(addDay(n));
    },
    addTheArena: (n) => {
      dispatch(addArena(n));
    },
  });

  const NameTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(NameTable);

  export default withRouter(NameTableContainer);
