import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// Injects a link to popup.css into the built index.html, so the popup
// window's fixed size only applies to the extension build, not the website.
function injectPopupCss() {
  return {
    name: "inject-popup-css",
    transformIndexHtml(html) {
      return html.replace(
        "</head>",
        '    <link rel="stylesheet" href="popup.css" />\n  </head>',
      );
    },
  };
}

// Build config for packaging the app as an unpacked Chrome extension.
// Output goes to /extension, ready for "Load unpacked" in chrome://extensions.
export default defineConfig({
  plugins: [react(), injectPopupCss()],
  publicDir: path.resolve(__dirname, "extension-src"),
  build: {
    outDir: "extension",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
    },
  },
});
