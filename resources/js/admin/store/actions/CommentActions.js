import * as CommentTypes from '../actionTypes/CommentTypes';

import Comment from '../../apis/Comment';

/**
 * list comments action
 */
function listComments(page) {

    return function (dispatch, getState) {

        dispatch({
            type: CommentTypes.LIST_COMMENTS
        });


        // async call
        Comment.list(page)
            .then(response => dispatch({type: CommentTypes.LIST_COMMENTS_SUCCESS, data: response.data.data}))
            .catch(error => dispatch({type: CommentTypes.LIST_COMMENTS_FAILURE, error: error.response.data}));
    }
}

/**
 * edit comment action
 */
function editComment(payload, id, cb = null) {

    return function (dispatch, getState) {

        dispatch({
            type: CommentTypes.EDIT_COMMENTS
        });

        Comment.edit(payload, id)
            .then(response => {
                dispatch({type: CommentTypes.EDIT_COMMENTS_SUCCESS, data: response.data, id})

                if(cb != null) {
                    cb();
                }

                // set comment state default
                setTimeout( function(){
                    dispatch({
                        type: CommentTypes.SET_COMMENT_DEFAULTS
                    });
                }, 3000);
            })
            .catch(error => {
                dispatch({type: CommentTypes.EDIT_COMMENTS_FAILURE, error: error.response.data, id})
               
                // set comment state default
                setTimeout( function(){
                    dispatch({
                        type: CommentTypes.SET_COMMENT_DEFAULTS
                    });
                }, 3000);
        });
    }
}

/**
 * delete comment action
 */
function deleteComment(id)
{
    return function (dispatch, getState) {

        dispatch({
            type: CommentTypes.DELETE_COMMENTS
        });


        Comment.remove(id)
            .then(response => dispatch({type: CommentTypes.DELETE_COMMENTS_SUCCESS, message: response.data.message, id: id}))
            .catch(error => dispatch({type: CommentTypes.DELETE_COMMENTS_FAILURE, error: error.response.data}));
    }
}

export {
    listComments,
    editComment,
    deleteComment
}