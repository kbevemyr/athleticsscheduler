import React, {Component} from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {loginUser} from './store/actions';

import { Layer, Heading, Box, Form, FormField, TextInput, Text, Button } from 'grommet';

class LoginDialog extends Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleLoginEvent = this.handleLoginEvent.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
    console.log("LoginDialog constructor");
    this.state = {
      redirectToReferrer: false,
      unvalue: "",
      pwvalue: "",
      message: "",
    }
  }

  handleBack() {
    this.props.history.goBack();
  }

  handleLoginEvent() {
    const {unvalue, pwvalue} = this.state;
    console.log("got LoginEvent");
    loginUser(unvalue, pwvalue)
      .then((res) => {
        //console.log("after login "+JSON.stringify(res));
        if(res.status === "error") {
          this.setState({message: res.reason})
        } else {
          // The callback in the callback should be removed
          this.props.callback(res.sid, () => this.setState({redirectToReferrer: true}));
        }
      });
  }

  handleKeyEvent(e) {
    //console.log("got keyEvent: "+e.key);
    if(e.key === 'Enter') {
      this.handleLoginEvent();
    }
  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    console.log("redirvalue "+JSON.stringify(redirectToReferrer));
    if (redirectToReferrer) {
      console.log("redir " + JSON.stringify(from));
      return (<Redirect to={from} />);
    }

    return (
      <Layer
        onClickOutside={this.handleBack}
        onEsc={this.handleBack}
      >
        <Box key="logindialogcomponent" pad='medium'>
          <Heading level= {2} >Logga in</Heading>

          <Box gap='medium' pad='small'>
            <Form onSubmit={this.handleSubmit} onReset={this.handleCancel}>
              <FormField
                htmlFor="un"
                label="Användarname"
              >
                <TextInput
                  id="un"
                  placeholder="username or email"
                  value={this.state.unvalue}
                  onChange={(e) => this.setState({unvalue: e.target.value})}
                  tabIndex="1"
                />
              </FormField>

              <FormField
                htmlFor="pw"
                label="Lösenord"
              >
                <TextInput
                  id="pw"
                  type="password"
                  placeholder="minst 8 tecken"
                  value={this.state.pwvalue}
                  onChange={(e) => this.setState({pwvalue: e.target.value})}
                  required
                  onKeyDown={this.handleKeyEvent}
                  tabIndex="2"
                />
              </FormField>
              {this.state.message !== "" &&
                <Text>
                  {this.state.message}
                </Text>
              }
              <Button label="Ångra" tabIndex="5" onClick={this.handleBack} />
              <Button label="Logg in" tabIndex="4" primary onClick={this.handleLoginEvent} />
            </Form>
          </Box>
        </Box>
      </Layer>
    );
  }
}

// Store handling

const mapStateToProps = state => ({
  name: state.competition.name,
});

const mapDispatchToProps = dispatch => ({
    getTheCompetitionData: (cid) => {
      //dispatch(getCompetitionData(cid));
    },
});

const LoginDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginDialog);

export default withRouter(LoginDialogContainer);
