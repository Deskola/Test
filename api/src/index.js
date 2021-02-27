//Libraries
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');
const helmet = require('helmet')
const cors = require('cors');

//Local files
const port = process.env.PORT || 4000;
require('dotenv').config();

const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const jwt = require('jsonwebtoken');


const DB_HOST = process.env.DB_HOST;

// get the user info from a JWT
const getUser = token => {
    if (token) {
      try {
        // return the user information from the token
        return jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        // if there's a problem with the token, throw an error
        throw new Error('Session invalid');
      }
    }
};
  


const app = express();
app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
app.use(cors());

// Connect to the database
db.connect(DB_HOST);


// Apollo Server setup
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: ({ req }) => {
        // get the user token from the headers
        const token = req.headers.authorization;
        // try to retrieve a user with the token
        const user = getUser(token);
        // for now, let's log the user to the console:
        console.log(user);
        // add the db models and the user to the context
        return { models, user };
    }
    
     
});
  
// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });


app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
