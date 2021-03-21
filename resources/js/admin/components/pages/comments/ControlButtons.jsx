import React from 'react';

class ControlButtons extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
    }

    // control edit form (show or hide)
    handleEdit(e) {
        e.preventDefault();

        if(this.props.edit_mode == false) {
            this.props.onEnableEdit();
        } else {
            this.props.onDisableEdit();
        }
    }

    render()
    {
        return (
          <div className="comments-controls-bar">
              {
                //   if the comment is pending or unapproved
                  this.props.comment.approved == 0 || this.props.comment.approved == 2?(
                          <a href="#" className="approve-comment" onClick={this.props.onApprove}>Approve | </a>
                  ) : null
              }

              {
                //   if the comment is pending or approved
                  this.props.comment.approved == 0 || this.props.comment.approved == 1?(
                          <a href="#" className="unapprove-comment" onClick={this.props.onUnapprove}>Unapprove | </a>
                  ) : null
              }
              <a href="#" className="edit-comment" onClick={this.handleEdit}>Edit | </a> 
              <a href="#" className="trash-comment" onClick={this.props.onDelete}>Trash</a>
          </div>
        );
    }
}

export default ControlButtons;