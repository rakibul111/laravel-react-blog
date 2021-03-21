import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Auth from '../../../apis/Auth'

// partials
import Breadcrumb from '../../partials/Breadcrumb';
import TagForm from './TagForm';

// actions
import { addTag, setTagDefaults, handleTagTitle } from '../../../store/actions/TagActions';


class Add extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {        
        // reset state when add component mounted
        this.props.setTagDefaults();
        this.props.handleTitleChange('');

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
    }


    handleChange(e) {
        e.preventDefault();
        //                           title
        this.props.handleTitleChange(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // _this = Add instance
        let _this = this;

        this.props.addTag(this.props.tags.tag.title, function () {

            // reset title after fetching created data
            _this.props.handleTitleChange('');

            // redirect to index
            setTimeout(() => _this.props.history.push('/tags'), 2000);
        });
    }

    render()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Add tag
                    </h1>

                    <Breadcrumb />

                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-warning">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Add tag </h3>

                                    <Link to='/tags' className="btn btn-warning btn-sm"><i className="fa fa-arrow-left"></i>  Back</Link>
                                </div>
                                <form role="form" method="post" onSubmit={this.handleSubmit}>

                                    <div className="box-body">
                                         <TagForm tags={this.props.tags} onchange={this.handleChange}/>
                                    </div> 
                                    <div className="box-footer">
                                        <button type="submit" className="btn btn-success">Submit</button>
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
        handleTitleChange: (title) => dispatch(handleTagTitle(title)),
        addTag: (title, cb) => dispatch(addTag(title, cb)),
        setTagDefaults: () => dispatch(setTagDefaults())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);