import React, { Component } from 'react';
import { SignUpLink } from './SignUp';
import { auth } from '../firebase';
import { withRouter } from 'react-router-dom' 

import * as routes from '../constants/routes';

const SignInPage = ({ history }) =>
  <div>
    <h1>Sign In</h1>
    <SignInForm history={history}/>
    <SignUpLink />
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  error: null,
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const {
      history
    } = this.props;

    auth.doSignInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState(() => ({...INITIAL_STATE}));
        history.push(routes.HOME);
      })
      .catch(error => this.setState(byPropKey('error', error)));

    event.preventDefault();
  }

  render() {
    const{
      username,
      email,
      password,
      error
    } = this.state;

    const IsInvalid = 
    username === '' ||
    email === '' ||
    password === '';

  return (
    <form onSubmit={this.onSubmit}>
      <input
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="UserName"
          />
      <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
      <input
            value={password}
            onChange={event => this.setState(byPropKey('password', event.target.value))}
            type="password"
            placeholder="password"
      />
      <button disabled={IsInvalid} type="submit">
      Sign In
      </button>  

      { error && <p>{error.message}</p> }  
    </form>
  );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};