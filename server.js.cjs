const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 3001 })

server.on('connection', (socket) => {
  console.log('Client connected')

  // 监听来自客户端的消息
  socket.on('message', (message) => {
    console.log(`Received: ${message}`)

    // 向客户端发送消息
    socket.send(message)
  })

  // 监听连接关闭事件
  socket.on('close', () => {
    console.log('Client disconnected')
  })
})
