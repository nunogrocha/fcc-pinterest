import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { Posts } from '../../api/posts.js';

export default class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {errored: false};
  }

  deleteThisPost() {
    Meteor.call('posts.remove', this.props.post._id);
  }
  
  handleChange(event) {
    this.setState({errored: true});
  }

  render() {
    let date = moment(this.props.post.createdAt);
    let postUrl = '/post/' + this.props.post._id;
    let userPostUrl = '/posts/' + this.props.post.owner;
    
    return (
      <div className="card grid-item">
        <div className="card-block">
          <h4 className="card-title">{this.props.post.title}</h4>
          <h6 className="card-subtitle text-muted">{this.props.post.description}</h6>
        </div>
        {
          this.state.errored ?
          <img className="card-image" src="http://ciyuanhawker.com.sg/wp-content/uploads/2015/01/img-placeholder.jpg" /> :
          <img className="card-image" onError={this.handleChange.bind(this)} src={this.props.post.img} />
        }
        <div className="card-block">
          <p className="card-text"><small className="text-muted">by <a href={userPostUrl}>{this.props.post.username}</a></small></p>
          <a href={postUrl} className="btn btn-outline-primary">View Post</a>
          { this.props.showDelete ?
              <button className="btn btn-outline-danger left-spacer" onClick={this.deleteThisPost.bind(this)}>
                Delete
              </button> : ''
          }
        </div>
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