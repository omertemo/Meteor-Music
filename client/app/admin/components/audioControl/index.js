Template.adminComponentsAudioControl.onCreated(function () {
  source = null;
  this.state = new ReactiveDict(null, {
    audioBuf: String,
    isPlay: Boolean,
    tempThis: Object,
  });
});

Template.adminComponentsAudioControl.events({
  "click #startButton": function (event, template) {
    // AppUtil.temp.set("song", template);

    template.state.set("isPlay", true);
    if (source) {
      source.stop(0);
    }

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
      console.log("Müzik Oynatılıyor");
      source.start(0); // Play immediately.
    }, 1000);
  },

  "click #stopButton": function (event, template) {
    if (source) {
      template.state.set("isPlay", false);
      console.log("Müzik Durduruldu");
      source.stop(0);
    }
  },
});
