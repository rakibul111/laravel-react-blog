import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Auth from '../../../apis/Auth'

// partials
import Breadcrumb from '../../partials/Breadcrumb';
import UserForm from './UserForm';

// actions
import { handleUserChange, addUser, setUserDefaults, resetUserFields } from '../../../store/actions/UserActions';


class Add extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleUserChange = this.handleUserChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
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

        this.props.setUserDefaults();
        this.props.resetUserFields();
    }

    handleUserChange(e) {
        if(e.target.name == 'is_admin') {
            this.props.handleUserChange(e.target.name, e.target.value, e.target.checked);
        } else {
            this.props.handleUserChange(e.target.name, e.target.value);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let _this = this;

        this.props.addUser(this.props.user.user, function () {

            // reset fields
            _this.props.resetUserFields();

            // redirect
            setTimeout(() => _this.props.history.push('/users'), 2000);
        });
    }

    render()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Add user
                    </h1>

                    <Breadcrumb />

                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-warning">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Add user</h3>

                                    <Link to='/users' className="btn btn-warning btn-sm pull-right"><i className="fa fa-arrow-left"></i> Return back</Link>
                                </div>
                                <form role="form" method="post" onSubmit={this.handleSubmit}>

                                    <div className="box-body">
                                        <UserForm user={this.props.user.user} create_update_spinner={this.props.user.create_update_spinner}
                                                  success_message={this.props.user.success_message} error_message={this.props.user.error_message}
                                                  handleUserChange={this.handleUserChange}
                                                  validation_errors={this.props.user.validation_errors} />
                                    </div>
                                    <div className="box-footer">
                                        <button type="submit" className="btn btn-success">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleUserChange: (field, value, checked = null) => dispatch(handleUserChange(field, value, checked)),
        addUser: (payload, cb) => dispatch(addUser(payload, cb)),
        setUserDefaults: () => dispatch(setUserDefaults()),
        resetUserFields: () => dispatch(resetUserFields())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);