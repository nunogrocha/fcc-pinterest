import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Posts } from '../../api/posts.js';

class Post extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.post) {
      return (
        <div className="container">   
           <div className="card top-margin">
            <div className="card-block" >
              <div className="row">
                <div className="col-sm-6">
                  <fieldset className="form-group">
                    <h3>{this.props.post.title}</h3>
                  </fieldset>
                  <fieldset className="form-group">
                    <h3>{this.props.post.description}</h3>
                  </fieldset>
                  <fieldset className="form-group">
                    <img src={this.props.post.img} />
                  </fieldset>
                </div>
              </div>
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