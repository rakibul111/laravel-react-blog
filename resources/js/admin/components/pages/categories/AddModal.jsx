import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import {
    addCategory, setCategoryDefaults, handleCategoryTitle,
    listAllCategories
} from '../../../store/actions/CategoryActions';
import CategoryForm from './CategoryForm';
import Auth from '../../../apis/Auth' 


class AddModal extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        // reset state when component mounted
        this.props.setCategoryDefaults();
        this.props.handleTitleChange('');
    }

    handleChange(e) {
        e.preventDefault();

        this.props.handleTitleChange(e.target.value);
    }

    handleSubmit(e) {
        // --------------------------------
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
        // --------------------------------
        
        e.preventDefault();
        let _this = this;

        this.props.addCategory(this.props.categories.category.title, function () {

            // after successfuly adding category
            // reset title
            _this.props.handleTitleChange('');

            setTimeout(() => {
                // close modal
                _this.props.close_modal();
                // reset defaults
                _this.props.setCategoryDefaults();
                // refetch categories
                _this.props.listAllCategories();
            }, 2000);
        });
    }

    render()
    {
        return (                     // if show_modal=true, show modal
            <div className={`modal fade` + (this.props.show_modal==true?' in':'')} style={{display: (this.props.show_modal==true?'block':'none')}} id="modal-default">

                <div className="modal-dialog">

                    <form role="form" method="post" onSubmit={this.handleSubmit}>

                        {/* Modal content */}
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" aria-label="Close" onClick={this.props.close_modal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">Add new category</h4>
                            </div>
                            
                            <div className="modal-body">
                                <CategoryForm categories={this.props.categories} onchange={this.handleChange}/>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" onClick={this.props.close_modal}>Close</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.category
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleTitleChange: (title) => dispatch(handleCategoryTitle(title)),
        addCategory: (title, cb) => dispatch(addCategory(title, cb)),
        setCategoryDefaults: () => dispatch(setCategoryDefaults()),
        listAllCategories: () => dispatch(listAllCategories()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddModal));