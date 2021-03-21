import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost } from '../../../store/actions/PostActions';
import Auth from '../../../apis/Auth';
import { withRouter } from "react-router";

class Row extends React.Component {

    constructor(props)
    {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

   // dispatch deletPost(id) action (ref.)
   handleDelete(e) {
    e.preventDefault();

    // -------------------------------------------------
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
    // ------------------------------------------------------
    
    if(confirm("Are you sure to delete?")) {
        // dispatch deleteTag(id) action (ref.)
        this.props.deletePost(this.props.post.id);
    }
}

    render()
    {
        return (
            <tr>
                <td>{this.props.post.id}</td>
                <td>{this.props.post.title}</td>
                <td>
                    <img src={this.props.post.image_url} width="50" height="40" />
                </td>
                <td>
                    {this.props.post.published == 1?(<span className="badge bg-green">published</span>):(<span className="badge bg-gray">draft</span>)}
                </td>
                <td>{this.props.post.category?this.props.post.category.title:""}</td>
                <td>{this.props.post.user?this.props.post.user.name:""}</td>
                <td>
                    <Link to={'/posts/edit/' + this.props.post.id} className="btn btn-info btn-sm"><i
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
        deletePost: (id) => dispatch(deletePost(id))
    }
};

export default connect(null, mapDispatchToProps)(withRouter(Row));