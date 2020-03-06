const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.updateTweetLikes = functions.firestore
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
