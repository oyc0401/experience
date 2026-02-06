import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchInterval: 10 * 1000000,
      refetchOnWindowFocus: false,
    },
  },
});
