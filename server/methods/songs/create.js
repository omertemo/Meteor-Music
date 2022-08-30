import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "songs.create",
  validate: new SimpleSchema({
    song: SongSchema,
  }).validator(),
  run: function (data) {
    this.unblock();

    Songs.insert(data.song);
  },
});
