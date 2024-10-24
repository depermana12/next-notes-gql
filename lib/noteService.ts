import db from "@/app/db/db";
import { notes } from "@/app/db/schema";
import { count, eq, asc } from "drizzle-orm";

const getPaginatedNotes = async (
  userId: number,
  limit: number,
  offset: number,
) => {
  const results = await db
    .select()
    .from(notes)
    .where(eq(notes.author, userId))
    .orderBy(asc(notes.created_at))
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

const noteService = { getPaginatedNotes, getAllNotes };

export default noteService;
