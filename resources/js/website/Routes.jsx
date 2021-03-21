import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import Category from './components/pages/Category';
import Tag from './components/pages/Tag';
import Post from './components/pages/Post';
import Login from './components/pages/Login';
import Register from './components/pages/Register';

const Routes = (props) => {

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/category/:id/:slug" component={Category} />
            <Route path="/tag/:id/:title" component={Tag} />
            <Route path="/p/:id/:slug" component={Post} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </Switch>
    )
};

export default Routes;