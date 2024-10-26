/* eslint-disable @typescript-eslint/no-explicit-any */
import db from "@/app/db/db";
import { users, notes, tags, InsertNote, SelectNote } from "@/app/db/schema";
import { eq, and } from "drizzle-orm";
import { authContext } from "@/app/types/types";
import { signUp, signIn } from "@/app/utils/auth";
import { GraphQLError } from "graphql";
import userService from "@/lib/userService";
import noteService from "@/lib/noteService";

const resolvers = {
  Query: {
    me: async (_: any, __: any, ctx: authContext) => {
      if (!ctx.user) {
        throw new GraphQLError("Unauthorized", { extensions: { code: 401 } });
      }
      return ctx.user;
    },
    user: async (_: any, { id }: { id: number }, ctx: authContext) => {
      if (!ctx.user)
        throw new GraphQLError("Unauthorized", { extensions: { code: 401 } });

      return await userService.getUserById(id);
    },
    notes: async (_: any, __: any, ctx: authContext) => {
      if (!ctx.user)
        throw new GraphQLError("Unauthorized", { extensions: { code: 401 } });

      return await noteService.getAllNotes(ctx.user.id);
    },
    paginatedNotes: async (
      _: any,
      { limit, offset }: { limit: number; offset: number },
      ctx: authContext,
    ) => {
      if (!ctx.user)
        throw new GraphQLError("Unauthorized", { extensions: { code: 401 } });

      const { notes, total } = await noteService.getPaginatedNotes(
        ctx.user.id,
        limit,
        offset,
      );
      return { notes, total };
    },
    note: async (_: any, { id }: { id: number }, ctx: authContext) => {
      if (!ctx.user)
        throw new GraphQLError("Unauthorized", { extensions: { code: 401 } });

      const notes = await noteService.getNoteById(id, ctx.user.id);
      console.log(notes);
      return notes;
    },
    searchNotes: async (
      _: any,
      { term }: { term: string },
      ctx: authContext,
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("Unauthorized", { extensions: { code: 401 } });
      }

      return await noteService.searchNotes(term, ctx.user.id);
    },
    tags: async (_: any, __: any, ctx: authContext) => {
      if (!ctx.user) {
        throw new GraphQLError("Unauthorized", { extensions: { code: 401 } });
      }

      return await db.query.tags.findMany({
        where: eq(tags.id, ctx.user.id),
      });
    },

    tag: async (_: any, { id }: { id: number }, ctx: authContext) => {
      if (!ctx.user) {
        throw new GraphQLError("Unauthorized", { extensions: { code: 401 } });
      }

      const tag = await db.query.tags.findFirst({
        where: and(eq(tags.id, id), eq(tags.id, ctx.user.id)),
      });

      if (!tag) {
        throw new GraphQLError("Tag not found", { extensions: { code: 404 } });
      }

      return tag;
    },
  },
  Mutation: {
    register: async (
      _: any,
      {
        input,
      }: { input: { username: string; email: string; password: string } },
    ) => {
      const newUser = await signUp(input);

      if (!newUser || !newUser.user || !newUser.token)
        throw new GraphQLError("Unauthorized", { extensions: { code: 401 } });

      return { ...newUser.user, token: newUser.token };
    },
    login: async (
      _: any,
      { input }: { input: { email: string; password: string } },
    ) => {
      const user = await signIn(input);

      if (!user || !user.token || !user.user)
        throw new GraphQLError("Unauthorized", { extensions: { code: 401 } });

      return { ...user.user, token: user.token };
    },
    addNote: async (
      _: any,
      { input }: { input: InsertNote },
      ctx: authContext,
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("Unauthorized", { extensions: { code: 401 } });
      }

      return await noteService.createNote(input, ctx.user.id);
    },
    updateNote: async (
      _: any,
      { id, input }: { id: number; input: SelectNote },
      ctx: authContext,
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("Unauthorized", { extensions: { code: 401 } });
      }

      const updated = await db
        .update(notes)
        .set({ ...input, updated_at: new Date() })
        .where(and(eq(notes.id, id), eq(notes.author, ctx.user.id)))
        .returning({
          id: notes.id,
          title: notes.title,
          content: notes.content,
          createdAt: notes.created_at,
          updatedAt: notes.updated_at,
        });

      return updated[0];
    },
    removeNote: async (_: any, { id }: { id: number }, ctx: authContext) => {
      if (!ctx.user) {
        throw new GraphQLError("Unauthorized", { extensions: { code: 401 } });
      }

      const deleted = await db
        .delete(notes)
        .where(and(eq(notes.id, id), eq(notes.author, ctx.user.id)))
        .returning();

      return deleted.length > 0;
    },
  },
  Note: {
    author: async (note: any, _: any, ctx: authContext) => {
      if (!ctx.user) {
        throw new GraphQLError("Unauthorized", { extensions: { code: 401 } });
      }

      return await db.query.users.findFirst({
        where: eq(users.id, note.id),
      });
    },
  },
  User: {
    notes: async (user: any, _: any, ctx: authContext) => {
      if (!ctx.user) {
        throw new GraphQLError("Unauthorized", { extensions: { code: 401 } });
      }

      const result = await db.query.notes.findMany({
        where: eq(notes.author, user.id),
      });

      return result.map((note) => ({
        ...note,
        createdAt: note.created_at,
        updatedAt: note.updated_at,
      }));
    },
  },
};

export default resolvers;
