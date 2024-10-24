import { gql } from "@urql/next";

export const PaginatedNotesQuery = gql`
  query PaginatedNotesQuery($limit: Int!, $offset: Int!) {
    paginatedNotes(limit: $limit, offset: $offset) {
      notes {
        id
        title
        content
        createdAt
        updatedAt
      }
      total
    }
  }
`;
