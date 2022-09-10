import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "songs.list",
  validate: new SimpleSchema({
    options: {
      type: QueryOptionsSchema,
      optional: true,
    },
  }).validator(),
  run: function (data) {
    this.unblock();
    console.log(data);
    const { options = {} } = data;

    options.fields = { base64: 0 };
    return Fetch(Songs, {}, options, "songs");
  },
});
