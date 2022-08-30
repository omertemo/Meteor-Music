import SimpleSchema from "simpl-schema";

Songs = new Mongo.Collection("songs");

SongSchema = new SimpleSchema({
  songName: String,
  arrayBuf: String,
  singerName: String,
  categoryId: SimpleSchema.RegEx.Id,
});

Songs.attachSchema(SongSchema);
