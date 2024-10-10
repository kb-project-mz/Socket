const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// balance 데이터 프론트로 보내기
app.post('/updateBalance', (req, res) => {
  if (req.body) {
    io.emit('balanceUpdate', req.body);
  }
  res.sendStatus(200);
});

// auth 데이터 프론트로 보내기
app.post('/updateAuth', (req, res) => {
  // console.log(req.body);
  io.emit('authUpdate', req.body);
  res.sendStatus(200);
});

app.post('/updateTodayMetrics', (req, res) => {
  if (req.body) {
    io.emit('todayUpdate', req.body);
    console.log('today data : ', req.body);
  }
  res.sendStatus(200);
});

app.post('/updateTotalMetrics', (req, res) => {
  if (req.body) {
    io.emit('totalUpdate', req.body);
    console.log('total data : ', req.body);
  }
  res.sendStatus(200);
});

server.listen(3000, () => {
  console.log('Socket.IO server running on port 3000');
});
