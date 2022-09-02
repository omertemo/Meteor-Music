import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import Swal from "sweetalert2";

Template.publicPagesHome.onCreated(function () {
  context = new AudioContext();
  source = null;
  audioBuffer = null;

  this.state = new ReactiveDict(null, {
    songs: [],
    category: [],
  });
  this.filtering = new ReactiveDict(null, {});
});

Template.publicPagesHome.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get("songs");

    Meteor.call("songs.list", {}, function (error, result) {
      if (error) {
        console.log("error", error);
        return;
      }
      self.state.set("songs", result.songs);
    });
  });
});
