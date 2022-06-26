import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const ForgotPasswordPage = ()=> {
    const [errorMessage, setErrorMesage] = useState('');
    const [success, setSuccess] = useState(false);
    const [emailValue, setEmailValue] = useState('');

    const history = useHistory();

    const onSubmitClicked = async () => {
        await axios.put(`/api/forgot-password/${emailValue}`)
        .then(function(response){
            setSuccess(true);
            setTimeout( ()=>{
                history.push('/login');
            }, 3000);
        })
        .catch(function(error){
            console.log(error);
            setErrorMesage(error.message);
        })



        /* try{
            await axios.put(`/api/forgot-password/${emailValue}`);
            setSuccess(true);
            setTimeout( ()=>{
                history.push('/login');
            }, 3000);
        }catch(e){
            setErrorMesage(e.message);
        } */
    }

    return success ? (
        <div className="content-container">
            <h1>Success</h1>
            <p>Check your email for a reset link</p>
        </div>
    ):(
        <div className="content-container">
            <h1>Forgot Password</h1>
            <p>Enter your email and we will send you a reset link</p>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input 
                value = {emailValue}
                onChange={e=>setEmailValue(e.target.value)}
                placeHolder="someone@gmail.com">

            </input>
            <button
                disabled = {!emailValue}
                onClick = {onSubmitClicked}
                >Send Reset Link
            </button>
        </div>
    );
}