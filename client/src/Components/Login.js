import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom";

var stylingObject = {
    border: {
        border: "1px solid #BFBFBF",
        borderRadius: "7px",
        boxShadow: "0px 0px 3px 1px #dddddd",
        padding: "3em"
    }
}

export default function Login() {
    const [login, setlogin] = useState({ email: "", password: "" })
    const [errorMsg, seterrorMsg] = useState({ message1: "", message2: "" })
    let err = { msg1: "", msg2: "" }
    let history = useHistory();

    const handleOnChange = (e) => {
        setlogin({ ...login, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        err = { msg1: "", msg2: "" }

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: login.email, password: login.password }) // body data type must match "Content-Type" header
        });

        const json = await response.json(); // parses JSON response into native JavaScript objects

        if (json.success) {
            //save the token and redirect. useHistory can be used to redirect
            sessionStorage.setItem('token', json.token)
            history.push("/home")
        }
        else {
            if (Array.isArray(json.Error)) {
                for (let index = 0; index < Object.keys(json.Error).length; index++) {
                    if (json.Error[index].param === "email") { err.msg1 = json.Error[index].msg }
                    else if (json.Error[index].param === "password") { err.msg2 = json.Error[index].msg }
                }
            }
            else { err.msg2 = json.Error }
        }
        seterrorMsg({ message1: err.msg1, message2: err.msg2 })
    }

    return (
        <div className="container my-5">
            <h2 className="text-center">Login</h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="login-form p-4">
                        <div style={stylingObject.border}>
                            <form onSubmit={handleSubmit} className="row g-3">
                                <div className="form-group mb-3 col-12">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" value={login.email} onChange={handleOnChange} id="email" name="email" aria-describedby="emailHelp" />
                                    <div style={{ color: "red" }}>{errorMsg.message1}</div>
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" value={login.password} onChange={handleOnChange} id="password" name="password" />
                                </div>
                                <div style={{ color: "red" }}>{errorMsg.message2}</div>
                                <button type="submit" className="btn btn-primary mt-3 col-12">Submit</button>
                                <div className="col-12 mt-4">
                                    <p className="text-center mb-0">Don't have an account yet? <Link to="/signup">Signup</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
