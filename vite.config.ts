import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import * as child from "child_process";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
    COMMIT_HASH: JSON.stringify(child.execSync("git rev-parse --short HEAD").toString().trim())
  },
})
