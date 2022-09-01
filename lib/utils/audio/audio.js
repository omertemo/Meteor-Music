import { func } from "prop-types";

AudioGlobal = {
  base64ToBuffer: function (buffer) {
    var binary = window.atob(buffer);
    var buffer = new ArrayBuffer(binary.length);
    var bytes = new Uint8Array(buffer);
    for (var i = 0; i < buffer.byteLength; i++) {
      bytes[i] = binary.charCodeAt(i) & 0xff;
    }
    return buffer;
  },
  audioFunction: function (base64String) {
    if (!base64String) {
      console.log(false);
    }
    audioFromString = this.base64ToBuffer(base64String); // Buraya db'deki bilgiyi vermeliyim
    AppUtil.temp.set("audioBufTemp", base64String);

    console.log("audioFromString");
    console.log(audioFromString);

    context.decodeAudioData(
      audioFromString,
      function (buffer) {
        audioBuffer = buffer;
        console.log(audioBuffer);
        return audioBuffer;
      },
      function (e) {
        console.log("Error decoding file", e);
      }
    );
  },
};
