const { defineConfig } = require("@vue/cli-service");
export default defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8091,
    proxy: {
      "^/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
});
