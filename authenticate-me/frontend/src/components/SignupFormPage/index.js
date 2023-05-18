import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/session";
import './SignupForm.css';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function SignupFormPage () {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    if(user) {
        return <Redirect to='/'></Redirect>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            window.alert('Passwords do not match')
            return;
        }
        
        const payload = {
            username,
            email,
            password
        }

        try {
            await dispatch(signup(payload));
            setEmail('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
        } catch (e) {
            const errors = await e.json();
            const errorMessage = errors.errors.join(' and ')
            setErrors(errorMessage)
            console.log(errors.errors.toString())
        }

        setHasSubmitted(true);
    }

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <label>
                Username
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                E-mail
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Password
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <label>
                Confirm Password
                <input 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </label>
            <input type="submit"/>
            <p className="error">{hasSubmitted && errors}</p>
        </form>
    )
}

export default SignupFormPage;