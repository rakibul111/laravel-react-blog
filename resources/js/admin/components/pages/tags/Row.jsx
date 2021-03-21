import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteTag } from '../../../store/actions/TagActions';
import Auth from '../../../apis/Auth';
import { withRouter } from "react-router";

class Row extends React.Component {

    constructor(props)
    {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    // dispatch deletTag(id) action (ref.)
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

        if(confirm("Are you sure to delete?")) {
            // dispatch deleteTag(id) action (ref.)
            this.props.deleteTag(this.props.tag.id);
        }
    }

    render()
    {
        return (
            <tr>
                <td>{this.props.tag.id}</td>
                <td>{this.props.tag.title}</td>
                <td>
                    {this.props.tag.slug}
                </td>
                <td>
                    <Link to={'/tags/edit/' + this.props.tag.id} className="btn btn-info btn-sm"><i
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
        // dispatch deleteTag(id) action
        deleteTag: (id) => dispatch(deleteTag(id))
    }
};

// make available dispatch() by props
export default connect(null, mapDispatchToProps)(withRouter(Row));