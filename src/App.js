import React, { useState } from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
//import { connect } from 'react-redux';

import './App.css';
import LoginDialog from './LoginDialog';
import Splash from './Splash';
import Competition from './Competition';
import TableView from './TableView';
import CompetitionAdm from './CompetitionAdm';

import { Grommet, grommet, Box, Anchor, Button } from 'grommet';
import { Table, Columns, SettingsOption, Logout } from 'grommet-icons';

function PrivateRoute(args) {
  console.log("PrivateRoute "+JSON.stringify(args));
  var { component: Component, auth: Auth, callback: CB, ...rest } = args;
  return (
    <Route
      {...rest}
      render={props =>
        Auth ? (
          <Component {...props} callback={CB}/>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  //const [userdata, setUserdata] = useState({});
  const [isAuthenticated, setAuthenticated] = useState(false);

  const authenticate = (sid, last) => {
    console.log("authenticate: " + sid);
    window.localStorage.setItem('mysid', sid);
    setAuthenticated(true);
    //updateUserdata(sid, last);
  }

  const signout = () => {
    console.log("signout");
    window.localStorage.removeItem('mysid');
    setAuthenticated(false);
    //setUserdata(generateEmptyData());
  }

  const nop = () => {
    console.log("nop");
  }


  return (
    <Grommet theme={grommet} full={true} >
      <Box
        tag='header'
        background='brand'
        pad='small'
        elevation='small'
        justify='between'
        direction='row'
        align='center'
        flex={false}
      >
        <Box direction='row'>
          <Anchor href="#tables" icon={<Table />} />
          <Anchor href="#overview" icon={<Columns />} />
        </Box>

        <Anchor href="#">
          <strong>Athletics Scheduler</strong>
        </Anchor>

        <Box direction='row'>
          <Anchor href="#adm" icon={<SettingsOption />} />
          <Button icon={<Logout />} onClick={signout} />
        </Box>
      </Box>

      <Box direction="row-responsive">
        <Box id="view" flex={true}>
          <Switch>
            <Route path="/login"
              render={() => (
                isAuthenticated ? (
                  <Redirect to="/schema" />
                ) : (
                  <LoginDialog callback={ authenticate }/>
                )
              )
            }
            />
            <Route path="/" exact component={Splash} />
            <Route path="/splash" render={() => <Splash />} />
            <PrivateRoute
              path="/overview"
              component={Competition}
              auth={isAuthenticated}
              callback={nop}
              />
            <PrivateRoute
              path="/tables"
              component={TableView}
              auth={isAuthenticated}
              callback={nop}
              />
            <PrivateRoute
              path="/adm"
              component={CompetitionAdm}
              auth={isAuthenticated}
              callback={nop}
              />
          </Switch>
        </Box>
      </Box>

      <Box tag='footer'
           direction='row'
           justify='start'
           pad='medium'
           flex={false}
           background={{color: "#513F82", dark: true}}
      >
        <i>GT16 App Collection</i>
      </Box>
    </Grommet>
  );
}

export default withRouter(App);
