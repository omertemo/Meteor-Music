import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import Swal from "sweetalert2";

Template.publicPagesHome.onCreated(function () {
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

Template.publicPagesHome.events({
  "click #startButton": function (event, template) {
    event.preventDefault();

    if (source) {
      source.stop(0);
    }

    base64Val = this.arrayBuf;

    AudioGlobal.audioFunction(context, source, audioBuffer, base64Val);
  },

  "click #stopButton": function (event, template) {
    if (source) {
      source.stop(0);
    }
  },

  // "click #brd-update-song": function (event, template) {
  //   const song = this; //self misali, this'i song'a setliyoruz

  //   AppUtil.temp.set("song", this);

  //   console.log(this);
  // },
});
