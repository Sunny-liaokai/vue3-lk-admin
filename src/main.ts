import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "@/router";
import { setupStore } from "@/store";
import { setupAntd, setupAssets } from "@/plugins";

const app = createApp(App);

function setupPlugins() {
  // 注册全局常用的ant-design-vue组件
  setupAntd(app);
  // 加载静态资源
  setupAssets();
}

async function setupApp() {
  // 挂载pinia状态管理
  setupStore(app);
  //挂载路由
  await setupRouter(app);

  app.mount("#app");
}

setupPlugins();

setupApp().then();
