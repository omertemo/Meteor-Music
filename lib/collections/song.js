import SimpleSchema from "simpl-schema";

Songs = new Mongo.Collection("songs");

SongSchema = new SimpleSchema({
  name: String,
  arrayBuf: ArrayBuffer,
  signer: String,
  category_id: SimpleSchema.RegEx.Id,
});

Songs.attachSchema(SongSchema);
