import SimpleSchema, { MongoObject } from "simpl-schema";

Singers = new Mongo.Collection("singers");

SingerSchema = new SimpleSchema({
  name: String,
});

Singers.attachSchema(SingerSchema);
