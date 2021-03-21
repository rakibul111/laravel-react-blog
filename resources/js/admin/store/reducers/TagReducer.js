import * as TagTypes from '../actionTypes/TagTypes';

const initialState = {
    tags: {},            // used in listing page
    all_tags: [],        // used in fill dropdowns
    tag: {
        id: "",
        title: ""
    },
    success_message: "",
    error_message: "",
    validation_errors: null,
    list_spinner: false,
    create_update_spinner: false
};

const tagReducer = function (state = initialState, action) {
    switch (action.type) {
        case TagTypes.SET_TAG_DEFAULTS:
            return {
                ...state,
                tag: {...state.tag},
                success_message: "",
                error_message: "",
                validation_errors: null,
                list_spinner: false,
                create_update_spinner: false
            };

        case TagTypes.HANDLE_TAG_TITLE:
            return {
                ...state,
                tag: {...state.tag, title: action.data}
            };

        case TagTypes.LIST_TAGS:
            return {
                ...state,
                list_spinner: true
            };
        case TagTypes.LIST_TAGS_SUCCESS:
            return {
                ...state,
                tags: action.data,
                list_spinner: false
            };
        case TagTypes.LIST_TAGS_FAILURE:
            return {
                ...state,
                error_message: action.error,
                list_spinner: false
            };

        case TagTypes.LIST_ALL_TAGS:
            return {
                ...state,
                all_tags: action.data
            };

        case TagTypes.CREATE_TAGS:
            return {
                ...state,
                create_update_spinner: true
            };
        case TagTypes.CREATE_TAGS_SUCCESS:
            return {
                ...state,
                create_update_spinner: false,
                tag: action.data.data,
                success_message: action.data.message,
                error_message: "",
                validation_errors: null
            };
        case TagTypes.CREATE_TAGS_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message,
                validation_errors: action.error.errors,
                success_message: ""
            };

        case TagTypes.SHOW_TAG:
            return {
                ...state,
                create_update_spinner: true
            };
        case TagTypes.SHOW_TAG_SUCCESS:
            return {
                ...state,
                create_update_spinner: false,
                tag: action.data.data
            };
        case TagTypes.SHOW_TAG_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message
            };

        case TagTypes.EDIT_TAGS:
            return {
                ...state,
                create_update_spinner: true
            };
        case TagTypes.EDIT_TAGS_SUCCESS:
            return {
                ...state,
                create_update_spinner: false,
                tag: action.data.data,
                success_message: action.data.message,
                error_message: "",
                validation_errors: null
            };
        case TagTypes.EDIT_TAGS_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message,
                validation_errors: action.error.errors,
                success_message: ""
            };

        case TagTypes.DELETE_TAGS:
            return {
                ...state,
                list_spinner: true
            };
        case TagTypes.DELETE_TAGS_SUCCESS:
            let tags = state.tags;
            tags.data = state.tags.data.filter(item => item.id != action.id);

            return {
                ...state,
                list_spinner: false,
                tags: tags,
                success_message: action.message,
                error_message: ''
            };
        case TagTypes.DELETE_TAGS_FAILURE:
            return {
                ...state,
                list_spinner: false,
                error_message: action.error.message,
                success_message: ''
            };
            
        default:
            return state;
    }
};

export default tagReducer;