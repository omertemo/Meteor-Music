import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "songs.delete",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    this.unblock();

    Songs.remove({ _id: data._id });
  },
});
