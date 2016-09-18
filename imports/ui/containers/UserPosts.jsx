import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Posts } from '../../api/posts.js';
 
import Post from '../components/Post.jsx';

class MyPosts extends Component {
  constructor(props) {
    super(props);
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
          <div className="card-columns">
            {this.renderPosts()}
          </div>
        </div>
      </div>
    );
  }
}

MyPosts.propTypes = {
  posts: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};
 
export default createContainer(({ params }) => {
  const { id } = params;
  Meteor.subscribe('posts');
  
  return {
    posts: Posts.find({owner: id}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, MyPosts);