import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from '../../../apis/Auth'
import { deleteUser } from '../../../store/actions/UserActions';

class Row extends React.Component {

    constructor(props)
    {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e) {
        e.preventDefault();

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
        
        if(confirm("Are you sure to Delete?")) {
            this.props.deleteUser(this.props.user.id);
        }
    }

    render()
    {
        return (
            <tr>
                <td>{this.props.user.id}</td>
                <td>{this.props.user.name}</td>
                <td>
                    {this.props.user.email}
                </td>

                <td>{this.props.user.is_admin==1?'Yes':'No'}</td>
                <td>{this.props.user.created_at}</td>
                <td>
                    <Link to={'/users/edit/' + this.props.user.id} className="btn btn-info btn-sm"><i
                        className="fa fa-edit"></i></Link>
                    <a href="#" className="btn btn-danger btn-sm" onClick={this.handleDelete}><i
                        className="fa fa-remove"></i></a>
                </td>
            </tr>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (id) => dispatch(deleteUser(id))
    }
};

export default connect(null, mapDispatchToProps)(withRouter(Row));