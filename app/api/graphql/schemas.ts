const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
    notes: [Note!]
  }

  type Note {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    updatedAt: String
    tags: [Tag!]
    author: User!
  }

  type Tag {
    id: ID!
    name: String!
    notes: [Notes!]
  }

`;

export default typeDefs;
