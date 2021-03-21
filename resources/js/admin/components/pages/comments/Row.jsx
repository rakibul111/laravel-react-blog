import React from 'react';
import { connect } from 'react-redux';

// actions
import { deleteComment, editComment, setCommentDefaults } from '../../../store/actions/CommentActions';

// partials
import ControlButtons from './ControlButtons';
import EditForm from './EditForm';

class Row extends React.Component {

    constructor(props)
    {
        super(props);

        // internal state for editing comment
        this.state = {
          edit_mode: false,
          comment_text: ""
        };

        this.handleDelete = this.handleDelete.bind(this);

        this.onChangeEdit = this.onChangeEdit.bind(this);

        this.handleEdit = this.handleEdit.bind(this);

        this.handleApprove = this.handleApprove.bind(this);

        this.handleUnapprove = this.handleUnapprove.bind(this);
    }

    enableEditMode() {
        this.setState({
           edit_mode: true,
            comment_text: this.props.comment.comment
        });
    }

    disableEditMode() {
        this.setState({
            edit_mode: false,
            comment_text: ""
        });
    }


    handleDelete(e) {
        e.preventDefault();

        if(confirm("Are you sure to Delete?")) {
            this.props.deleteComment(this.props.comment.id);
        }
    }

    onChangeEdit(e) {
        this.setState({
           comment_text: e.target.value
        });
    }

    handleEdit(e) {
        e.preventDefault();

        let _this = this;

        this.props.editComment({comment: this.state.comment_text}, this.props.comment.id, function () {
            _this.setState({
                edit_mode: false,
                comment_text: ""
            });
        });
    }

    handleApprove(e) {
        e.preventDefault();
        this.props.editComment({approved: 1}, this.props.comment.id);
    }

    handleUnapprove(e) {
        e.preventDefault();
        this.props.editComment({approved: 2}, this.props.comment.id);
    }

    render()
    {
        return (
            <tr className="comment-row">
                <td>
                    {this.props.comment.id}
                    {
                        // new pending comments
                        this.props.comment.approved==0?(
                            <span className="badge bg-red">new</span>
                    ):null}
                </td>

                <td>
                    {this.props.comment.user.name}<br/>
                    {this.props.comment.user.email}
                </td>

                <td className="comment-content">
                    {this.props.comment.comment}

                    <ControlButtons comment={this.props.comment} onDelete={this.handleDelete} edit_mode={this.state.edit_mode} onEnableEdit={this.enableEditMode.bind(this)} onDisableEdit={this.disableEditMode.bind(this)} onApprove={this.handleApprove} onUnapprove={this.handleUnapprove} />
                    
                    <EditForm edit_mode={this.state.edit_mode} comment_text={this.state.comment_text} onDisableEdit={this.disableEditMode.bind(this)} onChangeEdit={this.onChangeEdit} onSubmit={this.handleEdit} validation_errors={this.props.validation_errors} />
                </td>

                <td>{this.props.comment.post.title}</td>
                <td>{this.props.comment.date_formatted}</td>
            </tr>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteComment: (id) => dispatch(deleteComment(id)),
        editComment: (payload, id, cb) => dispatch(editComment(payload, id, cb)),
    }
};

export default connect(null, mapDispatchToProps)(Row);