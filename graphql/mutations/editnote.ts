import { gql } from "@urql/next";

export const EditNoteMut = gql`
  mutation EditNoteMut($updateNoteId: ID!, $input: UpdateNoteInput) {
    updateNote(id: $updateNoteId, input: $input) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
