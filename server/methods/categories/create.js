import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "categories.create",
  validate: new SimpleSchema({
    category: CategorySchema,
  }).validator(),
  run: function (data) {
    this.unblock();

    Categories.insert(data.category);
  },
});
