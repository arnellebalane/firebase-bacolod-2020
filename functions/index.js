const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.updateTweetLikesOnCreate = functions.firestore
  .document('users/{userId}/likes/{tweetId}')
  .onCreate((change, context) => {
    const tweetId = context.params.tweetId;

    return admin
      .firestore()
      .collection('tweets')
      .doc(tweetId)
      .update({
        likes: admin.firestore.FieldValue.increment(1)
      });
  });

exports.updateTweetLikesOnDelete = functions.firestore
  .document('users/{userId}/likes/{tweetId}')
  .onDelete((change, context) => {
    const tweetId = context.params.tweetId;

    return admin
      .firestore()
      .collection('tweets')
      .doc(tweetId)
      .update({
        likes: admin.firestore.FieldValue.increment(-1)
      });
  });
