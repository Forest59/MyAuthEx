import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { EmailVerificationFail } from "./EmailVerificationFail";
import { EmailVerificationSuccess } from "./EmailVerificationSuccess";

export const EmailVerificationLandingPage = () => {

    const [ isLoading, setIsLoading] = useState(true);
    const [ isSuccess, setIsSuccess] = useState(false);
    const { verificationString } = useParams();

    const [,setToken] = useToken();

    useEffect( () => {
     
        const loadVerification = async () => {

            await axios.put('/api/verify-email', { verificationString})
            .then(function(response){
                //console.log("loadVerification: response");
                //console.log(response);
                const {token: NewToken} = response.data;
                setToken(NewToken);
                setIsSuccess(true);
                setIsLoading(false);
                //console.log("isoading: " + isLoading);

            })
            .catch(function(error){
                //console.log("loadVerification: error");
                //console.log(error);
                setIsSuccess(false);
                setIsLoading(false); 
            });
        };

        loadVerification();

    }, []);  //[setToken, verificationString]
            
        if (isLoading) return <p>Loading....</p> ;
        if (!isSuccess) return <EmailVerificationFail />;
    
        return <EmailVerificationSuccess />;

}