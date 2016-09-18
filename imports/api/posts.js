import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Posts = new Mongo.Collection('posts');
 
if (Meteor.isServer) {
  Meteor.publish('myPosts', function() {
    return Posts.find({ 
      owner: this.userId 
    });
  });
  
  Meteor.publish('posts', function postsPublication() {
    return Posts.find({ });
  });

  Meteor.publish('userposts', function (userId) {
    return Posts.find({
      owner: userId
    });
  });
  
  Meteor.publish('post', function(postId) {
    return Posts.find({ 
      _id: postId
    });
  });
}

Meteor.methods({
  'posts.get'(postId) {
    check(postId, String);
    
    const post = Posts.findOne(postId);
    if(post) {
      return post;
    }
  },
  'posts.insert'(title, description, img) {
    check(title, String);
    let username = '';
    
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    if (Meteor.user().username) {
      username = Meteor.user().username;
    } else {
      username = Meteor.user().profile.name;
    }
 
    return Posts.insert({
      title,
      description,
      img,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: username,
    });
  },
  'posts.remove'(postId) {
    const post = Posts.findOne(postId);
    if (post.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Posts.remove(postId);
  }
});