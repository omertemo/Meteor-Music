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
      //tarihe göre bir sorgu eklemem lazım(yoklamalara)
    });

    // yoklama.songList.forEach((song) => {
    //   song.data = Songs.findOne({ _id: song.songId });
    //   return song;
    // });
    // category.songs = Songs.find({ categoryId: id }).fetch();
    return category;
  },
});
