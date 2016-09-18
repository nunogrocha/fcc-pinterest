import React, { Component, PropTypes } from 'react';
import Masonry from 'react-masonry-component';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Posts } from '../../api/posts.js';
 
import Post from '../components/Post.jsx';

class MyPosts extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
    };
  }

  renderPosts() {
    let filteredPosts = this.props.posts;
    return filteredPosts.map((post) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showDelete = post.owner === currentUserId;
 
      return (
        <Post
          key={post._id}
          post={post}
          showDelete={showDelete}
        />
      );
    });

  }

  render() {
    return (
      <div>
        <div className="container">  
          <Masonry className={'gallery-class'}>
              {this.renderPosts()}
          </Masonry>
        </div>
      </div>
    );
  }
}

MyPosts.propTypes = {
  posts: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};
 
export default createContainer(() => {
  Meteor.subscribe('myPosts');
  
  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, MyPosts);