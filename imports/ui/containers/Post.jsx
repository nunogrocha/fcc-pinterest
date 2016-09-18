import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { createContainer } from 'meteor/react-meteor-data';

import { Posts } from '../../api/posts.js';

class Post extends Component {
  constructor(props) {
    super(props);
  }

  getDate(date) {
    return moment(date).fromNow();
  }

  getOwner(owner) {
    return '/posts/' + owner;
  }

  render() {
    if(this.props.post) {
      return (
        <div className="container">   
           <div className="card full-with">
            <div className="card-block" >
              <img className="card-image" src={this.props.post.img} />
              <div className="card-block">
                <h4 className="card-title">{this.props.post.title}</h4>
                <p className="card-text">{this.props.post.description}</p>
              </div>  
              <p className="card-text"><small className="text-muted">by <a href={this.getOwner(this.props.post.owner)}>{this.props.post.username}</a></small></p> 
            </div>
            <div className="card-footer text-muted">
              {this.getDate(this.props.post.createdAt)}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
    
  }
}

Post.propTypes = {
  currentUser: PropTypes.object,
};
 
export default createContainer(({ params }) => {
  const { id } = params;
  const postsHandle = Meteor.subscribe('post', id);
  const loading = !postsHandle.ready();
  const p = Posts.findOne(id);
  const pExists = !loading && !!p;
  return {
    currentUser: Meteor.user(),
    post: pExists ? p : null,
  };
}, Post);