import { defineConfig, loadEnv } from "vite";

import path from "path";

import { visualizer } from "rollup-plugin-visualizer";
import type { IViteEnv } from "../build/types";
import { pathMap, wrapperEnv } from "../build/utils";
import { createVitePlugins } from "../build/vite/plugin";

/// <reference type="vitest" />
export default defineConfig(({ mode }) => {
  const root = pathMap.root;
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv<IViteEnv>(env);
  const { VITE_PUBLIC_PATH } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH,
    root: root,
    // esbuild:{
    //     jsxInject: `import * as React from 'react'`
    // },
    resolve: {
      extensions: [".ts", ".vue", ".js", ".json"],
      alias: [
        {
          find: "@",
          replacement: path.resolve(pathMap.root, "./src/"),
        },
        {
          find: "#",
          replacement: path.resolve(pathMap.root, "./src/assets/"),
        },
      ],
    },
    css: {
      postcss: {},
    },
    plugins: createVitePlugins(),
    server: {},
    build: {
      rollupOptions: {
        plugins: [visualizer()], // 打包后自动打开可视化报告
      },
    },
  };
});
