import React from 'react';
import { withRouter } from "react-router";
import '../../css/form.css';
import CommentApi from '../../apis/Comment';

class CommentForm extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            comment: "",
            error_message: null,
            errors: null,
            success_message: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        this.setState({
            comment: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            error_message: null,
            errors: null
        });

        CommentApi.store({comment: this.state.comment, post_id: this.props.match.params.id}).then(response => {

            this.setState({
                success_message: response.data.message
            });

        }).catch(err => {
            this.setState({
                error_message: err.response.data.message,
                errors: err.response.data.errors
            });
        });

        setTimeout(()=> {
            this.setState({
                comment: "",
                error_message: null,
                errors: null,
                success_message: null
            });
        }, 3000)
    }

    render()
    {
        return (
            <div className="respond">

                <h3>Leave a Comment</h3>

                {
                    this.state.error_message?(<div className="alert alert-danger">{this.state.error_message}</div>):null
                }

                {
                    this.state.success_message?(<div className="alert alert-success">{this.state.success_message}</div>):null
                }

                <form name="contactForm" id="contactForm" method="post" onSubmit={this.handleSubmit}>
                    <fieldset>

                        {/* comment */}
                        <div className="message group">
                            <textarea name="comment" id="cMessage" rows="10" cols="50" placeholder="Add your comment" onChange={this.handleInput} value={this.state.comment}></textarea>

                            {
                                // error
                                this.state.errors && this.state.errors.comment?(<div className="error-block">{this.state.errors.comment}</div>):null
                            }
                        </div>

                        <button type="submit" className="submit">Submit</button>

                    </fieldset>
                </form>

            </div>
        );
    }
}

export default withRouter(CommentForm);