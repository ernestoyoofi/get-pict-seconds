const socket = require("socket.io")
const express = require("express")
const http = require("http")
const cam = require("./cam")
const app = express()
const server = http.createServer(app)
const io = new socket.Server(server)
const port = process.env.PORT || 3400

cam((taked) => {
  if(taked.isSuccess) {
    const data = Buffer.from(taked.data).toString("base64")
    const res = `data:image/png;base64,${data}`
    io.emit("new-pict", {
      src: res,
      time: taked.time.toString()
    })
  }
})

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/index.html")
})

server.listen(port, () => {
  console.log(`Running in http://localhost:${port}`)
})
