"use client";

import { AddNoteDialog } from "@/components/Addnote";
// import { NotesQuery } from "@/graphql/queries/notes";
import { useQuery, useMutation } from "@urql/next";
import SkeletonLoader from "@/components/Skeleton";
import NoteCard from "@/components/NoteCard";
import { AddNoteMut } from "@/graphql/mutations/addnote";
import { EditNoteMut } from "@/graphql/mutations/editnote";
import { DeleteNoteMut } from "@/graphql/mutations/deletenote";
import { useState } from "react";
import { Note } from "@/components/NoteCard";
// import PaginationBtn from "@/components/PaginationBtn";
import { PaginatedNotesQuery } from "@/graphql/queries/paginatedNotes";
import { Button } from "@/components/ui/button";

interface AddNoteInput {
  id?: number;
  title: string;
  content: string;
}
// const PaginatedNotesQuery = gql`
//   query ($limit: Int!, $offset: Int!) {
//     paginatedNotes(limit: $limit, offset: $offset) {
//       notes {
//         title
//         content
//         createdAt
//         updatedAt
//         id
//       }
//       total
//       currentPage
//       totalPages
//     }
//   }
// `;

const NotesPage = () => {
  const notesPerPage = 8;
  const [pageVariables, setPageVariables] = useState({
    limit: notesPerPage,
    offset: 0,
  });

  const [result, replay] = useQuery({
    query: PaginatedNotesQuery,
    variables: pageVariables,
  });
  const { data, fetching, error } = result;

  const onNextPage = () => {
    setPageVariables((prev) => ({
      ...prev,
      offset: prev.offset + notesPerPage,
    }));
  };

  const onPrevPage = () => {
    setPageVariables((prev) => ({
      ...prev,
      offset: Math.max(prev.offset - notesPerPage, 0),
    }));
  };

  const notes = data?.paginatedNotes.notes || [];
  const totalNotes = data?.paginatedNotes.total || 0;
  const currentPage = Math.floor(pageVariables.offset / notesPerPage) + 1;
  const totalPages = Math.ceil(totalNotes / notesPerPage);

  const [, addNote] = useMutation(AddNoteMut);
  const [, editNote] = useMutation(EditNoteMut);
  const [, deleteNote] = useMutation(DeleteNoteMut);

  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    noteToEdit: Note | null;
  }>({ isOpen: false, noteToEdit: null });

  const onAddNote = async (note: AddNoteInput): Promise<void> => {
    await addNote({ input: note });
  };

  const onEditNote = async (note: AddNoteInput): Promise<void> => {
    if (dialogState.noteToEdit) {
      const result = await editNote({
        updateNoteId: dialogState.noteToEdit.id,
        input: note,
      });

      if (result.error) console.error("failed to edit note:", result.error);
    }
    setDialogState({ isOpen: false, noteToEdit: null });
  };

  const onDeleteNote = async (noteId: number) => {
    await deleteNote({ removeNoteId: noteId });
    replay({ requestPolicy: "network-only" });
  };

  const openAddDialog = () => {
    setDialogState({ isOpen: true, noteToEdit: null });
  };

  const openEditDialog = (note: Note) => {
    setDialogState({ isOpen: true, noteToEdit: note });
  };

  const closeDialog = () => {
    setDialogState({ isOpen: false, noteToEdit: null });
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold mb-10">Dashboard</h2>
      {/* TODO input validation */}
      <AddNoteDialog
        dialogState={dialogState}
        onClose={closeDialog}
        onAddDialog={openAddDialog}
        onEditNote={onEditNote}
        onAddNote={onAddNote}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4 justify-center">
        {error && <p>Error: {error.message}</p>}
        {fetching && <SkeletonLoader />}
        {notes.map((note: Note) => (
          <NoteCard
            onEdit={openEditDialog}
            key={note.id}
            note={note}
            onDeleteNote={onDeleteNote}
          />
        ))}
      </div>
      <div className="flex gap-5 mt-10 w-full p-4 bg-white border-t border-gray-200">
        <Button
          onClick={onPrevPage}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? "bg-gray-400" : "bg-primary hover:bg-primary/90"
          } text-white font-bold py-2 px-4 rounded`}
        >
          Prev
        </Button>

        <Button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className={`${
            currentPage === totalPages
              ? "bg-gray-400"
              : "bg-primary hover:bg-primary/90"
          } text-white font-bold py-2 px-4 rounded`}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
export default NotesPage;
