import { actions } from "../actions";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postReducer = (state, action) => {
  switch (action.type) {
    case actions.post.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.post.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        post: action.data.post,
      };
    }
    case actions.post.DATA_FETCHING_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    }

    default: {
      return state;
    }
  }
};

export { postReducer, initialState };
