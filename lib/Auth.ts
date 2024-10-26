/* eslint-disable @typescript-eslint/no-explicit-any */
import { authContext } from "@/app/types/types";
import { GraphQLError, GraphQLResolveInfo } from "graphql";

type ResolverFunction<TArgs = unknown, TResult = any> = (
  parent: unknown,
  args: TArgs,
  ctx: authContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

const authCtx = (resolver: ResolverFunction) => {
  return async (
    parent: unknown,
    args: any,
    ctx: authContext,
    info: GraphQLResolveInfo,
  ) => {
    if (!ctx.user) {
      throw new GraphQLError("Unauthorized access", {
        extensions: { code: 401 },
      });
    }
    return resolver(parent, args, ctx as authContext, info);
  };
};

export default authCtx;
