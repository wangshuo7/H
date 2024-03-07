<!-- api:https://www.wangeditor.com/ -->
<template>
  <div>
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onChange="handleChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// import { useLanguageStore } from '../../store/languageStore'
// import { i18nChangeLanguage } from '@wangeditor/editor'
// const languageStore = useLanguageStore()
// const locale = computed(() =>
//   languageStore.locale == 'en' ? 'en' : 'zh-Cn'
// )
// nextTick(()=> {
//   i18nChangeLanguage(locale.value)
// })
const props = defineProps<{
  value: string
}>()
const mode = 'default'
const editorRef = shallowRef<any>()
const valueHtml = ref<string>('')
const toolbarConfig = {
  excludeKeys: ['fullScreen']
}
const editorConfig = { placeholder: '请输入内容...' }
const emit = defineEmits(['getHtml'])
function handleChange(editor: any) {
  editorRef.value = editor
  emit('getHtml', valueHtml.value)
}
onBeforeUnmount(() => {
  const editor: any = editorRef.value
  if (editor == null) return
  editor.destroy()
})
nextTick(() => {
  valueHtml.value = props.value
})
watch(
  () => props.value,
  (newVal) => {
    valueHtml.value = newVal
  }
)
</script>

<style lang="less" scoped></style>
