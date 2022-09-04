import { func } from "prop-types";

AudioGlobal = {
  audio: null, // "data:audio/wav;base64," + base64string
  status: ReactiveVar("stop"),
  song: ReactiveVar(null),

  // Şu ada yazılan componentin içerisndekim kısım doğru deil
  // Globale çek, çalma ekranında tüm ekranların aynı anda gücellenmeşi için bunun globalde olması lazım
  // Hangi müziğin id
  play: function (_song) {
    if (!_song) {
      return;
    }

    const song = this.song.get();

    if (song?._id === _song._id) {
      console.log(123123);
      this.pause();
    } else {
      if (this.audio) {
        this.stop();
      }

      this.status.set("play");
      this.song.set(_song);

      this.audio = new Audio(`data:${_song.fileType};base64, ${_song.base64}`);
      this.audio.play();
    }
  },

  stop: function () {
    if (!this.audio) {
      return;
    }

    this.audio.pause();
    this.audio.currentTime = 0;
    this.status.set("stop");
    this.audio = null;
    this.song.set(null);
  },

  pause: function () {
    if (!this.audio) {
      return;
    }

    const status = this.status.get();

    if (status == "pause") {
      this.status.set("play");
      this.audio.play();
    } else {
      this.status.set("pause");
      this.audio.pause();
    }
  },

  bufferToBase64: function (buffer) {
    var bytes = new Uint8Array(buffer);
    var len = buffer.byteLength;
    var binary = "";
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  },
};

Template.registerHelper("audioGlobal", function () {
  return AudioGlobal;
});
