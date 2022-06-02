import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";


var stylingObject = {
    border: {
        border: "1px solid #BFBFBF",
        borderRadius: "7px",
        boxShadow: "0px 0px 3px 1px #dddddd",
        padding: "3em"
    }
}

export default function Signup() {
    const [signup, setsignup] = useState({ name: "", email: "", password: "" })
    let history = useHistory();
    const [errorMsg, seterrorMsg] = useState({ message1: "", message2: "", message3: "" })

    const handleOnChange = (e) => {
        setsignup({ ...signup, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        seterrorMsg({ message1: "", message2: "", message3: "" })
        let err = { msg1: "", msg2: "", msg3: "" }

        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: signup.name, email: signup.email, password: signup.password }) // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        if (json.success) {
            //save the token and redirect. useHistory can be used to redirect
            history.push("/")
        }
        else {
            //use built-in input validations
            if (Array.isArray(json.Error)) {
                for (let index = 0; index < Object.keys(json.Error).length; index++) {
                    if (json.Error[index].param === "name") { err.msg1 = json.Error[index].msg }
                    else if (json.Error[index].param === "email") { err.msg2 = json.Error[index].msg }
                    else if (json.Error[index].param === "password") { err.msg3 = json.Error[index].msg }
                }
                seterrorMsg({ message1: err.msg1, message2: err.msg2, message3: err.msg3 })
            }
            else { seterrorMsg({ message3: json.Error }) }
        }

    }

    return (
        <div className="my-5 container">
            <h2 className="text-center">Sign Up</h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="login-form p-4">
                        <div style={stylingObject.border}>
                            <form onSubmit={handleSubmit} className="row g-3">
                                <div className="mb-3 col-12">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input type="text" className="form-control" value={signup.name} onChange={handleOnChange} id="name" name="name" />
                                    <div style={{ color: "red" }}>{errorMsg.message1}</div>
                                </div>
                                <div className="mb-3 col-12">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" value={signup.email} onChange={handleOnChange} id="email" name="email" aria-describedby="emailHelp" />
                                    <div style={{ color: "red" }}>{errorMsg.message2}</div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" value={signup.password} onChange={handleOnChange} id="password" name="password" />
                                </div>
                                <div style={{ color: "red" }}>{errorMsg.message3}</div>
                                <button type="submit" className="btn btn-primary mt-3 col-12">Submit</button>
                                <div className="col-12 mt-4 text-center">
                                    <Link to="/">Login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
