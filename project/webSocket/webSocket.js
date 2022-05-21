import {WebSocketServer} from 'ws'
import {createServer} from 'http'

const createWebSocketServer = (httpServer) => {
    const wss = new WebSocketServer({
        noServer: true
    })
    // 握手事件
    httpServer.on('upgrade', (req, socket, head) => {
        if (req.headers['sec-websocket-protocol'] === 'conn') {
            wss.handleUpgrade(req, socket, head, (ws) => {
                wss.emit('connection', ws, req)
            })
        }
    })
    // 连接事件
    wss.on('connection', (ws) => {
        // 往客户端发送 connected 事件，我们使用 type 来进行事件标识，这样方便客户端处理
        ws.send(JSON.stringify({type: 'connected'}))
        // message 监听事件事件，客户端传来的消息都走这里。
        ws.on('message', (data, isBinary) => {
            // 由于我们无法确定传过来的数据类型，因此要用 isBinary 区分 buffer 转化为字符串
            const receiveData = isBinary ? data : data.toString()
            console.log(receiveData)
        })
    })


    wss.on('error', (e) => {
        const {code} = e
        if (code !== 'EADDRINUSE') {
            console.error(
                `WebSocket server error:\n${e.stack || e.message}`,
            );
        }
    });

    // 返回 发送信息的方法 、 关闭的方法 还有 对应的服务 wss
    return {
        send(message) {
            wss.clients.forEach((ws) => {
                if (ws.readyState === 1) {
                    ws.send(message)
                }
            })
        },
        wss,
        close() {
            wss.close()
        }
    }
}

const httpServer = createServer()

const ws = createWebSocketServer(httpServer)

const sendMessage = (type, data) => {
    ws.send(JSON.stringify({type, data}))
}

setInterval(() => {
    sendMessage('console', `服务端定时向客户端发送消息 时间：${new Date().toLocaleString()}`)
}, 3000)

httpServer.listen(3000, () => {
    console.log('服务器开启')
})
