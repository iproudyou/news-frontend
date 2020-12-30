export const initialState = {
  user: {
    email: "",
    firstName: "",
  },
  news: [{
    author: "",
    category: "",
    content: "",
    created: "",
    description: "",
    publishedAt: "",
    source: "",
    title: "",
    url: "",
    urlToImage: "",
  }],
}

export default function authReducer(state, action) {
    switch (action.type) {
      case 'SET_USER': {
        return {...state, user: action.user};
      }
      case 'SET_NEWS': {
        return {...state, news: action.news};
      }
      default: {
        return state;
      }
    }
  }