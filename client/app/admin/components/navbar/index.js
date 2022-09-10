Template.adminComponentsNavbar.events({
  "click .bos": function (event, template) {
    event.preventDefault();
    console.log(AppUtil.temp.get("songsTemp"));
  },
});
