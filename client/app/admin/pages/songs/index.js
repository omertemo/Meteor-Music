import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import Swal from "sweetalert2";

Template.adminPagesSongs.onCreated(function () {
  context = new AudioContext();
  source = null;
  audioBuffer = null;

  this.state = new ReactiveDict(null, {
    songs: [],
    category: [],
  });
  this.filtering = new ReactiveDict(null, {});
});

Template.adminPagesSongs.onRendered(function () {
  const self = this;

  // AppUtil.temp.set("contextVal", context);
  // AppUtil.temp.set("sourceVal", source);
  // AppUtil.temp.set("audioBufferVal", audioBuffer);

  console.log("deneme");

  this.autorun(function () {
    const categoryIdVar = FlowRouter.getParam("categoryId");

    Meteor.call(
      "categories.show",
      { _id: categoryIdVar },
      function (error, result) {
        if (error) {
          console.log("error", error);
          return;
        }
        console.log(result);
        self.state.set("category", result);
      }
    );
  });

  this.autorun(function () {
    AppUtil.refreshTokens.get("songs");
    const filteringVar = self.filtering.all();
    const categoryIdVar = FlowRouter.getParam("categoryId");
    // console.log(filteringVar);
    // console.log(categoryIdVar);
    // console.log(self);

    if (!categoryIdVar) {
      return;
    }

    filteringVar.categoryId = categoryIdVar;

    const obj = {
      options: {
        filtering: filteringVar,
      },
    };

    Meteor.call("songs.list", obj, function (error, result) {
      if (error) {
        console.log("error", error);
        return;
      }
      self.state.set("songs", result.songs);
    });
  });
});

Template.adminPagesSongs.events({
  "click #brd-delete-song": function (event, template) {
    const song = this; //self misali, this'i song'a setliyoruz

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
          "songs.delete",
          { _id: song._id },
          function (error, result) {
            if (error) {
              console.log("error", error);
              return;
            }

            AppUtil.refreshTokens.set("songs", Random.id());
          }
        );
      }
    });
  },
});
