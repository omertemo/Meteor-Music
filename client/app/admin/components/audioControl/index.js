Template.adminComponentsAudioControl.onCreated(function () {
  this.state = new ReactiveDict(null, {});
});

Template.adminComponentsAudioControl.onRendered(function () {
  const self = this;
});

Template.adminComponentsAudioControl.events({
  "click #startButton": function (event, template) {
    event.preventDefault();

    const song = template.data.song;

    Meteor.call("songs.show", { _id: song._id }, function (error, result) {
      if (error) {
        console.log("error", error);
        return;
      }

      console.log(result);
      AudioGlobal.play(result);
    });
  },

  "click #stopButton": function (event, template) {
    event.preventDefault();
    AudioGlobal.pause();
  },
});
