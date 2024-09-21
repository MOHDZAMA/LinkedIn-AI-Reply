import injectAIIcon from "../components/injectAIIcon";
import "~/assets/tailwind.css";

export default defineContentScript({
  matches: ["*://*.google.com/*", "*://*.linkedin.com/*"],
  main() {
    injectAIIcon();
  },
});
