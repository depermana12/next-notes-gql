import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = table("users", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  username: t.varchar({ length: 255 }).unique().notNull(),
  email: t.varchar({ length: 255 }).unique().notNull(),
  password: t.text().notNull(),
  created_at: t.timestamp().defaultNow().notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  notes: many(notes),
}));

export const notes = table("notes", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  title: t.varchar({ length: 255 }).notNull(),
  content: t.text().notNull(),
  author: t.integer("user_id").notNull(),
  created_at: t.timestamp().defaultNow().notNull(),
  updated_at: t.timestamp(),
});

export const noteRelations = relations(notes, ({ one }) => ({
  owner: one(users, { fields: [notes.author], references: [users.id] }),
}));

export const tags = table("tags", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar({ length: 255 }).unique().notNull(),
});

export const tagRelations = relations(tags, ({ many }) => ({
  notes: many(notes),
}));

export const notesTags = table(
  "notes_tags",
  {
    note_id: t.integer("note_id").notNull(),
    tag_id: t.integer("tag_id").notNull(),
  },
  (table) => {
    return {
      pk: t.primaryKey({ columns: [table.note_id, table.tag_id] }),
    };
  },
);

export const notesTagsRelations = relations(notesTags, ({ one }) => ({
  note: one(notes, { fields: [notesTags.note_id], references: [notes.id] }),
  tag: one(tags, { fields: [notesTags.tag_id], references: [tags.id] }),
}));

export type InsertTag = typeof tags.$inferInsert;
export type SelectTag = typeof tags.$inferSelect;
export type InsertNoteTag = typeof notesTags.$inferInsert;
export type SelectNoteTag = typeof notesTags.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export type InsertNote = typeof notes.$inferInsert;
export type SelectNote = typeof notes.$inferSelect;
