Template.publicPagesKesfet.onCreated(function () {
  this.state = new ReactiveDict(null, {});
});

Template.publicPagesKesfet.onRendered(function () {
  const self = this;
  context = new AudioContext();
  source = null;
  audioBuffer = null;

  bufferToBase64 = function (buffer) {
    var bytes = new Uint8Array(buffer);
    var len = buffer.byteLength;
    var binary = "";
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  base64ToBuffer = function (buffer) {
    var binary = window.atob(buffer);
    var buffer = new ArrayBuffer(binary.length);
    var bytes = new Uint8Array(buffer);
    for (var i = 0; i < buffer.byteLength; i++) {
      bytes[i] = binary.charCodeAt(i) & 0xff;
    }
    return buffer;
  };

  initSound = (arrayBuffer) => {
    var base64String = bufferToBase64(arrayBuffer);
    var audioFromString = base64ToBuffer(base64String); // Buraya db'deki bilgiyi vermeliyim

    context.decodeAudioData(
      audioFromString,
      function (buffer) {
        audioBuffer = buffer;
        console.log("------------audioBuffer------------");
        console.log(audioBuffer);
      },
      function (e) {
        console.log("Error decoding file", e);
      }
    );
  };

  // User selects file, read it as an ArrayBuffer and pass to the API.
  fileInput = self.find("#uploadButton");

  fileInput.addEventListener("change", function (e) {
    var reader = new FileReader();
    reader.onload = function (e) {
      console.log(";;;;;;;;;;;this.result;;;;;;;;;;;");
      console.log(this.result);

      initSound(this.result);
    };
    reader.readAsArrayBuffer(this.files[0]);
  });
});

Template.publicPagesKesfet.events({
  // "mouseup #uploadButton": function (event, template) {
  //   var reader = new FileReader();
  //   reader.onload = function (event) {
  //     initSound(this.result);
  //     console.log("BURASI -> ");
  //     console.log(this.result);
  //   };
  //   reader.readAsArrayBuffer(template.files[0]);
  //   console.log("this.files[0] -> ");
  //   console.log(this.files[0]);
  // },

  "click #startButton": function (event, template) {
    console.log(template.find("#uploadButton"));

    source = context.createBufferSource(); // creates a sound source

    console.log("~~~~~~~~~~~~context~~~~~~~~~~~~");
    console.log(context);
    console.log(typeof context);

    console.log(",,,,,,,,,,,source,,,,,,,,,,,");
    console.log(source.buffer);
    console.log(typeof source);

    source.buffer = audioBuffer; // tell the source which sound to play

    console.log("**********source.buffer**********");
    console.log(source.buffer);
    console.log(typeof source.buffer);

    source.loop = false;
    source.connect(context.destination); // connect the source to the context's destination (the speakers)
    source.start(0); // Play immediately.
  },
  "click #stopButton": function (event, template) {
    if (source) {
      source.stop(0);
    }
  },
});
