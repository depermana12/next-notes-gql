"use client";

import { PropsWithChildren, useMemo } from "react";
import {
  UrqlProvider,
  ssrExchange,
  fetchExchange,
  createClient,
} from "@urql/next";
import { cacheExchange } from "@urql/exchange-graphcache";
import { url } from "@/app/utils/url";
import { getToken } from "@/app/utils/token";

export default function GQLProvider({ children }: PropsWithChildren) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== "undefined",
    });

    const client = createClient({
      url,
      exchanges: [
        cacheExchange({
          keys: {
            PaginatedNotes: () => null,
          },
        }),
        ssr,
        fetchExchange,
      ],
      fetchOptions: () => {
        const token = getToken();

        return token
          ? {
              headers: { authorization: `Bearer ${token}` },
            }
          : {};
      },
    });

    return [client, ssr];
  }, []);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
}
