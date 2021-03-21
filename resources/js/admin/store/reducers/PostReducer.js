import * as PostTypes from '../actionTypes/PostTypes';

const initialState = {
    posts: {},
    post: {
        id: "",
        title: "",
        slug: "",
        content: "",
        image: "",
        published: 1,
        category_id: "",
        tags: []
    },
    success_message: "",
    error_message: "",
    validation_errors: {},
    list_spinner: false,
    create_update_spinner: false
};

const postReducer = function (state = initialState, action) {

    let tags = [];

    switch (action.type) {

        case PostTypes.LIST_POSTS:
            return {
                ...state,
                list_spinner: true
            };
        case PostTypes.LIST_POSTS_SUCCESS:
            return {
                ...state,
                list_spinner: false,
                // get all data with pagination
                posts: action.data
            };
        case PostTypes.LIST_POSTS_FAILURE:
            return {
                ...state,
                list_spinner: false,
                error_message: action.error
            };

        case PostTypes.HANDLE_FIELD_CHANGE:
            return handleFieldChange(state, action);

        case PostTypes.CREATE_POSTS:
            return {
                ...state,
                create_update_spinner: true
            };
        case PostTypes.CREATE_POSTS_SUCCESS:
            // tags of created post => tags[]
            tags = action.data.data.tags;

            if(tags) {
                tags = tags.map(x => x['id']);
            } else {
                tags = [];
            }

            // now post.tags will contain only tag id
            action.data.data.tags = tags;

            return {
                ...state,
                create_update_spinner: false,
                post: action.data.data,
                success_message: action.data.message,
                error_message: "",
                validation_errors: {}
            };
        case PostTypes.CREATE_POSTS_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message,
                validation_errors: action.error.errors,
                success_message: ""
            };

        case PostTypes.SHOW_POST:
            return {
                ...state,
                create_update_spinner: true
            };
        case PostTypes.SHOW_POST_SUCCESS:
            tags = action.data.tags;

            if(tags) {
                tags = tags.map(x => x['id']);
            } else {
                tags = [];
            }

            // now post.tags will contain only tag id
            action.data.tags = tags;
            // showPost doesn't show image
            action.data.image = "";

            return {
                ...state,
                create_update_spinner: false,
                post: action.data
            };
        case PostTypes.SHOW_POST_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message
            };

        case PostTypes.EDIT_POSTS:
            return {
                ...state,
                create_update_spinner: true
            };
        case PostTypes.EDIT_POSTS_SUCCESS:
            tags = action.data.data.tags;

            if(tags) {
                tags = tags.map(x => x['id']);
            } else {
                tags = [];
            }

            // now post.tags will contain only tag id
            action.data.data.tags = tags;

            return {
                ...state,
                post: action.data.data,
                create_update_spinner: false,
                success_message: action.data.message,
                error_message: "",
                validation_errors: {}
            };
        case PostTypes.EDIT_POSTS_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message,
                validation_errors: action.error.errors,
                success_message: ""
            };

        case PostTypes.DELETE_POSTS:
            return {
                ...state,
                list_spinner: true
            };
        case PostTypes.DELETE_POSTS_SUCCESS:
            let posts = state.posts;
            // remove post which is deleted from server
            posts.data = state.posts.data.filter(item => item.id != action.id);

            return {
                ...state,
                list_spinner: false,
                posts: posts,
                success_message: action.message,
                error_message: ''
            };
        case PostTypes.DELETE_POSTS_FAILURE:
            return {
                ...state,
                list_spinner: false,
                error_message: action.error.message,
                success_message: ''
            };

        case PostTypes.SET_POST_DEFAULTS:
            return {
                ...state,
                success_message: "",
                error_message: "",
                validation_errors: {},
                list_spinner: false,
                create_update_spinner: false
            };
            
        case PostTypes.RESET_FIELDS:
            return {
                ...state,
                post: {
                    id: "",
                    title: "",
                    slug: "",
                    content: "",
                    image: "",
                    published: 1,
                    category_id: "",
                    tags: []
                }
            };
        default:
            return state;
    }
};

// change state.post, when input field changes
function handleFieldChange(state, action)
{
    if(action.field == 'title' || action.field == 'content' || action.field == 'category_id'
        || action.field == 'published' || action.field == 'image') {
        return {
            ...state,             // field      // value
            post: {...state.post, [action.field]: action.data}
        };
    } else if(action.field == 'tag[]') {
        // selected tags array for a post
        let selected_tags = state.post.tags;

        if(action.checked == true) {
            // if tags id is not in selected tags, then add to it
            if(!selected_tags.includes(action.data)) {
                selected_tags.push(parseInt(action.data));
            }
        } else if(action.checked == false) {
            // if unchecked tag is in selected_tags, then filter out that
            if(selected_tags.includes(parseInt(action.data))) {
                selected_tags = selected_tags.filter(item => item != parseInt(action.data))
            }
        }

        return {
            ...state,
            post: {...state.post, tags: selected_tags}
        };
    }
}

export default postReducer;