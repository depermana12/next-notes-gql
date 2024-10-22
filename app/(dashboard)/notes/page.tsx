"use client";

import { AddNoteDialog } from "@/components/Addnote";
import { NotesQuery } from "@/graphql/queries/notes";
import { useQuery } from "@urql/next";
import SkeletonLoader from "@/components/Skeleton";
import NoteCard from "@/components/NoteCard";

const NotesPage = () => {
  const [{ data, fetching, error }, replay] = useQuery({ query: NotesQuery });

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
        <AddNoteDialog />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {fetching && <SkeletonLoader />}
          {error && <p>Error: {error.message}</p>}
          {data &&
            data.notes.map((note) => <NoteCard key={note.id} note={note} />)}
        </div>
      </div>
    </>
  );
};
export default NotesPage;
