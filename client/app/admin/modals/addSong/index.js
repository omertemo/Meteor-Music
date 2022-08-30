import bootstrap from "bootstrap";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.adminModalsAddSong.onRendered(function () {
  context = new AudioContext();
  source = null;
  audioBuffer = null;
  deneme = null;

  var bufferToBase64 = function (buffer) {
    var bytes = new Uint8Array(buffer);
    var len = buffer.byteLength;
    var binary = "";
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    // console.log(window.btoa(binary));
    deneme = window.btoa(binary);
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
    // document.getElementById("encodedResult").value = base64String;
    // deneme = base64String;

    context.decodeAudioData(
      audioFromString,
      function (buffer) {
        // audioBuffer is global to reuse the decoded audio later.
        audioBuffer = buffer;
        console.log(audioBuffer);
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

  const self = this;

  const modalElement = document.getElementById("brdAdminModalsAddSongModal");
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener("hidden.bs.modal", function (event) {
    self.$("form#brdAdminModalsAddSongForm").trigger("reset");
  });
  console.log(self);
  console.log(self.$("form#brdAdminModalsAddSongForm"));
});

Template.adminModalsAddSong.events({
  // "click #startButton": function (event, template) {
  //   source = context.createBufferSource();
  //   source.buffer = audioBuffer;
  //   source.loop = false;
  //   source.connect(context.destination);
  //   source.start(0); // Play immediately.
  // },
  // "click #stopButton": function (event, template) {
  //   if (source) {
  //     source.stop(0);
  //   }
  // },

  "submit form#brdAdminModalsAddSongForm": function (event, template) {
    event.preventDefault();
    const categoryIdVar = FlowRouter.getParam("categoryId");
    console.log(categoryIdVar);

    const songName = event.target.songName.value;
    const singerName = event.target.singerName.value;
    const arrayBuf = deneme;
    const categoryId = categoryIdVar;

    const obj = {
      song: {
        songName: songName,
        singerName: singerName,
        arrayBuf: arrayBuf,
        categoryId: categoryId,
      },
    };

    Meteor.call("songs.create", obj, function (error, result) {
      if (error) {
        ErrorHandler.show(error, template);
        return;
      }

      console.log(result); //hata gelmeyecekse istediğimiz sonucu bu şekilde görebiliriz
      AppUtil.refreshTokens.set("songs", Random.id()); //içerisnde birden fazla reaktif değişken buluna bir obje
      event.target.reset(); // işlem bittikten sonra formu temizler
      template.modal.hide(); //
    });
  },
});
