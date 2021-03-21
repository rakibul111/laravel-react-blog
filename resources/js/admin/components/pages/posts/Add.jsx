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
import { handleFieldChange, addPost, setPostDefaults, resetFields } from '../../../store/actions/PostActions';


class Add extends React.Component
{
    constructor(props)
    {
        super(props);

        // state to control modal
        this.state = {
          show_add_category_modal: false,
          show_add_tag_modal: false
        };

        // create ref.
        this.submitRef = React.createRef();

        this.handleFieldChange = this.handleFieldChange.bind(this);

        // this.handleCkeditorChange = this.handleCkeditorChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount()
    {
        // ---------------------------------------------
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
        // ---------------------------------------------
        // reset posts state
        this.props.setPostDefaults();
        this.props.resetFields();

        // Load all carefory and tag
        this.props.listAllCategories();
        this.props.listAllTags();
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

    // call action for  tag, image, title, category
    handleFieldChange(e) {
        if(e.target.name == 'tag[]') {
            this.props.handleFieldChange(e.target.name, e.target.value, e.target.checked);
        } else if(e.target.name == 'image') {
            this.props.handleFieldChange(e.target.name, e.target.files[0]);
        } else {
            this.props.handleFieldChange(e.target.name, e.target.value);
        }
    }

    // call action for editor
    // only handle content field
    handleCkeditorChange(editor) {
        this.props.handleFieldChange("content", editor.getData());
    }
    
    // when the form is submitted
    handleSubmit(e) {
        e.preventDefault();

        let _this = this;

        this.props.addPost(this.props.post.post, function () {

            // when post added successfully, call callback
            // reset fields (action)
            _this.props.resetFields();

            // redirect
            setTimeout(() => _this.props.history.push('/posts'), 2000);
        });
    }

    // when we click publish or draft
    handleSave(e) {
        e.preventDefault();

        // handle publish field
        this.props.handleFieldChange('published', e.target.name=='publish'?1:2);
        //  #......#
        // click the input(type submit) in form, which trigger onSubmit = handleSumbit()
        setTimeout(() => this.submitRef.current.click(), 300);
    }

    render()
    {
        return (
            <div className="content-wrapper">
                {/* title */}
                <section className="content-header">
                    <h1>
                        Add Post
                    </h1>

                    <Breadcrumb />

                </section>

                {/* Form */}
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
        // get all categories
        all_categories: state.category.all_categories,
        // get all tags
        all_tags: state.tag.all_tags,
        post: state.post
    };
};

const mapDispatchToProps = (dispatch) => {

  return {
      addPost: (payload, cb) => dispatch(addPost(payload, cb)),
    //   when component didMount()
      listAllCategories: () => dispatch(listAllCategories()),
      listAllTags: () => dispatch(listAllTags()),
    //   -----------------------------
      handleFieldChange: (field, value, checked = null) => dispatch(handleFieldChange(field, value, checked)),
      setPostDefaults: () => dispatch(setPostDefaults()),
      resetFields: () => dispatch(resetFields())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);