import Swal from "sweetalert2";

Template.adminPagesCategories.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: [],
    notFound: false,
  });
  this.filtering = new ReactiveDict(null, {});
});

Template.adminPagesCategories.onRendered(function () {
  // console.log(context);
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get("categories");

    Meteor.call("categories.list", {}, function (error, result) {
      if (error) {
        console.log("error", error);
        return;
      }
      if (result) {
        console.log(self);
        console.log(this.state);

        self.state.set("categories", result.categories);
      }
    });
  });
});

Template.adminPagesCategories.events({
  "click #brd-delete": function (event, template) {
    const category = this; //self misali, this'i category'a setliyoruz

    Swal.fire({
      //Swal kütüphanesini kullanarak güzel bir ekranın gelmesini sağlıyoruz
      title: "Silmek istiyor musunuz?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--bs-danger)",
      cancelButtonColor: "var(--bs-dark)",
      cancelButtonText: "Hayır",
      confirmButtonText: "Evet",
    }).then((result) => {
      if (result.value) {
        Meteor.call(
          "categories.delete",
          { _id: category._id },
          function (error, result) {
            if (error) {
              console.log("error", error);
              return;
            }

            AppUtil.refreshTokens.set("categories", Random.id());
          }
        );
      }
    });
  },
});

Template.adminPagesCategories.helpers({
  deneme: function () {
    return Categories.findOne({});
  },
});
