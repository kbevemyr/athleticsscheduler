import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { DataTable, Text, Box } from 'grommet';

class ArenaTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Table View of Arenas",
    };
  }

  render() {
    // arenas
    return (
      <Box background='light-1' >
          <DataTable
            alignContent='start'
            size='small'
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
              {
                property: 'grentyp',
                header: <Text>Grentyp</Text>,
              },
            ]}
            data={this.props.arenas}
            />
      </Box>
    )
  }
}

  // Store handling

  const mapStateToProps = state => ({
    comp: state.competition,
    arenas: state.competition.arenas,
  });

  const mapDispatchToProps = dispatch => ({
      setXXXColor: (c) => {
        //dispatch(setXXX(c));
    },
  });

  const ArenaTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(ArenaTable);

  export default withRouter(ArenaTableContainer);
