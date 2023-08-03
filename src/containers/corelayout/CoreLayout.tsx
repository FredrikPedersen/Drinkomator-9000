import {Container, Nav, Navbar} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'


export function CoreLayout() {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <LinkContainer
                        to={"/order"}
                        children={<Navbar.Brand href="#home">Drinkomator-9000</Navbar.Brand>}
                    />
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer
                                to={"/order"}
                                children={<Nav.Link>Bestill</Nav.Link>}
                            />
                            <LinkContainer
                                to={"/queue"}
                                children={<Nav.Link>Kø</Nav.Link>}
                            />
                            <LinkContainer
                                to={"/leaderboard"}
                                children={<Nav.Link>Ledertavle</Nav.Link>}
                            />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div id="layoutChildren">
                <Outlet/>
            </div>
        </>
    );
}