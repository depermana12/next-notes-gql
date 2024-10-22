import { gql } from "@urql/next";

export const NotesQuery = gql`
  query Notes {
    notes {
      id
      title
      content
      createdAt
    }
  }
`;
