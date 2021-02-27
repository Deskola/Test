const Query = require('./query');
const Mutation = require('./mutation');
const Internship = require('./internship');
const User = require('./user');

const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
  Query,
  Mutation,
  Internship,
  User,
  DateTime: GraphQLDateTime

};
