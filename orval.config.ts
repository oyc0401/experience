import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "https://image-222224288742.us-central1.run.app/v3/api-docs",
    },
    output: {
      target: "src/api/generated.ts",
      client: "react-query",
      httpClient: "fetch",
      override: {
        mutator: {
          path: "src/api/client.ts",
          name: "customFetch",
        },
      },
    },
  },
});
