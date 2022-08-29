import bootstrap from "bootstrap";

Template.adminModalsAddCategory.onRendered(function () {
  const self = this;

  const modalElement = document.getElementById(
    "brdPublicModalsAddCategoryModal"
  );
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener("hidden.bs.modal", function (event) {
    self.$("form#brdPublicModalsAddCategoryForm").trigger("reset");
  });
});

Template.adminModalsAddCategory.events({
  "submit form#brdPublicModalsAddCategoryForm": function (event, template) {
    event.preventDefault();

    const name = event.target.name.value;
    const description = event.target.description.value;

    const obj = {
      category: {
        name: name,
        description: description,
      },
    };

    Meteor.call("categories.create", obj, function (error, result) {
      if (error) {
        console.log("error", error);
      }

      console.log(result); //hata gelmeyecekse istediğimiz sonucu bu şekilde görebiliriz
      AppUtil.refreshTokens.set("categories", Random.id()); //içerisnde birden fazla reaktif değişken buluna bir obje
      event.target.reset(); // işlem bittikten sonra formu temizler
      template.modal.hide(); //
    });
  },
});
