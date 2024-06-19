import { FormEvent, useState } from "react";
import "./Login.css"
import post from "../../services/post";
import Cookies from "universal-cookie";
import isUserLogged from "../../services/isUserLogged";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const cookies = new Cookies();


    const handleLoginSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        if (isUserLogged()){
            return;
        }

        const response = await post("api/user/login",{
            email: email,
            password: password
        });


        if (response.status === 200){
            const response_json = await response.json();
            
            if (response_json?.success === true){
                const token = response_json?.content.tokenString;
                const expires = response_json?.content.expires;

                
                cookies.set("auth_token", token, {
                    expires: new Date(expires)
                });

                window.location.replace("/")
            }
            else{
                console.log("Incorrect login or password")
            }
        }
    }


    return (
        <div className="form-container flex-center">
            <div className="form-box">
                <div className="form-header flex-center">
                    <h1>Login</h1>
                </div>
                <form className="login-form kanit-regular" onSubmit={handleLoginSubmit}>

                    <div className="form-element">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input id="email" type="email" placeholder="Enter your email" className="form-input" onChange={e=>setEmail(e.target.value)}/>
                        <div className="warning"></div>
                    </div>

                    <div className="form-element">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input id="password" type="password" placeholder="Enter your password" className="form-input" onChange={e=>setPassword(e.target.value)}/>
                        <div className="warning"></div>
                    </div>

                    <div className="form-element">
                        <button type="submit" className="form-button kanit-regular flex-center">Login</button>
                    </div>

                    
                </form>
                <p>Don't have an account? <a href="/register" className="green-link">Register now</a></p>
            </div>
        </div>
    )
}

export default Login;