import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from '../App';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
// import HomePage from '../Home';
import AccountPage from '../Account';
import AboutPage from '../About';
import * as routes from '../../constants/routes'

const MyRoute = () => 
    <Router>
        <div>
            <ul>
                <li>
                    <Link to={routes.SIGN_IN}>Sign In</Link>
                </li>
                <li>
                    <Link to={routes.LANDING}>Landing</Link>
                </li>
                <li>
                    <Link to={routes.HOME}>Home</Link>
                </li>
                <li>
                    <Link to={routes.ACCOUNT}>Account</Link>
                </li>
                <li>
                    <Link to={routes.ABOUT}>About</Link>
                </li>
            </ul>
        
        <hr />

        <Route 
            exact path={routes.LANDING}
            component={() => <LandingPage />}
        />
        <Route
            exact path={routes.ABOUT}
            component={() => <AboutPage />}
            />
        <Route
            exact path={routes.PASSWORD_FORGET}
            component={() => <PasswordForgetPage />}
            />
        <Route
            exact path={routes.HOME}
            component={() => <App />}
            />
        <Route
            exact path={routes.SIGN_IN}
            component={() => <SignInPage />}
            />
        <Route
            exact path={routes.SIGN_UP}
            component={() => <SignUpPage />}
            />
        <Route
            exact path={routes.ACCOUNT}
            component={() => <AccountPage />}
            />
    </div>
    </Router>


export default MyRoute;