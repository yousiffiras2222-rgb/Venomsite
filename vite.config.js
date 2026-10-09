import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Fixed port so .claude/launch.json and the browser preview always agree.
export default defineConfig({
  plugins: [react()],
  server: { port: 5317, strictPort: true },
  preview: { port: 5318, strictPort: true },
});
