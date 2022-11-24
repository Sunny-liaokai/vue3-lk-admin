/**
 * 异步加载本地路由文件
 */

export const asyncRouter = {};

const modulesFiles = require.context(".", true, /\.ts$/);

modulesFiles.keys().forEach((path) => {
  if (path.startsWith("./index.")) return;
  const value = modulesFiles(path).default;

  //mouted
  Object.keys(value).forEach((element) => {
    asyncRouter[element] = value[element];
  });
});

console.log("asyncRouter", asyncRouter);
