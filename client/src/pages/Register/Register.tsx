import { FormEvent, useState } from "react";
import "./Register.css"
import post from "../../services/post";

function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [warning, setWarning] = useState("");

    const verifyEmail = async (email:string) => {
        const response = await post("api/user/verify_email", {
            email: email,
            password: password
        });


        if (response.ok){
            const response_json = await response.json();
            if (response_json?.success){
                window.location.href="/login"
            }
            else{
                setWarning(response_json.message)
            }
        }


    }

    const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password!==confirmPassword){
            return setWarning("Passwords don't match");
        }
        if (password.length<8){
            return setWarning("Password must be at least 8 characters long")
        }


        if (password===confirmPassword && password.length>0){
            await verifyEmail(email)
        }


    }

    return (
        <div className="form-container flex-center">
            <div className="form-box">
                <div className="form-header">
                    <h1>Register</h1>
                </div>
                <form className="register-form kanit-regular" onSubmit={handleRegisterSubmit}>
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
                        <label htmlFor="confirm password" className="form-label">Confirm Password</label>
                        <input id="cpassword" type="password" placeholder="Enter your password" className="form-input" onChange={e=>setConfirmPassword(e.target.value)}/>
                        <div className="warning"></div>
                    </div>

                    <div className="form-element">
                        <button type="submit" className="form-button kanit-regular flex-center">Register</button>
                        <div className="warning">{warning}</div>
                    </div>
                </form>
                <p>Already have an account? <a href="/login" className="green-link">Login</a></p>
            </div>
        </div>
    )
}

export default Register;