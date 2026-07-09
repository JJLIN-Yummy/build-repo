import { baseConfig } from '@build/vite-config';
import { defineConfig, mergeConfig } from 'vite';

export default defineConfig((option) => {
  return {
    ...mergeConfig(baseConfig(option), {}),
  };
});
