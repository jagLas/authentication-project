import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import './LoginForm.css'

function LoginFormPage () {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const user = useSelector(state => state.sessionReducer.user)


    if(user) {
        return <Redirect to='/' />
    }



    const submitLogin = async (e) => {
        e.preventDefault()

        const payload = {
            credential,
            password
        }

        try{
            await dispatch(login(payload));
            setCredential('');
            setPassword('');
        } catch (e) {
            setError(await e.json());
            console.log(error)
            console.log(error.title)
        }

        setHasSubmitted(true);
    }

    return (
        <form className="login-form">
            <h2>Login</h2>
            <label>
                Username or Email
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                />
            </label>
            <label>
                Password
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <input type="submit" onClick={submitLogin}/>
            <div className="error">
                {hasSubmitted && error.title && `* ${error.title}`}
            </div>
        </form>
    )
}

export default LoginFormPage;