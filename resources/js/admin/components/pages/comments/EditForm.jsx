import React from 'react';

class EditForm extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return this.props.edit_mode?(
            <form method="post" role="form" className="edit-form" onSubmit={this.props.onSubmit}>

                <textarea className={`form-control ${this.props.validation_errors?'has-error':''}`} value={this.props.comment_text} onChange={this.props.onChangeEdit}></textarea>
                {
                    this.props.validation_errors?(<div className="help-block has-error">{this.props.validation_errors.comment}</div>):null
                }
                <button type="submit" className="btn btn-info pull-right">Update</button>
                <button type="button" className="btn btn-default" onClick={this.props.onDisableEdit}>Cancel</button>
            </form>
        ):null;
    }
}

export default EditForm;