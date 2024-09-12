import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Navbar, Nav, Offcanvas, Container } from 'react-bootstrap';
import './Navbar.css';

export default function CustomNavbar() {
    return (
        <Navbar bg="light" expand={false} className="mb-3">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">Navbar Offcanvas</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas Menu</Offcanvas.Title>
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
        <Nav.Link as={Link} to={to} className={isActive ? "active" : ""} {...props}>
            {children}
        </Nav.Link>
    );
}