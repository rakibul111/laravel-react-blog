import React from 'react';
import Sidebar from '../partials/Sidebar';
import {Link} from "react-router-dom";
import Auth from '../../apis/Auth';
import { withRouter } from "react-router";
import "../../css/form.css";

class Register extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            error_message: null,
            errors: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        // update state when input changes
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            error_message: null,
            errors: null
        });

        Auth.register({name: this.state.name, email: this.state.email, password: this.state.password, password_confirmation: this.state.password_confirmation}, 
            // successCb()
            (response) => {

            for (var i in response.data.user) {
                localStorage.setItem("user." + i, response.data.user[i]);
                localStorage.setItem("user.api_token", response.data.api_token); 

                setTimeout(() => {
                    this.props.history.push("/");
                }, 500);
            }

        }, 
        // failCb()
        (err) => {
            this.setState({
                error_message: err.response.data.message,
                errors: err.response.data.errors
            });
            console.log(err.response.data.errors)
        });
    }

    render()
    {
        return (
            <div id="content-wrap">
                <div className="row">
                    <div id="main" className="eight columns">

                        <h2>Create account</h2>

                        {   // error message
                            this.state.error_message?(<div className="alert alert-danger">{this.state.error_message}</div>):null
                        }

                        <form name="contactForm" method="post" onSubmit={this.handleSubmit}>
                            <fieldset>

                                {/* Name */}
                                <div className="group">
                                    <label>Name</label>
                                    <input name="name" type="text" onChange={this.handleInput} value={this.state.name} placeholder="Name" />
                                    
                                    {   // error
                                        this.state.errors && this.state.errors.name?(<div className="error-block">{this.state.errors.name}</div>):null
                                    }
                                </div>

                                {/* email */}
                                <div className="group">
                                    <label>Email</label>
                                    <input name="email" type="text" onChange={this.handleInput} value={this.state.email} placeholder="Email" />

                                    {   // error
                                        this.state.errors && this.state.errors.email?(<div className="error-block">{this.state.errors.email}</div>):null
                                    }
                                </div>

                                {/* password */}
                                <div className="group">
                                    <label>Password</label>
                                    <input name="password" type="password" onChange={this.handleInput} value={this.state.password} placeholder="Password" />

                                    {   // error
                                        this.state.errors && this.state.errors.password?(<div className="error-block">{this.state.errors.password}</div>):null
                                    }
                                </div>

                                {/* password confirmation */}
                                <div className="group">
                                    <label>Password Confirmation</label>
                                    <input name="password_confirmation" type="password" onChange={this.handleInput} value={this.state.password_confirmation} placeholder="Password" />

                                    {   // error
                                        this.state.errors && this.state.errors.password?(<div className="error-block">{this.state.errors.password}</div>):null
                                    }
                                </div>

                                <button type="submit" className="submit">Register</button>
                                &nbsp;<Link to="/login">Already have account</Link>

                            </fieldset>
                        </form>

                    </div>

                    <Sidebar/>

                </div>
            </div>
        )
    }
}

export default withRouter(Register);