import React from 'react';
import {connect} from 'react-redux';

// actions
import { listComments } from '../../../store/actions/CommentActions';

import Auth from '../../../apis/Auth'

// partials
import Spinner from '../../partials/Spinner';
import Breadcrumb from '../../partials/Breadcrumb';
import Pagination from '../../partials/Pagination';
import SuccessAlert from '../../partials/SuccessAlert';
import ErrorAlert from '../../partials/ErrorAlert';
import Row from './Row';

// style
import '../../../css/comment.css';

class Index extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        this.props.listComments(1);
    }

    render()
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

        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Comments
                    </h1>

                    <Breadcrumb />

                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">All comments</h3>
                                </div>

                                <div className="box-body">
                                    <Spinner show={this.props.comments.list_spinner}/>

                                    <SuccessAlert msg={this.props.comments.success_message}/>
                                    <ErrorAlert msg={this.props.comments.error_message}/>

                                    {/* comments table */}
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Author</th>
                                            <th width="55%">Comment</th>
                                            <th>In Response To</th>
                                            <th>Submitted on</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.props.comments.comments.data?(
                                                this.props.comments.comments.data.map(item => <Row key={item.id} comment={item} validation_errors={this.props.comments.validation_errors} />)
                                            ):null
                                        }
                                        </tbody>
                                    </table>
                                </div>

                                <Pagination data={this.props.comments.comments} onclick={this.props.listComments.bind(this)} />

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
        comments: state.comment
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
      listComments: (page) => dispatch(listComments(page))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Index);