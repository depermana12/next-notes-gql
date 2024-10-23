import { gql } from "@urql/next";

export const DeleteNoteMut = gql`
  mutation DeleteNoteMut($removeNoteId: ID!) {
    removeNote(id: $removeNoteId)
  }
`;
