<template>
  <session>
    <div style="margin-bottom: 20px">
      连接状态：
      <el-tag :type="state ? '' : 'danger'">{{
        state ? '已连接' : '未连接'
      }}</el-tag>
    </div>
    <div style="margin-bottom: 20px">
      <el-input
        clearable
        style="width: 300px; margin-right: 20px"
        placeholder="请输入链接地址"
        v-model="ws"
      >
        <template #prepend>服务地址</template>
      </el-input>
      <el-button :type="state ? 'danger' : 'primary'" @click="connectWs">{{
        state ? '断开' : '连接'
      }}</el-button>
    </div>
    <div>
      <el-input style="width: 200px" v-model="intervalTime">
        <template #prepend>每隔</template>
        <template #append>秒</template>
      </el-input>
      <el-input style="width: 200px" v-model="intervalContent">
        <template #prepend>发送内容</template>
      </el-input>
      <el-button
        v-if="intervalLock"
        style="margin-left: 10px"
        type="danger"
        @click="onEndSend"
        >停止发送</el-button
      >
      <el-button
        v-else
        :disabled="!intervalTime || !intervalContent"
        style="margin-left: 10px"
        type="primary"
        @click="onStartSend"
        >开始发送</el-button
      >
    </div>
    <el-input
      v-model="message"
      type="textarea"
      placeholder="请输入..."
      style="width: 400px; margin: 20px 0 10px"
    ></el-input>
    <div>
      <el-button type="primary" @click="send">发送到服务端</el-button>
      <!-- <el-button @click="close">断开</el-button> -->
    </div>
  </session>
  <session>
    <div class="title">
      <span>消息记录：</span>
      <el-button text type="primary" @click="clearLog">清空记录</el-button>
    </div>
    <el-scrollbar max-height="700px">
      <div v-for="(item, index) in serverMessage" :key="index">
        <div style="margin: 20px 0 10px">
          <span>
            <el-text type="primary" size="large" v-if="item.type == 'get'">
              收到消息
            </el-text>
            <el-text type="success" size="large" v-else style="">
              发送消息
            </el-text>
          </span>
          <span>{{ item.time }}</span>
        </div>
        <div style="width: 1000px; word-break: break-all">{{ item.msg }}</div>
      </div>
    </el-scrollbar>
  </session>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
// import { useNow, useDateFormat } from '@vueuse/core'
import Moment from 'moment'
const state = ref<boolean>(false)
const clock = ref<boolean>(false)
const message = ref<string>('')
const ws = ref<string>('ws://127.0.0.1:8080')
const serverMessage = ref<any[]>([])
const intervalTime = ref<any>(2)
const intervalContent = ref<any>('PING')
const intervalId = ref<any>(null)
const intervalLock = ref<any>(false)
function onStartSend() {
  if (!state.value) {
    return ElMessage.warning('Websocket 未连接')
  }
  intervalLock.value = true
  intervalId.value = setInterval(() => {
    socket.send(JSON.stringify(intervalContent.value))
    const data = {
      type: 'send',
      time: Moment().format('MM-DD HH:MM:ss'),
      msg: intervalContent.value
    }
    serverMessage.value.push(data)
  }, +intervalTime.value * 1000)
}
function onEndSend() {
  intervalLock.value = false
  clearInterval(intervalId.value)
}
let socket: any
function connectWs() {
  if (state.value) {
    return close()
  }
  socket = new WebSocket(ws.value)
  socket.onopen = () => {
    state.value = true
    ElMessage.success('Websocket 已连接')
  }
  // 监听服务器发送的消息
  socket.onmessage = (event: any) => {
    const msg = event.data
    console.log('Received from server:', msg)
    const data = {
      msg: msg,
      time: Moment().format('MM-DD HH:MM:ss'),
      type: 'get'
    }
    serverMessage.value.push(data)
    console.log('111', serverMessage.value)
  }
  // 监听连接关闭事件
  socket.onclose = () => {
    ElMessage.warning('Websocket 连接已断开')
    state.value = false
  }
}
function send() {
  clock.value = true
  connect()
  message.value = ''
}
function close() {
  clock.value = false
  disconnect()
}
function connect() {
  if (state.value) {
    // 发送消息给服务器
    const data = {
      msg: message.value,
      time: Moment().format('MM-DD HH:mm:ss'),
      type: 'send'
    }
    socket.send(JSON.stringify(data))
    serverMessage.value.push(data)
  } else {
    ElMessage.warning('WebSocket 未连接')
  }
}

function disconnect() {
  // 关闭 WebSocket 连接
  socket?.close()
}
// 清空记录
function clearLog() {
  serverMessage.value = []
}
</script>

<style lang="less" scoped>
.title {
  margin-bottom: 20px;
  font-size: 20px;
}
</style>
