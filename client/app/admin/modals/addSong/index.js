import bootstrap from "bootstrap";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.adminModalsAddSong.onCreated(function () {
  deneme = null;
  this.file = null;
  this.base64 = null;
});

Template.adminModalsAddSong.onRendered(function () {
  const self = this;

  const fileInput = document.querySelector('input[type="file"]');
  fileInput.addEventListener(
    "change",
    function (event) {
      const reader = new FileReader();
      reader.onload = function (e) {
        self.base64 = AudioGlobal.bufferToBase64(this.result);
      };

      self.file = this.files[0];
      console.log(this.files[0]);

      reader.readAsArrayBuffer(this.files[0]);
    },
    false
  );

  const modalElement = document.getElementById("brdAdminModalsAddSongModal");
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener("hidden.bs.modal", function (event) {
    self.$("form#brdAdminModalsAddSongForm").trigger("reset");
  });
});

Template.adminModalsAddSong.events({
  "submit form#brdAdminModalsAddSongForm": function (event, template) {
    event.preventDefault();
    const categoryIdVar = FlowRouter.getParam("categoryId");
    const songName = event.target.songName.value;
    const singerName = event.target.singerName.value;
    const categoryId = categoryIdVar;

    const obj = {
      song: {
        songName: songName,
        singerName: singerName,
        base64: template.base64,
        fileType: template.file.type,
        categoryId: categoryId,
      },
    };

    Meteor.call("songs.create", obj, function (error, result) {
      if (error) {
        ErrorHandler.show(error, template);
        return;
      }

      AppUtil.refreshTokens.set("songs", Random.id()); //içerisnde birden fazla reaktif değişken buluna bir obje
      event.target.reset(); // işlem bittikten sonra formu temizler
      template.modal.hide(); //
    });
  },
});
