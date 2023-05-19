import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signout } from "../../store/session";

function ProfileButton ({user}) { 
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const logout = async () => {
        try {
            await dispatch(signout());
        } catch (e) {
            console.log(e)
        }
    }

    const openMenu = () => {
        // debugger
        console.log(showMenu)
        if(showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        }

        document.addEventListener('click', closeMenu)

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    return (
        <div className="nav-profile">
            {showMenu ?
                <>
                    <ul className="profile-expand">
                        <li>{user.username}</li>
                        <li>{user.email}</li>
                        <li><button id='logout' onClick={logout}>Logout</button></li>
                    </ul>
                </>
             : null}
            <button id='profile-icon' onClick={openMenu}>
            <i
                className="fas fa-user"
                style={{
                    color: '#2f4f4f',
                    fontSize: '48px'
                }}
            ></i>
            </button>

        </div>
    )
}

export default ProfileButton;