Template.adminComponentsFooter.onCreated(function () {
  this.prevSong = null;
  this.nextSong = null;
});

Template.adminComponentsFooter.onRendered(function () {
  this.autorun(function () {});
});

Template.adminComponentsFooter.events({
  "click #nextButton": function (event, template) {
    const song = AudioGlobal.song.get();
    const footerList = AppUtil.temp.get("songsTemp");
    const currentIndex = footerList.map((el) => el._id).indexOf(song._id);
    if (currentIndex == footerList.length - 1) {
      template.nextSong = footerList[0];
    } else {
      template.nextSong = footerList[currentIndex + 1];
    }

    console.log(template.nextSong);
    // console.log(footerList);
    // console.log(song);

    Meteor.call(
      "songs.show",
      { _id: template.nextSong._id },
      function (error, result) {
        if (error) {
          console.log("error", error);
          return;
        }

        // console.log(result);
        AudioGlobal.play(result);
      }
    );
  },
  "click #prevButton": function (event, template) {
    const song = AudioGlobal.song.get();
    const footerList = AppUtil.temp.get("songsTemp");
    const currentIndex = footerList.map((el) => el._id).indexOf(song._id);
    if (currentIndex == 0) {
      template.prevSong = footerList[footerList.length - 1];
    } else {
      template.prevSong = footerList[currentIndex - 1];
    }
    console.log(template.prevSong);
    // console.log(footerList);
    // console.log(song);

    Meteor.call(
      "songs.show",
      { _id: template.prevSong._id },
      function (error, result) {
        if (error) {
          console.log("error", error);
          return;
        }

        // console.log(result);
        AudioGlobal.play(result);
      }
    );
  },
  "timeupdate #progress": function (event, template) {
    console.log(AudioGlobal.updateProgress(event));
  },
});
