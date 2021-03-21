import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Auth from '../../../apis/Auth';

// partials
import Breadcrumb from '../../partials/Breadcrumb';
import CategoryForm from './CategoryForm';

// actions
import { showCategory, editCategory,
    setCategoryDefaults, handleCategoryTitle } from '../../../store/actions/CategoryActions';

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

        this.props.setCategoryDefaults();
        // fetch & show category using id
        //  take route parameter, id
        this.props.showCategory(this.props.match.params.id);
    }

    handleChange(e) {
        e.preventDefault();

        this.props.handleTitleChange(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        let _this = this;

        this.props.editCategory(this.props.categories.category.title,
            this.props.match.params.id, function () {

                // reset title
                // _this.props.handleTitleChange('');

                // redirect
                setTimeout(() => _this.props.history.push('/categories'), 2000);
            });
    }

    render()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Edit category
                    </h1>

                    <Breadcrumb />

                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-warning">
                                <div className="box-header with-border">
                                    {/* //  take route parameter, id */}
                                    <h3 className="box-title">Edit category #{ this.props.match.params.id }</h3>

                                    <Link to='/categories' className="btn btn-warning btn-sm"><i className="fa fa-arrow-left"></i> Back</Link>
                                </div>
                                <form role="form" method="post" onSubmit={this.handleSubmit}>

                                    <div className="box-body">
                                        <CategoryForm categories={this.props.categories} onchange={this.handleChange}/>
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
        categories: state.category
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showCategory: (id) => dispatch(showCategory(id)),
        handleTitleChange: (title) => dispatch(handleCategoryTitle(title)),
        editCategory: (title, id, cb) => dispatch(editCategory(title, id, cb)),
        setCategoryDefaults: () => dispatch(setCategoryDefaults())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);