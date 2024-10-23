"use client";

import { AddNoteDialog } from "@/components/Addnote";
import { NotesQuery } from "@/graphql/queries/notes";
import { useQuery, useMutation } from "@urql/next";
import SkeletonLoader from "@/components/Skeleton";
import NoteCard from "@/components/NoteCard";
import { AddNoteMut } from "@/graphql/mutations/addnote";
import { EditNoteMut } from "@/graphql/mutations/editnote";
import { useState } from "react";
import { Note } from "@/components/NoteCard";

interface AddNoteInput {
  id?: number;
  title: string;
  content: string;
}

const NotesPage = () => {
  const [{ data, fetching, error }] = useQuery({ query: NotesQuery });
  const [, addNote] = useMutation(AddNoteMut);
  const [, editNote] = useMutation(EditNoteMut);

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
        {fetching && <SkeletonLoader />}
        {error && <p>Error: {error.message}</p>}
        {data &&
          data.notes.map((note: Note) => (
            <NoteCard onEdit={openEditDialog} key={note.id} note={note} />
          ))}
      </div>
    </div>
  );
};
export default NotesPage;
