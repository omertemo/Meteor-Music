import { FlowRouter } from "meteor/ostrio:flow-router-extra";

FlowRouter.route("/", {
  name: "public.home",
  action: function (params, queryParams) {
    this.render("publicLayoutsDefault", { page: "publicPagesHome" });
  },
});
FlowRouter.route("/library", {
  name: "public.deneme",
  action: function (params, queryParams) {
    this.render("publicLayoutsDefault", { page: "publicPagesUpload" });
  },
});

FlowRouter.route("/kesfet", {
  name: "public.kesfet",
  action: function (params, queryParams) {
    this.render("publicLayoutsDefault", { page: "publicPagesKesfet" });
  },
});
