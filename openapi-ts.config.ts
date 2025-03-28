import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "https://api-dev.openmicmpls.com/openapi.json",
  output: "src/client",
  plugins: ["@hey-api/client-fetch"],
});
