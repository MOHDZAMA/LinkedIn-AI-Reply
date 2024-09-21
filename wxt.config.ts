import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    manifest_version: 3,
    name: "LinkedIn AI Assistant",
    version: "1.0",
    description: "AI assistant for LinkedIn messages.",
    permissions: ["activeTab", "scripting"],
  },
});
