import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { addName, deleteName, changeName } from './store/actions';

import { Heading, Text, TextInput, Button, Box } from 'grommet';
//import { Table, TableHeader, TableBody, TableRow, TableCell} from 'grommet';
import { Layer } from 'grommet';
import { Add, Save, FormEdit, FormTrash } from 'grommet-icons';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const ConfirmationDialog = ({ onClose, onCancel })  => (
      <Layer
        position='top'
        onClickOutside={onCancel}
        >
        <Box pad='large' gap='medium'>
          <Text>
            Är du säker att du vill tabort detta?
          </Text>
          <Box direction='row' gap='medium' align='center'>
            <Button label='Yes' onClick={onClose} />
            <Button label='No' primary={true} onClick={onCancel} />
          </Box>
        </Box>
      </Layer>
);


class NameTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameId: "",
      nameName: "",
      nameMode: 'add',
      confirmation: undefined,
    };

    this.handleAddNewName = this.handleAddNewName.bind(this);
    this.handleEditName = this.handleEditName.bind(this);
    this.handleDelName = this.handleDelName.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
  }

  resetInput() {
    this.setState({nameMode: 'add'});
    this.setState({nameId: ""});
    this.setState({nameName: ""});
  }

  handleAddNewName(e) {
    let name = this.state.nameName;
    console.log("handleAddNewName "+ this.props.type +" "+name);
    if(name !== "") {
      this.props.addTheName(name, this.props.type);
    }
    this.resetInput();
  }

  handleEditName(id, name) {
    console.log("handleEditName "+ this.props.type +" "+name)
    this.setState({nameMode: 'edit'});
    this.setState({nameId: id});
    this.setState({nameName: name});
  }

  handleChangeName() {
    let name = this.state.nameName;
    console.log("handleChangeName "+ this.props.type +" "+name);
    if(name !== "") {
      this.props.changeTheName(this.state.nameId, name, this.props.type);
      this.setState({nameMode: 'add'});
    }
    this.resetInput();
  }

  handleDelName(id) {
    console.log("handleDelName "+ this.props.type +" "+id);
    let action = () => this.props.deleteTheName(id, this.props.type);
    this.setState({
      confirmation:
        <ConfirmationDialog
          onClose={() => {action(); this.setState({confirmation: undefined});}}
          onCancel={() => this.setState({confirmation: undefined})}
        />
    });
  }

  render() {
    let inputButton = (this.state.nameMode === 'edit') ?
      <Button icon={<Save />} onClick={this.handleChangeName}/>
      :
      <Button icon={<Add />} onClick={this.handleAddNewName}/>
      ;

    return (
      <Box gap='small' pad='small'>
        <Heading level={4}>{this.props.label}</Heading>
        <Box>
          <Box direction='row'>
              <TextInput
                placeholder="add a new name"
                value={this.state.nameName}
                onChange={(e) => this.setState({nameName: e.target.value})}
              />
            {inputButton}
          </Box>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Text>Name</Text>
                </TableCell>
                <TableCell>

                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {this.props.comp[this.props.type].map(row =>
                <TableRow key={"NT"+row.id}>
                  <TableCell  scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>
                    <Box direction='row' pad='none'>
                      <Button
                        fill={false}
                        icon={<FormEdit size='small' />} onClick={() => this.handleEditName(row.id, row.name)}/>
                      <Button
                        fill={false}
                        icon={<FormTrash size='small' />} onClick={(e) => this.handleDelName(row.id)}/>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
        {this.state.confirmation}
      </Box>
    )
  }
}

  // Store handling

  const mapStateToProps = state => ({
    comp: state.competition,
    days: state.competition.days,
    arenas: state.competition.arenas,
    classes: state.competition.days,
    grenar: state.competition.grenar,
  });

  const mapDispatchToProps = dispatch => ({
    addTheName: (n,t) => {
      dispatch(addName(n,t));
    },
    deleteTheName: (id, type) => {
      dispatch(deleteName(id, type));
    },
    changeTheName: (id, name, type) => {
      dispatch(changeName(id, name, type));
    },
  });

  const NameTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(NameTable);

  export default withRouter(NameTableContainer);
