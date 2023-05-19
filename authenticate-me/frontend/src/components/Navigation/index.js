import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import ProfileButton from "./ProfileButton";
import './Navigation.css'


function Navigation() {
    const user = useSelector(state => state.session.user);

    return (
        <nav className="navbar">
            <NavLink exact to='/'>Home</NavLink>
            {user ? null :
                <div className="nav-accounts">
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/signup'>Signup</NavLink>
                </div>
            }
            {user ? <ProfileButton user={user}/> : null}
        </nav>
    )
}

export default Navigation;