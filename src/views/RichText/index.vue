<template>
  <session>
    <HEditor :value="editorValue" @getHtml="getEditorValue"></HEditor>
    <div class="buttons" style="margin: 20px 0">
      <el-button @click="useValue" type="primary">获取</el-button>
    </div>
    <div class="show">{{ editValue }}</div>
  </session>
</template>

<script lang="ts">
export default {
  name: 'Rich'
}
</script>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import HEditor from '../../components/HEditor/index.vue'
const editorValue = ref<string>('')
const editValue = ref<any>()
function getEditorValue(val: any) {
  editValue.value = val
}
function useValue() {
  console.log(editValue.value)
}
onMounted(() => {
  setTimeout(() => {
    const avalue = '<h1>xixixixi</h1>'
    editorValue.value = avalue
  }, 1000)
})
</script>

<style lang="less" scoped>

.show {
  width: 100%;
  min-height: 300px;
  border: 1px solid skyblue;
  padding: 10px;
}
</style>
