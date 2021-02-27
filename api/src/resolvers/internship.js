module.exports = {
    // Resolve the author info for a note when requested
    client: async (internship, args, { models }) => {
      return await models.User.findById(internship.client);
    },
    // Resolved the favoritedBy info for a note when requested
    favoritedBy: async (internship, args, { models }) => {
      return await models.User.find({ _id: { $in: internship.favoritedBy } });
    }
  };
  