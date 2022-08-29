Template.publicPagesKesfet.onCreated(function () {
  context = new AudioContext();
  source = null;
  audioBuffer = null;
});

Template.publicPagesKesfet.onRendered(function () {
  var bufferToBase64 = function (buffer) {
    var bytes = new Uint8Array(buffer);
    var len = buffer.byteLength;
    var binary = "";
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  var base64ToBuffer = function (buffer) {
    var binary = window.atob(buffer);
    var buffer = new ArrayBuffer(binary.length);
    var bytes = new Uint8Array(buffer);
    for (var i = 0; i < buffer.byteLength; i++) {
      bytes[i] = binary.charCodeAt(i) & 0xff;
    }
    return buffer;
  };
  function initSound(arrayBuffer) {
    var base64String = bufferToBase64(arrayBuffer);
    var audioFromString = base64ToBuffer(base64String);
    document.getElementById("encodedResult").value = base64String;
    console.log(base64String.length);
    context.decodeAudioData(
      audioFromString,
      function (buffer) {
        // audioBuffer is global to reuse the decoded audio later.
        audioBuffer = buffer;
        var buttons = document.querySelectorAll("button");
        buttons[0].disabled = false;
        buttons[1].disabled = false;
      },
      function (e) {
        console.log("Error decoding file", e);
      }
    );
  }
  // User selects file, read it as an ArrayBuffer and pass to the API.
  var fileInput = document.querySelector('input[type="file"]');
  fileInput.addEventListener(
    "change",
    function (e) {
      var reader = new FileReader();
      reader.onload = function (e) {
        initSound(this.result);
        console.log(this.result);
      };
      reader.readAsArrayBuffer(this.files[0]);
    },
    false
  );
  // Load file from a URL as an ArrayBuffer.
  // Example: loading via xhr2: loadSoundFile('sounds/test.mp3');
  function loadSoundFile(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function (e) {
      initSound(this.response); // this.response is an ArrayBuffer.
    };
    xhr.send();
  }
});

Template.publicPagesKesfet.events({
  "click #startButton": function (event, template) {
    source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = false;
    source.connect(context.destination);
    source.start(0); // Play immediately.
  },
  "click #stopButton": function (event, template) {
    if (source) {
      source.stop(0);
    }
  },
});
