# Websocket Chat
nodejs express socketiojs cryptojs jquery bootstrap  

nodejs
  "dependencies": {
    "bufferutil": "^4.0.1",
    "express": "^4.17.1",
    "forever": "^3.0.2",
    "socket.io": "^2.3.0",
    "utf-8-validate": "^5.0.2"
  }
  

### install: 
npm install  
### run: 
npm start  

### website: 
localhost:3000

### Backgrounder
forever start server.js

### 说明
发送信息前，请输入密码，发送的消息使用密码进行AES加密后发送给服务器，服务器会将加密后的信息，转发给频道内所有的人，其他人收到信息后，需要密码才可以解密内容，如果密码不正确，则无法看到消息内容。
