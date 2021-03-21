import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Auth from '../../../apis/Auth';

// partials
import Breadcrumb from '../../partials/Breadcrumb';
import TagForm from './TagForm';

// actions
import { showTag, editTag,
    setTagDefaults, handleTagTitle } from '../../../store/actions/TagActions';

class Edit extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // after component is loaded
    componentDidMount()
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

        this.props.setTagDefaults();
        // fetch & show tag using id
        //  take route parameter, id
        this.props.showTag(this.props.match.params.id);
    }

    handleChange(e) {
        e.preventDefault();

        this.props.handleTitleChange(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        let _this = this;

        this.props.editTag(this.props.tags.tag.title,
            this.props.match.params.id, function () {

                // reset title
                // _this.props.handleTitleChange('');

                // redirect
                setTimeout(() => _this.props.history.push('/tags'), 2000);
            });
    }

    render()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Edit tag
                    </h1>

                    <Breadcrumb />

                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-warning">
                                <div className="box-header with-border">
                                    {/* //  take route parameter, id */}
                                    <h3 className="box-title">Edit tag #{ this.props.match.params.id }</h3>

                                    <Link to='/tags' className="btn btn-warning btn-sm"><i className="fa fa-arrow-left"></i> Back</Link>
                                </div>
                                <form role="form" method="post" onSubmit={this.handleSubmit}>

                                    <div className="box-body">
                                        <TagForm tags={this.props.tags} onchange={this.handleChange}/>
                                    </div>
                                    <div className="box-footer">
                                        <button type="submit" className="btn btn-success">Update</button>
                                    </div>
                                </form>
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
        tags: state.tag
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showTag: (id) => dispatch(showTag(id)),
        handleTitleChange: (title) => dispatch(handleTagTitle(title)),
        editTag: (title, id, cb) => dispatch(editTag(title, id, cb)),
        setTagDefaults: () => dispatch(setTagDefaults())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);