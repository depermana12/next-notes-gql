"use client";

import { AddNoteDialog } from "@/components/Addnote";
import { NotesQuery } from "@/graphql/queries/notes";
import { useQuery, useMutation } from "@urql/next";
import SkeletonLoader from "@/components/Skeleton";
import NoteCard from "@/components/NoteCard";
import { AddNoteMut } from "@/graphql/mutations/addnote";

const NotesPage = () => {
  const [{ data, fetching, error }] = useQuery({ query: NotesQuery });
  const [, addNote] = useMutation(AddNoteMut);

  interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
  }

  interface AddNoteInput {
    title: string;
    content: string;
  }

  const onAddNote = async (note: AddNoteInput): Promise<void> => {
    await addNote({ input: note });
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
        {/* TODO input validation */}
        <AddNoteDialog onAddNote={onAddNote} />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {fetching && <SkeletonLoader />}
          {error && <p>Error: {error.message}</p>}
          {data &&
            data.notes.map((note: Note) => (
              <NoteCard key={note.id} note={note} />
            ))}
        </div>
      </div>
    </>
  );
};
export default NotesPage;
