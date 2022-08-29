import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "categories.delete",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    this.unblock();
    const categoryID = data._id;
    Categories.remove({ _id: categoryID });
    Songs.remove({ categoryId: categoryID });
  },
});
