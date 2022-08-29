import SimpleSchema from "simpl-schema";

Categories = new Mongo.Collection("categories");

CategorySchema = new SimpleSchema({
  name: String,
  description: {
    type: String,
    optional: true,
  },
});

Categories.attachSchema(CategorySchema);
