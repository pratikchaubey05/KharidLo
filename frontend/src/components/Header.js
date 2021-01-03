import React from "react" ;
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap" ;
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import {logout} from "../actions/userActions";

function Header(){
    const dispatch= useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo} = userLogin;

    const logoutHandler = () =>{
        dispatch(logout());
    }
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

                {/* Desc: If logged-In: DropDown with profile and logout. */}
                {userInfo ? (
                    <NavDropdown title={userInfo.name} id="username">
                        <LinkContainer to="/profile">
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                    </NavDropdown>
                ) : <LinkContainer to="/login">
                    <Nav.Link ><i className="fa fa-user" aria-hidden="true"></i>Sign In</Nav.Link>
                </LinkContainer>}
                
                {/* Desc: If Admin this will be shown : list users */}
                {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="adminMenu">
                        <LinkContainer to="/admin/userlist">
                            <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/productlist">
                            <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/orderlist">
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                )}

                </Nav>
                {/* </Navbar.Collapse> */}
            </Container>

            </Navbar>
        </header>
    );
}

export default Header ;
