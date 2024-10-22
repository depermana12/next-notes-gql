const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
    notes: [Note!]
    token: String
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
    notes: [Note!]
  }

  input AddNoteInput {
    title: String!
    content: String!
    tags: [ID!]
  }

  input UpdateNoteInput {
    title: String!
    content: String!
    tags: [ID!]
  }

  input AuthInput {
    username: String!
    email: String!
    password: String!
  }

  input SignIn {
    email: String!
    password: String!
  }

  type Query  {
    me: User!
    user(id: ID!): User
    notes: [Note!]
    note(id: ID!): Note
    searchNotes(term: String!): [Note!]
    tags: [Tag]!
    tag(id: ID!): Tag
  }

  type Mutation {
    register(input: AuthInput!): User!
    login(input: SignIn!): User!
    removeUser(id: ID!): Boolean!

    addNote(input: AddNoteInput!): Note!
    updateNote(id: ID, input: UpdateNoteInput): Note!
    removeNote(id: ID!): Boolean!

    addTag(name: String!): Tag!
    updateTag(id: ID!, name: String!): Tag!
    removeTag(id: ID!): Boolean!
  }
  

`;

export default typeDefs;
