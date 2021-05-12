import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, HashRouter as Router, Switch } from 'react-router-dom';
import { Container, Button, Navbar, Nav } from "react-bootstrap"
import Login from "./components/login/Login"
import Home from './components/Home';
import NotFound from './components/NotFound';
import { logout } from './services/auth'
import Oglas from './components/Oglasi/Oglas';
import AddOglas from './components/Oglasi/AddOglas';
import EditOglas from './components/Oglasi/EditOglas';

class App extends React.Component {



    render() {
        return (
            <div>
                <Router>
                    <Navbar sticky="top" expand bg="dark" variant="dark">
                        <Navbar.Brand as={Link} to="/">
                            <img
                                src="kupujemprodajem.png"
                                width="70"
                                height="40"
                                className="d-inline-block align-top"
                                alt="kupujem prodajem"
                            />

                        </Navbar.Brand>
                        <Nav>
                            <Nav.Link as={Link} to="/oglasi">Oglasi</Nav.Link>



                            {window.localStorage['jwt'] ?
                                [<Button onClick={() => logout()}>Logout </Button>,
                                <Nav.Link as={Link} to="#" disabled > {window.localStorage.getItem('korisnik')}</Nav.Link>] :

                                <Nav.Link as={Link} to="/login">Log in</Nav.Link>

                            }
                        </Nav>

                    </Navbar>


                    <Container style={{ paddingTop: "25px" }}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/oglasi" component={Oglas} />
                            <Route exact path="/oglasi/add" component={AddOglas} />
                            <Route exact path="/oglasi/edit/:id" component={EditOglas} />
                            <Route component={NotFound} />
                        </Switch>
                    </Container>
                </Router>

            </div>
        )
    }




};




ReactDOM.render(
    <App />,
    document.querySelector('#root')
);