import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';

export const LogInPage = () => {
    const [, setToken] = useToken();

    const [errorMessage, setErrorMessage] = useState('');

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const history = useHistory();

    const onLogInClicked = async () => {
        await axios.post('/api/login', {
            email: emailValue,
            password: passwordValue,
        })
        .then (function(response){
            console.log(response);
            const { token } = response.data;
            setToken(token);
            history.push('/');
        })
        .catch(function(error){
            console.log(error.response.status) // 401
            console.log(error.response.data.error) //Please Authenticate or whatever returned from server
            setErrorMessage(error.response.data.error);
        })
        
    };

    return (
        <div className="content-container">
            <h1>Log In</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="someone@gmail.com" />
            <input
                type="password"
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                placeholder="password" />
            <hr />
            <button
                disabled={!emailValue || !passwordValue}
                onClick={onLogInClicked}>Log In</button>
            <button onClick={() => history.push('/forgot-password')}>Forgot your password?</button>
            <button onClick={() => history.push('/signup')}>Don't have an account? Sign Up</button>
        </div>
    );
}