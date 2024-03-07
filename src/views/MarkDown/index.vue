<template>
  <session style="height: 600px">
    <div class="vditor" id="vditor"></div>
  </session>
</template>

<script lang="ts">
export default {
  name: 'Markdown'
}
</script>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
const vditor = ref<Vditor | null>(null)
onMounted(() => {
  vditor.value = new Vditor('vditor', {
    after: () => {
      vditor.value!.setValue('Vue Composition API + Vditor + TypeScript')
    },
    mode: 'wysiwyg',
    height: '500px',
    icon: 'material',
    // theme: 'dark'
    preview: {
      delay: 500, // 延迟渲染时间，单位毫秒
      mode: 'both', // 'both' 表示左右都显示预览，'editor' 表示只显示编辑器，'preview' 表示只显示预览
      maxWidth: 500
    }
  })
})
</script>

<style lang="less" scoped>
.vditor {
  margin-top: 20px;
}
</style>
