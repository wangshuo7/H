<template>
  <div>
    <Vditor v-model="content" @input="handleInput" />
  </div>
</template>

<script lang="ts" setup>
import 'vditor/dist/index.css'
import Vditor from 'vditor'
const content = 'Hello, Vditor!'
const handleInput = (value: any) => {
  console.log('Input', value)
}
</script>

<style lang="less" scoped></style>
