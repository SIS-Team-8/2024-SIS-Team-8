import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Navbar, Nav, Offcanvas, Container } from 'react-bootstrap';
import './Navbar.css';

export default function CustomNavbar() {
    return (
        <Navbar expand={false} className="custom-navbar">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="navbar-brand">EmoteLog</Navbar.Brand>
                <Navbar.Toggle className="hamburger-button" aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className="navbar-label" id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <CustomLink to="/daily-view">Daily View</CustomLink>
                            <CustomLink to="/calendar">Calendar</CustomLink>
                            <CustomLink to="/help">Help</CustomLink>
                            <CustomLink to="/history">History</CustomLink>
                            <CustomLink to="/profile">Profile</CustomLink>
                            <CustomLink to="/settings">Settings</CustomLink>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <Nav.Link as={Link} to={to} className={isActive ? "active custom-link" : "custom-link"} {...props}>
            {children}
        </Nav.Link>
    );
}