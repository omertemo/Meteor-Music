Template.adminComponentsFooter.onCreated(function () {
  source = null;
  this.state = new ReactiveDict(null, {
    audioBuf: String,
    isPlay: Boolean,
    tempThis: Object,
  });
});

Template.adminComponentsFooter.onRendered(function () {
  const self = this;

  this.autorun(function () {});
});

// Template.adminComponentsFooter.events({
//   "click #startButtonFooter": function (event, template) {
//     template.state.set("isPlay", true);
//     if (source) {
//       source.stop(0);
//     }

//     if (!this.arrayBuf) {
//       audioBuffer = AudioGlobal.audioFunction(base64Val);
//     } else {
//       audioBuffer = AudioGlobal.audioFunction(this.arrayBuf);
//       base64Val = this.arrayBuf;
//     }
//     console.log(source);
//     setTimeout(function () {
//       source = context.createBufferSource();
//       source.buffer = audioBuffer;
//       source.loop = false;
//       source.connect(context.destination);
//       console.log("Müzik Oynatılıyor");
//       source.start(0); // Play immediately.
//     }, 1000);
//   },

//   "click #stopButtonFooter": function (event, template) {
//     if (source) {
//       template.state.set("isPlay", false);
//       console.log("Müzik Durduruldu");
//       source.stop(0);
//     }
//   },
// });
