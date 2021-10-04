/* global MediaRecorder $ */
/*eslint no-console: 0*/

const record = document.getElementById("record");
const stop = document.getElementById("stop");
const play = document.getElementById("play");

if (!navigator.mediaDevices) {
  alert("getUserMedia support required to use this page");
}

const chunks = [];
let onDataAvailable = (e) => {
  if (e.data.size > 0) {
    chunks.push(e.data);
  } else {
    // ...
  }
};

// Not showing vendor prefixes.
navigator.mediaDevices
  .getUserMedia({
    audio: true,
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
  })
  .then((mediaStream) => {
    const recorder = new MediaRecorder(mediaStream, {
      mimeType: "video/webm",
    });
    recorder.ondataavailable = onDataAvailable;
    const video = document.querySelector("video");
    video.srcObject = mediaStream;

    record.onclick = () => {
      recorder.start();
      document.getElementById("status").innerHTML = "recorder started";
      console.log(recorder.state);
      console.log("recorder started");
    };

    stop.onclick = () => {
      recorder.stop();
      console.log(recorder.state);
      document.getElementById("status").innerHTML = "recorder started";
      console.log("recorder stopped");
    };

    video.onloadedmetadata = (e) => {
      console.log("onloadedmetadata", e);
    };

    recorder.onstop = (e) => {
      console.log("e", e);
      console.log("chunks", chunks);
      const bigVideoBlob = new Blob(chunks, {
        type: "video/webm",
      });

      let formData = new FormData();
      formData.append("fname", "gravacao.webm");
      formData.append("data", bigVideoBlob);

      var request = new XMLHttpRequest();
      request.open("POST", "/");
      request.send(formData);
    };
  })
  .catch(function (err) {
    console.log("error", err);
  });
