import { useState } from "react";
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

    //todo: close when outside click is made

    return (
        <>
            <button onClick={() => setShowMenu(!showMenu)}>
            <i
                className="fas fa-user"
                style={{
                    color: '#00216f',
                    fontSize: '48px'
                }}
            ></i>
            </button>
            {showMenu ?
                <>
                    <ul>
                        <li>{user.username}</li>
                        <li>{user.email}</li>
                        <li><button onClick={logout}>Logout</button></li>
                    </ul>
                </>
             : null}
        </>
    )
}

export default ProfileButton;