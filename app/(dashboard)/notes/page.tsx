"use client";

import { AddNoteDialog } from "@/components/Addnote";
import { NotesQuery } from "@/graphql/queries/notes";
import { useQuery, useMutation } from "@urql/next";
import SkeletonLoader from "@/components/Skeleton";
import NoteCard from "@/components/NoteCard";
import { AddNoteMut } from "@/graphql/mutations/addnote";

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

const NotesPage = () => {
  const [{ data, fetching, error }] = useQuery({ query: NotesQuery });
  const [, addNote] = useMutation(AddNoteMut);

  const onAddNote = async (note: AddNoteInput): Promise<void> => {
    await addNote({ input: note });
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold mb-10">Dashboard</h2>
      {/* TODO input validation */}
      <AddNoteDialog onAddNote={onAddNote} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4 justify-center">
        {fetching && <SkeletonLoader />}
        {error && <p>Error: {error.message}</p>}
        {data &&
          data.notes.map((note: Note) => (
            <NoteCard key={note.id} note={note} />
          ))}
      </div>
    </div>
  );
};
export default NotesPage;
