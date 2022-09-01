Template.adminComponentsAudioControl.onCreated(function () {
  this.state = new ReactiveDict(null, {
    audioBuf: String,
  });
});
Template.adminComponentsAudioControl.helpers({
  isPlay: function () {
    if (source) {
      return true;
    }
  },
});
Template.adminComponentsAudioControl.events({
  "click #startButton": function (event, template) {
    if (source) {
      source.stop(0);
    }
    // base64Val = AppUtil.temp.get("audioBufTemp");
    if (!this.arrayBuf) {
      audioBuffer = AudioGlobal.audioFunction(base64Val);
    } else {
      audioBuffer = AudioGlobal.audioFunction(this.arrayBuf);
      base64Val = this.arrayBuf;
    }
    console.log(source);
    setTimeout(function () {
      source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = false;
      source.connect(context.destination);
      source.start(0); // Play immediately.
    }, 1000);
  },

  "click #stopButton": function (event, template) {
    if (source) {
      source.stop(0);
    }
  },
});
