// Provide resolver functions for our schema fields
module.exports = {
    internships: async (parent, args, { models }) => {
        return await models.Internship.find().limit(100);
    },
    internship: async (parent, args,  { models }) => {
      return models.Internship.findById(args.id)
    },
    
    user: async (parent, { username }, { models }) => {
      // find a user given their username
      return await models.User.findOne({ username });
    },
    users: async (parent, args, { models }) => {
      // find all users
      return await models.User.find({});
    },
    me: async (parent, args, { models, user }) => {
      // find a user given the current user context
      return await models.User.findById(user.id);
    },
    
    internshipFeed: async (parent, { cursor }, { models }) => {
      // hardcode the limit to 10 items
      const limit = 10;
      // set the default hasNextPage value to false
      let hasNextPage = false;
      // if no cursor is passed the default query will be empty
      // this will pull the newest notes from the db
      let cursorQuery = {};
    
      // if there is a cursor
      // our query will look for notes with an ObjectId less than that of the cursor
      if (cursor) {
        cursorQuery = { _id: { $lt: cursor } };
      }
    
      // find the limit + 1 of notes in our db, sorted newest to oldest
      let internships = await models.Internship.find(cursorQuery)
        .sort({ _id: -1 })
        .limit(limit + 1);
    
      // if the number of notes we find exceeds our limit
      // set hasNextPage to true and trim the notes to the limit
      if (internships.length > limit) {
        hasNextPage = true;
        internships = internships.slice(0, -1);
      }
    
      // the new cursor will be the Mongo object ID of the last item in the feed array
      const newCursor = internships[internships.length - 1]._id;
    
      return {
        internships,
        cursor: newCursor,
        hasNextPage
      };
    }
    


}