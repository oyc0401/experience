import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchInterval: 1 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});
