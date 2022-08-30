import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "songs.update",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    song: SongSchema,
  }).validator(),
  run: function (data) {
    this.unblock();

    Songs.update(
      { _id: data._id },
      {
        $set: data.song,
      }
    );
  },
});
