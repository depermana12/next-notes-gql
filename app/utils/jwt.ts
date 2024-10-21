import jwt from "jsonwebtoken";
import db from "../db/db";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";

export const createUserToken = (userId: number) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string);
  return token;
};

export const verifyUserToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  } catch (error) {
    // TODO: error handling
    console.log("verify error", error);
    return null;
  }
};

export const getUserFromToken = async (header?: string) => {
  if (!header || !header.startsWith("Bearer ")) {
    // TODO: error handling
    console.error("invalid token");
    return null;
  }
  const [, token] = header.split(" ");

  if (!token) {
    // TODO: error handling
    console.error("no token in header");
    return null;
  }

  let id: number;

  try {
    const user = verifyUserToken(token) as { id: number };
    id = user.id;
  } catch (error) {
    // TODO: error handling
    console.error("invalid jwt", error);
    return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
    columns: {
      id: true,
      username: true,
      email: true,
      created_at: true,
    },
  });

  return user;
};
