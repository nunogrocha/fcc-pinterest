import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class NavBar extends Component {
  
  render() {
   
    return (
      <nav className="navbar navbar-light bg-faded">
        <div className="container">
          <a className="navbar-brand" href="/">Pinterest</a>
          <div className="form-inline pull-xs-right"> 
            { this.props.currentUser ? 
                <div>
                  <a className="btn btn-outline-success new-poll" href="/create">+ New Post</a>
                  <a className="btn btn-outline-primary new-poll" href="/posts">My Posts</a>
                  <AccountsUIWrapper />
                </div>: <AccountsUIWrapper />
            }
          </div>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  currentUser: PropTypes.object,
};