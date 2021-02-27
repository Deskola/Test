module.exports = {
    // Resolve the author info for a note when requested
    internships: async (user, args, { models }) => {
      return await models.Internship.find({ client: user._id}).sort({ _id: -1});
    },
    // Resolved the favoritedBy info for a note when requested
    favorites: async (user, args, { models }) => {
      return await models.Internship.find({ favoritedBy: user._id}).sort({ _id: -1});
    }
  };