import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Navbar, Nav, Offcanvas, Container } from 'react-bootstrap';
import './Navbar.css';

const translations = {
    English: { calendar: "Calendar", help: "Help", history: "History", profile: "Profile", settings: "Settings", menu: "Menu", brand: "EmoteLog" },
    Spanish: { calendar: "Calendario", help: "Ayuda", history: "Historial", profile: "Perfil", settings: "Configuración", menu: "Menú", brand: "EmoteLog" },
    German: { calendar: "Kalender", help: "Hilfe", history: "Verlauf", profile: "Profil", settings: "Einstellungen", menu: "Menü", brand: "EmoteLog" },
    French: { calendar: "Calendrier", help: "Aide", history: "Historique", profile: "Profil", settings: "Paramètres", menu: "Menu", brand: "EmoteLog" },
    Chinese: { calendar: "日历", help: "帮助", history: "历史", profile: "个人资料", settings: "设置", menu: "菜单", brand: "EmoteLog" }
};

export default function CustomNavbar({ language = "English", theme = "light" }) {
    const t = translations[language];

    return (
        <Navbar expand={false} className={`custom-navbar ${theme}`}>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="navbar-brand">{t.brand}</Navbar.Brand>
                <Navbar.Toggle className="hamburger-button" aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end" data-bs-theme={theme}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className="navbar-label" id="offcanvasNavbarLabel">{t.menu}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <CustomLink to="/calendar">{t.calendar}</CustomLink>
                            <CustomLink to="/help">{t.help}</CustomLink>
                            <CustomLink to="/history">{t.history}</CustomLink>
                            <CustomLink to="/profile">{t.profile}</CustomLink>
                            <CustomLink to="/settings">{t.settings}</CustomLink>
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