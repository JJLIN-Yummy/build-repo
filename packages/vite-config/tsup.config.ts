import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  target: "node16",
  // 外部依赖，不打包进产物，交给使用方自行安装
  // external: ["vite", "rollup-plugin-visualizer"],
});
