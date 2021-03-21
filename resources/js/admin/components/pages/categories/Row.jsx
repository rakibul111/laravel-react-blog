import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCategory } from '../../../store/actions/CategoryActions';
import Auth from '../../../apis/Auth';
import { withRouter } from "react-router";

class Row extends React.Component {

    constructor(props)
    {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    // dispatch deleteCategory(id) action (ref.)
    handleDelete(e) {
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

        e.preventDefault();
        if(confirm("Are you sure to delete?")) {
            // dispatch deleteCategory(id) action (ref.)
            this.props.deleteCategory(this.props.category.id);
        }
    }

    render()
    {
        return (
            <tr>
                <td>{this.props.category.id}</td>
                <td>{this.props.category.title}</td>
                <td>
                    {this.props.category.slug}
                </td>
                <td>
                    <Link to={'/categories/edit/' + this.props.category.id} className="btn btn-info btn-sm"><i
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
        // dispatch deleteCategory(id) action
        deleteCategory: (id) => dispatch(deleteCategory(id))
    }
};

// make available dispatch() by props
export default connect(null, mapDispatchToProps)(withRouter(Row));