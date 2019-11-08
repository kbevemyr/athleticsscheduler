import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { addDay, addArena } from './store/actions';

import { DataTable, Text, TextInput, Button, Box } from 'grommet';
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
      name: "Table View of Names",
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
      <Box gap='small'>
        <Box background='light-1' >
          <DataTable
            alignSelf="start"
            size='medium'
            columns={[
              {
                property: 'id',
                header: <Text>Id</Text>,
                primary: true,
              },
              {
                property: 'name',
                header: <Text>Name</Text>,
              },
            ]}
            data={setData(this.props.type, this.props.days, this.props.arenas)}
            />
        </Box>
        <Box direction='row'>
            <TextInput
              placeholder="add a new name"
              onChange={(e) => this.setState({newName: e.target.value})}
            />
            <Button icon={<Add />} onClick={() => this.handleAddNewName(this.state.newName)}/>
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
