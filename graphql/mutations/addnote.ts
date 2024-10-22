import { gql } from "@urql/next";

export const AddNoteMut = gql`
  mutation AddNoteMut($input: AddNoteInput!) {
    addNote(input: $input) {
      id
      title
      content
      createdAt
    }
  }
`;
