import bootstrap from "bootstrap";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.adminModalsAddSong.onCreated(function () {
  deneme = null;
});

Template.adminModalsAddSong.onRendered(function () {
  const self = this;

  bufferToBase64 = function (buffer) {
    var bytes = new Uint8Array(buffer);
    var len = buffer.byteLength;
    var binary = "";
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    deneme = window.btoa(binary);
    return window.btoa(binary);
  };
  // User selects file, read it as an ArrayBuffer and pass to the API.
  var fileInput = document.querySelector('input[type="file"]');
  fileInput.addEventListener(
    "change",
    function (event) {
      var reader = new FileReader();
      reader.onload = function (e) {
        bufferToBase64(this.result);
      };
      reader.readAsArrayBuffer(this.files[0]);
    },
    false
  );

  const modalElement = document.getElementById("brdAdminModalsAddSongModal");
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener("hidden.bs.modal", function (event) {
    self.$("form#brdAdminModalsAddSongForm").trigger("reset");
  });
  console.log(self);
  console.log(self.$("form#brdAdminModalsAddSongForm"));
});

Template.adminModalsAddSong.events({
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
