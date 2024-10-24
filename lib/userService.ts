import db from "@/app/db/db";
import { users } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { GraphQLError } from "graphql";

const getUserById = async (id: number) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });

  if (!user)
    throw new GraphQLError("User not found", { extensions: { code: 404 } });

  return user;
};

const userService = { getUserById };

export default userService;
