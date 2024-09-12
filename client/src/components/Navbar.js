import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>

            <ul>
                <CustomLink to="/daily-view">Daily View</CustomLink>
                <CustomLink to="/calendar">Calendar</CustomLink>
                <CustomLink to="/help">Help</CustomLink>
                <CustomLink to="/history">History</CustomLink>
                <CustomLink to="/profile">Profile</CustomLink>
                <CustomLink to="/settings">Settings</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}