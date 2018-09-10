import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import PicturesPage from './Components/PicturesPage'

import { createStore , applyMiddleware } from 'redux';
import roodReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
// thunk は ライフサイクルを利用するためのmiddleware
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'


// middlewareはapplyMiddlewareに置く
// logger,thunk  <<  middleware
const store = createStore(
    roodReducer,
    composeWithDevTools(
        applyMiddleware(logger, thunk)
    )
);

ReactDOM.render(
<Provider store={ store } >
     {/* Routerを使う一番先端にRouterで囲む、 一般的にProviderの下に置く　*/}
    <Router>
    <div className="ui container">
        <div className="ui three item menu">
            {/* aタグをRouterのNavLink機能を使う */}
            {/* to のあとは下のRouteのpathと対応しています。 */}
            {/* exactは"/"で重複する内容を解消するため */}
            {/* activeClassNameは選択された際の表示 */}
            <NavLink exact activeClassName="acitve" className="item" to="/">Home</NavLink>
            <NavLink exact activeClassName="acitve" className="item" to="/pictures">Pictures</NavLink>
            <NavLink activeClassName="acitve"  className="item" to="/Pictures/new">Add new Picture</NavLink>
        </div>
        {/* ルートを定義する <App />を下に入れる */}    
        {/* componentの中にはimportされたページを入れる */}
        <Route exact path='/' component={ App }/>
        <Route exact path='/pictures' component={ PicturesPage }/>
    </div>
    </Router>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
