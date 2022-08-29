import Audios from "../../../../../lib/collections/audios.collection.js";

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
});

Template.uploadForm.events({
  "change #fileInput": function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      var file = e.currentTarget.files[0];
      if (file) {
        var uploadInstance = Audios.insert(
          {
            file: file,
            chunkSize: "dynamic",
          },
          false
        );

        uploadInstance.on("start", function () {
          template.currentUpload.set(this);
        });

        uploadInstance.on("end", function (error, fileObj) {
          if (error) {
            window.alert("Error during upload: " + error.reason);
          } else {
            window.alert('File "' + fileObj.name + '" successfully uploaded');
          }
          template.currentUpload.set(false);
        });

        uploadInstance.start();
      }
    }
  },
});
