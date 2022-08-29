import { Meteor } from "meteor/meteor";
import { FilesCollection } from "meteor/ostrio:files";

const Audios = new FilesCollection({
  debug: true,
  collectionName: "Audios",
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024 * 1024 * 10 && /mp3|jpe?g/i.test(file.extension)) {
      return true;
    }
    return "Please upload audio, with size equal or less than 10MB";
  },
});

if (Meteor.isServer) {
  Audios.denyClient();
  Meteor.publish("files.audios.all", function () {
    return Audios.find().cursor; //find zaten cursor dönüyor?
  });
} else {
  Meteor.subscribe("files.audios.all");
}

export default Audios;
