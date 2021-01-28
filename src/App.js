import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
import { SignUp } from './modules/signUp/pages/SignUp';
import { LogIn } from './modules/signUp/pages/LogIn';
import News from './modules/articles/pages/News';
import authContext from './modules/signUp/stores/authContext';
import authReducer, { initialState } from './modules/signUp/stores/authReducer';

function App() {
  const [ state, dispatch ] = useReducer(authReducer, initialState);
  
  return (
    <>
      <Router>
        { !state.user && <LogIn /> }
        <authContext.Provider value={{state, dispatch}}>
            <Switch>          
                <Route exact path="/" component={ LogIn } />
                <Route exact path="/news" component={ News } />
                <Route exact path="/login" component={ LogIn } />
                <Route exact path="/signup" component={ SignUp } />
            </Switch>
        </authContext.Provider>
      </Router>
    </>
  )
}
  
export default App;