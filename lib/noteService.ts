import db from "@/app/db/db";
import { notes } from "@/app/db/schema";
import { count, eq, and, like, or, desc } from "drizzle-orm";
import { GraphQLError } from "graphql";

const getPaginatedNotes = async (
  userId: number,
  limit: number,
  offset: number,
) => {
  const results = await db
    .select()
    .from(notes)
    .where(eq(notes.author, userId))
    .orderBy(desc(notes.created_at))
    .limit(limit)
    .offset(offset);

  const transform = results.map(({ created_at, updated_at, ...rest }) => ({
    ...rest,
    createdAt: created_at,
    updatedAt: updated_at,
  }));

  const total = await db
    .select({ value: count(notes.author) })
    .from(notes)
    .where(eq(notes.author, userId));

  return {
    notes: transform,
    total: total[0].value,
  };
};

const getAllNotes = async (userId: number) => {
  const results = await db.query.notes.findMany({
    where: eq(notes.author, userId),
  });
  const transform = results.map(({ created_at, updated_at, ...rest }) => ({
    ...rest,
    createdAt: created_at,
    updatedAt: updated_at,
  }));

  return transform;
};

const getNoteById = async (noteId: number, userId: number) => {
  const note = await db.query.notes.findFirst({
    where: and(eq(notes.id, noteId), eq(notes.author, userId)),
  });

  if (!note) {
    throw new GraphQLError("Note not found", { extensions: { code: 404 } });
  }

  const { created_at, updated_at, ...rest } = note;

  return {
    ...rest,
    createdAt: created_at,
    updatedAt: updated_at,
  };
};

const searchNotes = async (term: string, userId: number) => {
  const results = await db.query.notes.findMany({
    where: and(
      eq(notes.author, userId),
      or(like(notes.title, `%${term}%`), like(notes.content, `%${term}%`)),
    ),
  });

  if (!results) {
    throw new GraphQLError(`no notes contain ${term} terms`, {
      extensions: { code: 404 },
    });
  }

  const transform = results.map(({ created_at, updated_at, ...rest }) => ({
    ...rest,
    createdAt: created_at,
    updatedAt: updated_at,
  }));

  return transform;
};

type AddNote = {
  title: string;
  content: string;
  author: number;
};

const createNote = async (note: AddNote, userId: number) => {
  const newNote = await db
    .insert(notes)
    .values({ ...note, author: userId })
    .returning({
      id: notes.id,
      title: notes.title,
      content: notes.content,
      author: notes.author,
      createdAt: notes.created_at,
      updatedAt: notes.updated_at,
    });
  return newNote[0];
};

const noteService = {
  getPaginatedNotes,
  getAllNotes,
  getNoteById,
  searchNotes,
  createNote,
};

export default noteService;
