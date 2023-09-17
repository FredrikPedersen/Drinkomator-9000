import {Container, Nav, Navbar} from "react-bootstrap";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
import {useEffect, useState} from "react";
import {User, USER_LS_KEY} from "@models/user.ts";
import {initColorMode} from "@utilities/colorModeUtilities.ts";
import LightSwitch from "@components/lightswitch/LightSwitch.tsx";
import {ROUTES} from "@/Routes.tsx";

export function CoreLayout() {
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState<User | undefined>(undefined)

    useEffect(() => {
        initColorMode();
    }, []);

    useEffect(() => {
        if (!user) {
            const userAsString = localStorage.getItem(USER_LS_KEY)

            if (!userAsString) {
                navigate(ROUTES.LOGIN)
            } else {
                setUser(JSON.parse(userAsString))
            }
        }

        if (location.pathname === ROUTES.ROOT) {
            navigate(ROUTES.ORDER);
        }
    }, [location.pathname, user]);

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
                                to={ROUTES.ORDER}
                                children={<Nav.Link>Bestill</Nav.Link>}
                            />
                            <LinkContainer
                                to={ROUTES.QUEUE}
                                children={<Nav.Link>Kø</Nav.Link>}
                            />
                            <LinkContainer
                                to={ROUTES.LEADERBOARD}
                                children={<Nav.Link>Ledertavle</Nav.Link>}
                            />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <Container className="align-bottom">
                    {user ?
                        <Navbar.Text className={"mt-1"}>
                            Logget inn som {user.username}
                        </Navbar.Text>
                        : null
                    }
                    <LightSwitch/>
                </Container>
            </Navbar>
            <div className={"mt-5"}>
                <Outlet/>
            </div>
        </>
    );
}