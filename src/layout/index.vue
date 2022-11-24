<template>
  <Layout class="layout">
    <Layout.Sider> </Layout.Sider>
    <Layout>
      <Layout.Header> 2 </Layout.Header>
      <Layout.Content>
        <RouterView />
      </Layout.Content>
    </Layout>
  </Layout>
</template>

<script lang="ts" setup>
import { Layout } from "ant-design-vue";
</script>

<style scoped lang="less">
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .ant-layout {
    overflow: hidden;
  }

  .layout-content {
    flex: none;
  }
}
</style>
