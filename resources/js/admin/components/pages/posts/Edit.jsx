import React from 'react';
import { connect } from 'react-redux';
import Auth from '../../../apis/Auth'

// style
import '../../../css/editor.css';

// partials
import Breadcrumb from '../../partials/Breadcrumb';
import AddCategoryModal from '../categories/AddModal';
import AddTagModal from '../tags/AddModal';
import PostForm from './PostForm';

// actions
import { listAllCategories } from '../../../store/actions/CategoryActions';
import { listAllTags } from '../../../store/actions/TagActions';
import { handleFieldChange, showPost, editPost, setPostDefaults, resetFields } from '../../../store/actions/PostActions';


class Edit extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            show_add_category_modal: false,
            show_add_tag_modal: false
        };

        this.submitRef = React.createRef();

        this.handleFieldChange = this.handleFieldChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount()
    {
        // -----------------------------------------------
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
        // -----------------------------------------------
        this.props.setPostDefaults();

        this.props.listAllCategories();

        this.props.listAllTags();

        this.props.showPost(this.props.match.params.id);
    }

    openAddCategoryModal() {
        this.setState({
            show_add_category_modal: true
        });
    }

    closeAddCategoryModal() {
        this.setState({
            show_add_category_modal: false
        });
    }

    openAddTagModal() {
        this.setState({
            show_add_tag_modal: true
        });
    }

    closeAddTagModal() {
        this.setState({
            show_add_tag_modal: false
        });
    }

    handleFieldChange(e) {
        if(e.target.name == 'tag[]') {
            this.props.handleFieldChange(e.target.name, e.target.value, e.target.checked);
        } else if(e.target.name == 'image') {
            this.props.handleFieldChange(e.target.name, e.target.files[0]);
        } else {
            this.props.handleFieldChange(e.target.name, e.target.value);
        }
    }

    handleCkeditorChange(editor) {
        this.props.handleFieldChange("content", editor.getData());
    }

    handleSubmit(e) {
        e.preventDefault();

        let self = this;

        this.props.editPost(this.props.match.params.id, this.props.post.post, function () {

            // reset fields
            self.props.resetFields();

            // redirect
            setTimeout(() => self.props.history.push('/posts'), 2000);
        });
    }

    handleSave(e) {
        e.preventDefault();

        this.props.handleFieldChange('published', e.target.name=='publish'?1:2);

        setTimeout(() => this.submitRef.current.click(), 200);
    }

    render()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Edit Post
                    </h1>

                    <Breadcrumb />

                </section>

                <section className="content">
                    <div className="row">
                        <form method="post" role="form" onSubmit={this.handleSubmit}>

                            <PostForm post={this.props.post.post} create_update_spinner={this.props.post.create_update_spinner}
                                      success_message={this.props.post.success_message} error_message={this.props.post.error_message}
                                      handleFieldChange={this.handleFieldChange} handleCkeditorChange={(event, editor) => this.handleCkeditorChange(editor)}
                                      all_categories={this.props.all_categories} all_tags={this.props.all_tags} openAddCategoryModal={this.openAddCategoryModal.bind(this)}
                                      openAddTagModal={this.openAddTagModal.bind(this)} handleSave={this.handleSave} submitRef={this.submitRef}
                                      validation_errors={this.props.post.validation_errors}
                            />

                        </form>
                    </div>
                </section>

                <AddCategoryModal show_modal={this.state.show_add_category_modal} close_modal={this.closeAddCategoryModal.bind(this)} />

                <AddTagModal show_modal={this.state.show_add_tag_modal} close_modal={this.closeAddTagModal.bind(this)} />

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        all_categories: state.category.all_categories,
        all_tags: state.tag.all_tags,
        post: state.post
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        showPost: (id) => dispatch(showPost(id)),
        editPost: (id, payload, cb) => dispatch(editPost(id, payload, cb)),
        listAllCategories: () => dispatch(listAllCategories()),
        listAllTags: () => dispatch(listAllTags()),
        handleFieldChange: (field, value, checked = null) => dispatch(handleFieldChange(field, value, checked)),
        setPostDefaults: () => dispatch(setPostDefaults()),
        resetFields: () => dispatch(resetFields())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);