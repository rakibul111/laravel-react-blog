import React from 'react';
import {Link} from "react-router-dom";
import { withRouter } from "react-router";
import GlobalContext from '../../GlobalContext';
import "../../css/form.css";
import Auth from '../../apis/Auth';

class Header extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            category_id: ""
        };

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        e.preventDefault();

        Auth.logout((response) => {
            this.props.history.push("/");
        }, (err) => {
            alert(err.response.data.message);
        });
    }

    componentDidMount()
    {
        if(this.props.location.pathname.indexOf("category") !== -1) {
            let path_parts = this.props.location.pathname.split("/");

            // category_id is at index 2
            this.setState({
                category_id: path_parts[2]
            });
        } else {
            this.setState({
                category_id: ""
            });
        }
    }

    componentDidUpdate(prevProps)
    {
        if (prevProps !== this.props) {
            if (this.props.location.pathname.indexOf("category") !== -1) {
                let path_parts = this.props.location.pathname.split("/");

                // category_id is at index 2
                this.setState({
                    category_id: path_parts[2]
                });
            } else {
                this.setState({
                    category_id: ""
                });
            }
        }
    }

    render()
    {
        return (
            <header id="top">

                <div className="row">

                    <div className="header-content twelve columns">

                        <h1 id="logo-text"><Link to="/">React Laravel Blog</Link></h1>
                        <p id="intro">Excellence and Perfection</p>

                    </div>

                </div>

                <nav id="nav-wrap"><a id="toggle-btn" title="Menu" href="#">Menu</a>


                    <div className="row">

                        <ul id="nav" className="nav">
                            <li className={this.props.location.pathname=='/'?'current':''}><Link to="/">Home</Link></li>
                            {
                                this.context.categories.map(category => <li className={this.state.category_id==category.id?'current':''} key={category.id}><Link to={'/category/' + category.id + '/' + category.slug}>{ category.title }</Link></li>)
                            }

                            {
                                localStorage.getItem("user.api_token")!=null?(
                                    <li className="auth-links">
                                        <a href='#' onClick={this.handleLogout}>Logout</a>
                                    </li>
                                ) : (
                                    <li className="auth-links">
                                        <Link to='/login'>Login</Link>
                                        <Link to='/register'>Register</Link>
                                    </li>
                                )
                            }
                        </ul>


                    </div>

                </nav>

            </header>
        )
    }
}

Header.contextType = GlobalContext;

export default withRouter(Header);