import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// route components
import AppContainer from '../../ui/App.jsx';
import Home from '../../ui/containers/Index.jsx';
import Post from '../../ui/containers/Post.jsx';
import MyPosts from '../../ui/containers/Posts.jsx';
import CreatePost from '../../ui/containers/CreatePost.jsx';
import UserPosts from '../../ui/containers/UserPosts.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={Home} />
      <Route path="/post/:id" component={Post}/>
      <Route path="/create" component={CreatePost}/>
      <Route path="/posts" component={MyPosts}/>
      <Route path="/posts/:id" component={UserPosts}/>
    </Route>
  </Router>
);