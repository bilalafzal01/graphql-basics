const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;
      setInterval(() => {
        count++;
        pubsub.publish("count", {
          count: count,
        });
      }, 5000);
      return pubsub.asyncIterator("count");
    },
  },
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const post = db.posts.find(
        (post) => post.id === postId && post.published
      );
      if (!post) {
        throw new Error("Post not found");
      }
      return pubsub.asyncIterator(`comment ${postId}`); // *   eg: channel name: comment 44
    },
  },
};

export { Subscription as default };