import React from 'react';
import Spinner from '../../partials/Spinner';
import SuccessAlert from '../../partials/SuccessAlert';
import ErrorAlert from '../../partials/ErrorAlert';

class Form extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div>
                <Spinner show={this.props.tags.create_update_spinner}/>
                <SuccessAlert msg={this.props.tags.success_message}/>
                <ErrorAlert msg={this.props.tags.error_message}/>

                <div>
                    {/* if there is validation error, a class is added to style in red color */}
                    
                    <div className={`form-group ${this.props.tags.validation_errors!=null?'has-error':''}`}>
                        <label>Tag title</label>
                        <input type="text" className="form-control" placeholder="Tag title" onChange={this.props.onchange} value={this.props.tags.tag.title?this.props.tags.tag.title:''} name="title" />

                        {/* showing all the validation errors */}
                        {
                            this.props.tags.validation_errors!=null?(<div className="help-block">{this.props.tags.validation_errors}</div>):null
                        }
                    </div>
                </div>

            </div>
        )
    }
}

export default Form;