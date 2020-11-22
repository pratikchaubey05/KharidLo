import React from "react" ;
import {LinkContainer} from "react-router-bootstrap" ;
import {Container, Navbar, Nav} from "react-bootstrap";

function Header(){
    return(
        <header>
            <Navbar bg="warning" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand className="header_brand" >KharidLo</Navbar.Brand>
                </LinkContainer>
            
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav"> */}
                <Nav className="ml-auto">
                <LinkContainer to="/cart">
                    <Nav.Link><i className="fa fa-shopping-cart" aria-hidden="true"></i>Cart</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                    <Nav.Link ><i className="fa fa-user" aria-hidden="true"></i>Sign In</Nav.Link>
                </LinkContainer>    
                </Nav>
                {/* </Navbar.Collapse> */}
            </Container>

            </Navbar>
        </header>
    );
}

export default Header ;
