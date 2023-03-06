import actionTypes from "../actions/actionTypes";

const initialState = {
  pending: false,
  success: false,
  posts: [],
  fail: false,
  error: "",
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.postsActions.GET_POSTS_START:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.postsActions.GET_POSTS_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        fail: false,
        posts: action.payload,
      };
    case actionTypes.postsActions.GET_POSTS_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        fail: true,
        error: action.payload,
      };
    case actionTypes.postsActions.DELETE_POSTS_START:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.postsActions.DELETE_POSTS_SUCCESS:
      var filteredPost = state.posts.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        pending: false,
        success: true,
        fail: false,
        posts: filteredPost,
      };
    case actionTypes.postsActions.DELETE_POSTS_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        fail: true,
        error: action.payload,
      };
    case actionTypes.postsActions.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case actionTypes.postsActions.EDIT_POSTS:
      var temp = [];
      for (let i = 0; i < state.posts.length; i++) {
        if (state.posts[i].id !== action.payload.id) {
          temp.push(state.posts[i]);
        } else {
          temp.push(action.payload);
        }
      }
      return {
        ...state,
        posts: temp,
      };
    default:
      return state;
  }
};

export default postsReducer;
