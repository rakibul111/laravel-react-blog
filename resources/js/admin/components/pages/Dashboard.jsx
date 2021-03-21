import React, { Component } from 'react';
import Breadcrumb from '../partials/Breadcrumb';
import { Link } from 'react-router-dom';
import Auth from '../../apis/Auth'

class Dashboard extends Component
{
    constructor(props)
    {
       super(props);

        document.body.classList.remove("login-page");
        document.body.classList.add("skin-green");
    }

    componentDidMount()
    {
         // check the token validity and admin
        //successCb()
        Auth.checkAuth( (response) => {             //successCb()
            console.log(response);
        },
        // if the token is no more valid or user is no more admin,
        // then back to Login page
        (err) => {                           //failCb()
            alert(err.response.data.message);
            console.log(err.response)
            this.props.history.push("/login");
        });
    }

    render() {
        return (
            <div className="content-wrapper">

                <section className="content-header">
                    <h1>
                        Dashboard
                        <small>Control panel</small>
                    </h1>

                    <Breadcrumb />

                </section>

                <section className="content">
                    <div className="row">

                        <div className="col-lg-3 col-xs-6">
                            <div className="small-box bg-aqua">
                                <div className="inner">
                                    <h3>Posts</h3>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-newspaper-o"></i>
                                </div>
                                <Link to="/posts" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>

                        <div className="col-lg-3 col-xs-6">
                            <div className="small-box bg-green">
                                <div className="inner">
                                    <h3>Categories</h3>

                                    <p></p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-list"></i>
                                </div>
                                <Link to="/categories" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>

                        <div className="col-lg-3 col-xs-6">
                            <div className="small-box bg-yellow">
                                <div className="inner">
                                    <h3>Comments</h3>

                                    <p></p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-comments-o"></i>
                                </div>
                                <Link to="/comments" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                        
                        <div className="col-lg-3 col-xs-6">
                            <div className="small-box bg-red">
                                <div className="inner">
                                    <h3>Users</h3>

                                    <p></p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-users"></i>
                                </div>
                                <Link to="/users" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Dashboard;