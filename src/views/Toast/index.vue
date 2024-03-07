<template>
  <session>
    <el-button @click="showToast">显示通知</el-button>
  </session>
</template>

<script lang="ts" setup>
// import HToast from '../../components/HToast/index.vue'
import { useToast } from 'vue-toastification'
const Toast = useToast()
function showToast() {
  // type 5种 'Default'|'Success'|'Info'|'Warning'|'Error'
  Toast.success('toast', <any>{
    position: 'bottom-right', // 显示位置 'top-right'|'top-center'|'top-left'|'bottom-right'|'bottom-center'|'bottom-left'
    timeout: 4019, // 显示多长时间
    closeOnClick: false, // 点击关闭通知
    pauseOnFocusLoss: true, // 当失去焦点时暂停，例如alt+tab切换应用
    pauseOnHover: true, // 触发hover时暂停
    draggable: true, // 可拖拽关闭通知
    draggablePercent: 0.42, // 拖拽的阈值
    showCloseButtonOnHover: true, // 触发hover时显示关闭图标
    hideProgressBar: false, // true时隐藏下方时间进度条
    closeButton: 'button', // 值为false时，隐藏关闭按钮
    icon: true, // false 取消图标, 'fas fa-rocke' 火箭图标, 'MyIconComponent' 设置自己的图标
    rtl: false // 内容向右对齐
  })
}
</script>

<style lang="less" scoped></style>
