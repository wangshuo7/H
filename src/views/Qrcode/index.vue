<template>
  <session>
    输入地址：<el-input style="width: 200px;" v-model="text" type="text"></el-input>
    <div class="box" v-if="text"> 
      <img :src="qrcode" alt="QR Code" />
    </div>
  </session>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useQRCode } from '@vueuse/integrations/useQRCode'
const text = ref<any>('https://www.baidu.com')
const qrcode = useQRCode(text.value ? text : 'https://www.baidu.com')
</script>

<style lang="less" scoped>
.box {
  margin-top: 20px;
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
