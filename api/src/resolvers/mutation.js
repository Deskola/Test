const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();

const gravatar = require('../utils/gravatar');

// Provide resolver functions for our schema fields
module.exports = {
    newInternships: async (parent, args,  { models, user }) => {
        // if there is no user on the context, throw an authentication error
        if (!user) {
            throw new AuthenticationError('You must be signed in to create a note');
        }

        return await models.Internship.create({
         organization: args.organization,
         position_name: args.position_name,
         position_number: args.position_number,
         duration: args.duration,
         responsibility: args.responsibility,
         qualifications: args.qualifications,
         application_info: args.application_info,
         poster: args.poster,
         client: mongoose.Types.ObjectId(user.id)
        });
    },

    deleteInternship: async (parent, { id }, { models , user}) => {

        // if there is no user on the context, throw an authentication error
        if (!user) {
            throw new AuthenticationError('You must be signed in to create a note');
        }

        // find the internship
        const internship = await models.Internship.findById(id);
        // if the note owner and current user don't match, throw a forbidden error
        if (internship && String(internship.client) !== user.id) {
            throw new ForbiddenError("You don't have permissions to delete the note");
        }

        try{
            await internship.remove()
            return true;
        }catch(err){
            return false;
        }
    },

    updateInternship: async (parent, 
        {id,organization,
            position_name,
            position_number,
            duration,
            responsibility,
            qualifications,
            application_info,
            poster
         }, { models, user }) => {

        // if there is no user on the context, throw an authentication error
        if (!user) {
            throw new AuthenticationError('You must be signed in to create a note');
        }

        // find the internship
        const internship = await models.Internship.findById(id);
        // if the note owner and current user don't match, throw a forbidden error
        if (internship && String(internship.client) !== user.id) {
            throw new ForbiddenError("You don't have permissions to delete the note");
        }

        return await models.Internship.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    organization,
                    position_name,
                    position_number,
                    duration,
                    responsibility,
                    qualifications,
                    application_info,
                    poster
                }
            },
            {
                new: true
            }
        );
    },

    signUp: async (parent, { username, email, password }, { models }) => {
        // normalize email address
        email = email.trim().toLowerCase()
        // hash the password
        const hashed = await bcrypt.hash(password, 10);
        // create the gravatar url
        const avatar = gravatar(email);
        try {
          const user = await models.User.create({
            username,
            email,
            avatar,
            password: hashed
          });
     
          // create and return the json web token
          return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        } catch (err) {
          console.log(err);
          // if there's a problem creating the account, throw an error
          throw new Error('Error creating account');
        }
    },

    signIn: async (parent, {email, password }, { models }) => {
        if (email) {
           // normalize email address
           email = email.trim().toLowerCase();
         }
     
        const user = await models.User.findOne({ email });
     
        // if no user is found, throw an authentication error
        if (!user) {
          throw new AuthenticationError('Error signing in');
        }
     
        // if the passwords don't match, throw an authentication error
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new AuthenticationError('Error signing in');
        }
     
        // create and return the json web token
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    },
    toggleFavorite: async (parent, { id }, { models, user }) => {
        // if no user context is passed, throw auth error
        if (!user) {
          throw new AuthenticationError();
        }
      
        // check to see if the user has already favorited the note
        let internshipCheck = await models.Internship.findById(id);
        const hasUser = internshipCheck.favoritedBy.indexOf(user.id);
      
        // if the user exists in the list
        // pull them from the list and reduce the favoriteCount by 1
        if (hasUser >= 0) {
          return await models.Internship.findByIdAndUpdate(
            id,
            {
              $pull: {
                favoritedBy: mongoose.Types.ObjectId(user.id)
              },
              $inc: {
                favoriteCount: -1
              }
            },
            {
              // Set new to true to return the updated doc
              new: true
            }
          );
        } else {
          // if the user doesn't exist in the list
          // add them to the list and increment the favoriteCount by 1
          return await models.Internship.findByIdAndUpdate(
            id,
            {
              $push: {
                favoritedBy: mongoose.Types.ObjectId(user.id)
              },
              $inc: {
                favoriteCount: 1
              }
            },
            {
              new: true
            }
          );
        }
      },
      
     

}