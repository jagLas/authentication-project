import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import ProfileButton from "./ProfileButton";


function Navigation() {
    const user = useSelector(state => state.session.user);

    return (
        <nav>
            <NavLink to='/'>Home</NavLink>
            {user ? null :
                <>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/signup'>Signup</NavLink>
                </>
            }
            {user ? <ProfileButton user={user}/> : null}
        </nav>
    )
}

export default Navigation;