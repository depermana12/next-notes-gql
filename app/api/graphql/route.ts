import { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import typeDefs from "./schemas";
import resolvers from "./resolvers";
import { getUserFromToken } from "@/app/utils/jwt";

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (request) => {
    const user = await getUserFromToken(
      request.headers.get("authorization") ?? "",
    );
    return {
      request,
      user,
    };
  },
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
