import React from 'react';
import './App.css';

import { Grommet, Box } from 'grommet';

import Competition from './Competition';

function App() {
  return (
    <Grommet plain>
      <Box className="App-header">
        Header of app
      </Box>
      <Competition key="mycomp"/>
    </Grommet>
  );
}

export default App;
