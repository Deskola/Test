const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
module.exports = gql`
    scalar DateTime
    type Internship {
        id: ID!
        organization: String!
        position_name: String!
        position_number: String
        duration: String
        responsibility: String!
        qualifications: String!
        application_info: String!
        poster: String
        client: User!
        favoriteCount: Int!
        favoritedBy: [User!]
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        avatar: String
        internships: [Internship!]!
        favorites: [Internship!]!
       }

    type InternshipFeed {  
        internships: [Internship]!  
        cursor: String!  
        hasNextPage: Boolean!
    }

    type Query {
        hello: String
        internships: [Internship!]!
        internship(id: ID!): Internship!
        user(username: String!): User
        users: [User!]!
        me: User!
        internshipFeed(cursor: String): InternshipFeed

    }

    type Mutation { 
        newInternships(
            organization: String!
            position_name: String!
            position_number: String
            duration: String
            responsibility: String!
            qualifications: String!
            application_info: String!
            poster: String            
        ): Internship!

        updateInternship(
            id: ID!
            organization: String!
            position_name: String!
            position_number: String
            duration: String
            responsibility: String!
            qualifications: String!
            application_info: String!
            poster: String
        ): Internship!

        deleteInternship(id: ID!): Boolean!

        signUp(username: String!, email: String!, password: String!): String!
        signIn(email: String, password: String!): String!
        toggleFavorite(id: ID!): Internship!
    }
`;