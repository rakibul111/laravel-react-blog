import React from 'react';
import {
    HashRouter as Router,
    Link,
    Route,
    Switch
} from 'react-router-dom';
import Login from "./components/login/Login";
import AuthenticatedRoute from './AuthenticatedRoute';
import Dashboard from "./components/pages/Dashboard";
import ListPosts from "./components/pages/posts/Index";
import AddPosts from "./components/pages/posts/Add";
import EditPosts from "./components/pages/posts/Edit";
import ListCategories from "./components/pages/categories/Index";
import AddCategories from "./components/pages/categories/Add";
import EditCategories from "./components/pages/categories/Edit";
import ListTags from "./components/pages/tags/Index";
import AddTags from "./components/pages/tags/Add";
import EditTags from "./components/pages/tags/Edit";
import ListComments from "./components/pages/comments/Index";
import ListUsers from "./components/pages/users/Index";
import AddUsers from "./components/pages/users/Add";
import EditUsers from "./components/pages/users/Edit";
import Profile from "./components/pages/profile/Profile";

class Routes extends React.Component
{
    render()
    {
        return (
            <Switch>
                <Route exact path='/login' component={Login} />
                <AuthenticatedRoute exact path='/' component={Dashboard} />
                <AuthenticatedRoute exact path='/posts' component={ListPosts} />
                <AuthenticatedRoute path='/posts/add' component={AddPosts} />
                <AuthenticatedRoute path='/posts/edit/:id' component={EditPosts} />
                <AuthenticatedRoute exact path='/tags' component={ListTags} />
                <AuthenticatedRoute path='/tags/add' component={AddTags} />
                <AuthenticatedRoute path='/tags/edit/:id' component={EditTags} />
                <AuthenticatedRoute exact path='/categories' component={ListCategories} />
                <AuthenticatedRoute path='/categories/add' component={AddCategories} />
                <AuthenticatedRoute path='/categories/edit/:id' component={EditCategories} />
                <AuthenticatedRoute exact path='/comments' component={ListComments} />
                <AuthenticatedRoute exact path='/users' component={ListUsers} />
                <AuthenticatedRoute path='/users/add' component={AddUsers} />
                <AuthenticatedRoute path='/users/edit/:id' component={EditUsers} />
                <AuthenticatedRoute path='/profile' component={Profile} />
            </Switch>
        )
    }
}

export default Routes;