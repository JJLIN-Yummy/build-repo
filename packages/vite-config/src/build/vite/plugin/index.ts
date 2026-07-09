// import react from "@vitejs/plugin-react-swc"
// import inject from "@rollup/plugin-inject"
// import vitePluginVueMonitor from "./vitePluginStart"
// import vue from "@vitejs/plugin-vue"

import { visualizer } from "rollup-plugin-visualizer";

export function createVitePlugins() {
  return [
    // have to
    // vue(),
    // react(),
    // vitePluginVueMonitor(),
    // inject({
    //     "React": "react",
    //     "styled":"styled-_components",
    //   }),

    visualizer({
      open: true,
      filename: "stats.html",
      gzipSize: true,
    }),
  ];
}
