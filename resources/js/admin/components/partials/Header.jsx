import React from 'react';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Auth from '../../apis/Auth';

class Header extends React.Component {

    constructor(props)
    {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        e.preventDefault();

        // logout(successCb(), failCb())
        // if the request is successful
        Auth.logout((response) => {             //successCb()
            this.props.history.push("/login");
        }, 
        // if the request is not successful
        (err) => {                           //failCb()
            alert(err.response.data.message);
            console.log(err.response.status)
            this.props.history.push("/login");
        });
    }


    render() {
        return this.props.location.pathname != '/login' ? (

            <header className="main-header">
                <a href="#" className="logo">
                    <span className="logo-mini"><b>B</b>RL</span>
                    <span className="logo-lg"><b>Blog</b>RL</span>
                </a>
                <nav className="navbar navbar-static-top">
                    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>

                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">

                            <li className="dropdown user user-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <img src={process.env.MIX_APP_URL + 'assets/admin/dist/img/avatar04.png'}
                                         className="user-image" alt="User Image"/>
                                    <span className="hidden-xs">{localStorage.getItem("user.name")}</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="user-header">
                                        <img src={process.env.MIX_APP_URL + 'assets/admin/dist/img/avatar04.png'}
                                             className="img-circle" alt="User Image"/>

                                        <p>
                                            {localStorage.getItem("user.name")}
                                            <small>Member since {localStorage.getItem("user.created_at")}</small>
                                        </p>
                                    </li>
                                    
                                    <li className="user-footer">
                                        <div className="pull-left">
                                        <Link to='/profile' className="btn btn-default btn-flat">Profile</Link>
                                        </div>
                                        <div className="pull-right">
                                            <a href="#" onClick={this.handleLogout}
                                               className="btn btn-default btn-flat">Sign out</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        ) : null;
    }
}

export default withRouter(Header)