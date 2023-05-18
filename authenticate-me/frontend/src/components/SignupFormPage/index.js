import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../store/session";

function SignupFormPage () {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    //TODO: export to app and set at /signup route
    // make error display better
    // redirect to / if a user is already in session
    // make pretty
    //testing

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
            setErrors(errors.errors.toString())
            console.log(errors.errors.toString())
        }

        setHasSubmitted(true);
    }

    return (
        <form onSubmit={handleSubmit}>
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
            <div className="error">{hasSubmitted && errors && `* ${errors}`}</div>
        </form>
    )
}

export default SignupFormPage;