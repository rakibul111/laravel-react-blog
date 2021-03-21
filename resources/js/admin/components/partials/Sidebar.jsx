import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

const Sidebar = (props) => {

    return props.location.pathname != '/login'?(
        <aside className="main-sidebar">
            <section className="sidebar">
                <div className="user-panel">
                    <div className="pull-left image">
                        <img src={process.env.MIX_APP_URL + 'assets/admin/dist/img/avatar04.png'} className="img-circle" alt="User Image" />
                    </div>
                    <div className="pull-left info">
                        {/* display logged in user name */}
                        <p>{localStorage.getItem("user.name")}</p>
                    </div>
                </div>
                <ul className="sidebar-menu" data-widget="tree">
                    <li className="header">MAIN NAVIGATION</li>
                    <li className={props.location.pathname=='/'?'active':''}>
                        <Link to='/'>
                            <i className="fa fa-dashboard"></i> <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className={props.location.pathname=='/posts'?'active':''}>
                        <Link to='/posts'>
                            <i className="fa fa-th"></i> <span>Posts</span>
                        </Link>
                    </li>
                    <li className={props.location.pathname=='/categories'?'active':''}>
                        <Link to='/categories'>
                            <i className="fa fa-list"></i> <span>Categories</span>
                        </Link>
                    </li>
                    <li className={props.location.pathname=='/tags'?'active':''}>
                        <Link to='/tags'>
                            <i className="fa fa-tags"></i> <span>Tags</span>
                        </Link>
                    </li>
                    <li className={props.location.pathname=='/comments'?'active':''}>
                        <Link to='/comments'>
                            <i className="fa fa-comments-o"></i> <span>Comments</span>
                        </Link>
                    </li>
                    <li className={props.location.pathname=='/users'?'active':''}>
                        <Link to='/users'>
                            <i className="fa fa-users"></i> <span>Users</span>
                        </Link>
                    </li>
                </ul>
            </section>
        </aside>
    ):null;
};

export default withRouter(Sidebar);