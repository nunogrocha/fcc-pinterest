import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Router } from 'react-router';
import classnames from 'classnames';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Posts } from '../../api/posts.js';

class CreatePost extends Component {
  constructor(props) {
    super(props);
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const title = ReactDOM.findDOMNode(this.refs.postTitle).value.trim();
    const description = ReactDOM.findDOMNode(this.refs.postDescription).value.trim();
    const img = ReactDOM.findDOMNode(this.refs.postImage).value.trim();
    
    if (title && description && img) {
      Meteor.call('posts.insert', title, description, img, (error, result) => {
        if(error) {
        // handle error
        } else {
          window.location = '/post/' + result;
        }
      });
    } else {
      this.setState({error: true});
      alert("Fill all fields");
    }
  }

  render() {
    return (
      <div>
        <div className="container">   
           <div className="card top-margin">
            <form className="card-block" onSubmit={this.handleSubmit.bind(this)}>
              <fieldset className="form-group">
                <label>Post Title</label>
                <input type="text"  ref="postTitle" placeholder="Post Title"/>
              </fieldset>
              <fieldset className="form-group">
                <label>Post Description</label>
                <input type="text"  ref="postDescription" placeholder="Post Description"/>
              </fieldset>
              <fieldset className="form-group">
                <label>Post Image Link</label>
                <input type="text"  ref="postImage" placeholder="Post Image"/>
              </fieldset>
              <button type="submit" className="btn btn-primary-outline" >
                Add Post
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreatePost.propTypes = {
  currentUser: PropTypes.object,
};
 
export default createContainer(() => {
  Meteor.subscribe('posts');
  
  return {
    posts: Posts.find({}).fetch(),
  };
}, CreatePost);