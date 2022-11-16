const { User, Book } = require("../models");
// import sign token function from auth
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require("../utils/auth");
const { countDocuments } = require("../models/User");

const resolvers = {
  // get a single user by either their id or their username
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const foundUser = await User.findOne({ _id: context.user._id })
        .select('-__v -password');
        return foundUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },