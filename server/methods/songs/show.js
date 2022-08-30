import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "songs.show",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const id = data._id;

    const song = Songs.findOne({
      _id: id,
    });

    return song;
  },
});
