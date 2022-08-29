import Audios from "../../../../../lib/collections/audios.collection.js";

Template.uploadedFiles.helpers({
  uploadedFiles: function () {
    return Audios.find();
  },
});
