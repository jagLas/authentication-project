import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { signout } from "../../store/session";
import ProfileButton from "./ProfileButton";

function Navigation() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const logout = async () => {
        try {
            await dispatch(signout());
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <nav>

            <NavLink to='/'>Home</NavLink>
            {user ? null :
                <>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/signup'>Signup</NavLink>
                </>
            }
            {user ? <ProfileButton/> : null}
            {user ? <button onClick={logout}>Logout</button> : null}
        </nav>
    )
}

export default Navigation;