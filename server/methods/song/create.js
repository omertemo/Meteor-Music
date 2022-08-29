import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "songs.create",
  validate: new SimpleSchema({
    song: SongSchema,
  }).validator(),
  run: function (data) {
    this.unblock();

    const song = Songs.insert(data.song);
    return Songs.findOne({ _id: song });
  },
});
