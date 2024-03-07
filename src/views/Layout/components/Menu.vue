<template>
  <div class="left">
    <div class="logo">
      <img class="logo-img" src="/hooyoo.gif" alt="" />
      <div class="logo-title" v-if="!isCollapse">Component</div>
    </div>
    <div>
      <el-menu
        text-color="#fff"
        :default-active="getActiveMenu(route.path)"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        router
      >
        <el-menu-item index="/home">
          <el-icon><Monitor /></el-icon>
          <template #title>{{ $t('home') }}</template>
        </el-menu-item>
        <el-menu-item index="/markdown">
          <el-icon><SwitchFilled /></el-icon>
          <template #title>{{ $t('markdown') }}</template>
        </el-menu-item>
        <el-menu-item index="/rich">
          <el-icon><Orange /></el-icon>
          <template #title>{{ $t('rich') }}</template>
        </el-menu-item>
        <el-menu-item index="/toast">
          <el-icon><Bell /></el-icon>
          <template #title>{{ $t('toast') }}</template>
        </el-menu-item>
        <el-menu-item index="/excel">
          <el-icon><Grid /></el-icon>
          <template #title>{{ $t('excel') }}</template>
        </el-menu-item>
        <el-menu-item index="/drag">
          <el-icon><Rank /></el-icon>
          <template #title>{{ $t('drag') }}</template>
        </el-menu-item>
        <el-menu-item index="/echarts">
          <el-icon><DataAnalysis /></el-icon>
          <template #title>{{ $t('echarts') }}</template>
        </el-menu-item>
        <el-menu-item index="/qrcode">
          <el-icon><FullScreen /></el-icon>
          <template #title>{{ $t('qrcode') }}</template>
        </el-menu-item>
        <el-menu-item index="/websocket">
          <el-icon><Phone /></el-icon>
          <template #title>{{ $t('websocket') }}</template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  Orange,
  Bell,
  Rank,
  FullScreen,
  Phone,
  DataAnalysis,
  Grid,
  SwitchFilled,
  Monitor
} from '@element-plus/icons-vue'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCollapseStore } from '../../../store/collapse'
import { useWindowSizeStore } from '../../../store/windowStore'

const collapseStore = useCollapseStore()

const route = useRoute()
const getActiveMenu = (path: string) => {
  // 检查路径是否以某个标识符开头，例如 '/game'
  if (path.startsWith('/game')) {
    return '/game'
  } else if (path.startsWith('/mine')) {
    return '/mine'
  }
  return path
}
const isCollapse = computed(() => collapseStore.collapse)
const windowSize = useWindowSizeStore()
window.addEventListener('resize', () => {
  windowSize.updateWindowSize()
})
watch(
  () => windowSize.width,
  () => {
    if (windowSize.width <= 780) {
      collapseStore.setCollapse(true)
    } else {
      collapseStore.setCollapse(false)
    }
  }
)
</script>
<style lang="less">
.el-menu {
  background-color: #191a23 !important;
  border: none !important;
  .el-menu-item:hover {
    background-color: #1c2f55;
  }
  :deep(.el-sub-menu) .el-sub-menu__title:hover {
    background-color: #1c2f55 !important;
  }
  .el-menu-item {
    background-color: #191a23;
  }
}
.left {
  width: 100%;
  height: 100%;
  // border-right: 2px solid #dcdfe6;
  background-color: #191a23 !important;
  display: flex;
  flex-direction: column;
  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    justify-content: center;
    // border-bottom: 1px solid skyblue;
    .logo-img {
      display: block;
      height: 60%;
      border-radius: 50%;
    }
    .logo-title {
      color: #fff;
      font-size: 20px;
      margin-left: 10px;
    }
  }
}

:deep(.el-menu) {
  border: none;
}
.el-menu-item.is-active {
  background: #1c2f55;
  // border-radius: 10px;
  // margin: 0px 10px;
}
</style>
