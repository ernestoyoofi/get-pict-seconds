const execCLI = require("child_process")
const fs = require("fs")

function getCameraLoop(callback, saved = "pict.png") {
  const camPic = () => {
    execCLI.exec(`termux-camera-photo ${saved}`, (err, results, error) => {
      if(err) {
        callback({
          isSuccess: false,
          outputErr: error,
          data: undefined,
          time: new Date()
        })
      } else {
        callback({
          isSuccess: true,
          outputErr: undefined,
          data: fs.readFileSync(saved),
          time: new Date()
        })
      }
      camPic()
    })
  }
  camPic()
}

module.exports = getCameraLoop
