import bootstrap from "bootstrap";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.publicModalsAddSong.onRendered(function () {
  const self = this;

  const modalElement = document.getElementById("brdPublicModalsAddSongModal");
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener("hidden.bs.modal", function (event) {
    self.$("form#brdPublicModalsAddSongForm").trigger("reset");
  });
  console.log(self);
  console.log(self.$("form#brdPublicModalsAddSongForm"));
});

Template.publicModalsAddSong.events({
  "submit form#brdPublicModalsAddSongForm": function (event, template) {
    event.preventDefault();
    const groupIdVar = FlowRouter.getParam("groupId");

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const number = event.target.number.value;
    const groupId = groupIdVar;

    const obj = {
      group: {
        firstName: firstName,
        lastName: lastName,
        number: parseInt(number),
        groupId: groupId,
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
