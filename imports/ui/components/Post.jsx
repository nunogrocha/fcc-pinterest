import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { Posts } from '../../api/posts.js';

export default class Post extends Component {

  deleteThisPost() {
    Meteor.call('posts.remove', this.props.post._id);
  }
  
  render() {
    let date = moment(this.props.post.createdAt);
    let postUrl = '/post/' + this.props.post._id;
    let userPostUrl = '/posts/' + this.props.post.owner;
    
    return (
      <div className="card text-xs-center">
        <div className="card-block">
          <a href={postUrl}><h4 className="card-title">{this.props.post.title}</h4></a>
        </div>
        <div className="card-block">
          { this.props.showDelete ?
              <button className="btn btn-danger-outline left-spacer" onClick={this.deleteThisPost.bind(this)}>
                Delete
              </button> : ''
          }
        </div>
        <a href={userPostUrl}>{this.props.post.username}</a>
        <div className="card-footer text-muted">
          {date.fromNow()}
        </div>
      </div>
    );
  }
}
 
Post.propTypes = {
  post: PropTypes.object.isRequired,
  showDelete: React.PropTypes.bool.isRequired,
};

function rndColor(){
  return '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
}
