import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Button } from '../button/button';

import './nav-bar.scss';

export function NavbarView({user}) {
    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };

    return (
        <Navbar className="main-nav" sticky="top" expand="lg" variant="light">
            <Container fluid>
                <Navbar.Brand className="navbar-logo" href="/" style={{ fontSize:"36px" }}>BETAMAX</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {isAuth() && (
                            <Nav.Link href="/profile" >{user}</Nav.Link>
                        )}
                        {isAuth() && (
                            <Button variant="link" label="Logout" onClick={() => {
                                onLoggedOut() 
                            }}></Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/">Login</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/register">Register</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}