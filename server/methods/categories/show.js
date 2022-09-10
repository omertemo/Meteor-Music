import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "categories.show",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const id = data._id;

    const category = Categories.findOne({
      _id: id,
    });
    return category;
  },
});
