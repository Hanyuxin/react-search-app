import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from '../App';

const MyRoute = () => 
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>

        <hr />

        <Route exact path="/" component={App} />
        <Route path="/about" component={About} />
    </div>
    </Router>


const About = ({ match }) => 
    <div>
        <h2>this is a search app</h2>
        <ul>
            <li>
                <Link to={`${match.url}/api`}>Api</Link>
            </li>
            <li>
                <Link to={`${match.url}/ref`}>Refernce</Link>
            </li>
        </ul>

        <Route path={`${match.url}/api`} component={Api} />
        <Route path={`${match.url}/ref`} component={Reference} />
        <Route
            exact
            path={match.url}
            render={() => <h3>CopyRight: Yuxin</h3>}
            />
    </div>

const Api = () => 
    <div>
        <h3>Hacker News API</h3>
        <p> Hacker News platform is a great news aggregator about tech topics. 
            we will use the Hacker News API to fetch trending stories from the platform.
        </p>
    </div>

const Reference = () =>
    <div>
        <hr />
        <ul>
            <li>
                <a href="https://github.com/facebook/create-react-app">create-react-api</a>
            </li>
            <li>
            <a href="https://roadtoreact.com/">the-road-to-react</a>
            </li>
        </ul>
    </div>

export default MyRoute;