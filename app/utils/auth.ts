import pwd from "./pwd";
import { createUserToken } from "./jwt";
import db from "../db/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

interface SignInArgs {
  email: string;
  password: string;
}

export const signIn = async ({ email, password }: SignInArgs) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    // TODO: error handling
    console.error("user not found");
    return null;
  }

  const passwordMatch = await pwd.compare(password, user.password);

  if (!passwordMatch) {
    // TODO: error handling
    console.log("password error");
    return null;
  }

  const token = createUserToken(user.id);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: nope, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};

interface SignUpArgs {
  username: string;
  email: string;
  password: string;
}

export const signUp = async ({ username, email, password }: SignUpArgs) => {
  const hashedPassword = await pwd.hash(password);

  const rows = await db
    .insert(users)
    .values({ username, email, password: hashedPassword })
    .returning({
      id: users.id,
      username: users.username,
      email: users.email,
      created_at: users.created_at,
    });

  const user = rows[0];
  const token = createUserToken(user.id);

  return { user, token };
};
