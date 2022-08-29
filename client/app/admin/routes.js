import { FlowRouter } from "meteor/ostrio:flow-router-extra";

const routes = FlowRouter.group({
  prefix: "/admin",
  name: "admin",
  // triggersEnter: [MustSignOut],
});

routes.route("/sign-up", {
  name: "admin.signUp",
  action: function (params, queryParams) {
    this.render("adminLayoutDefault", { page: "adminPageSignUp" });
  },
});

routes.route("/sign-in", {
  name: "admin.signIn",
  action: function (params, queryParams) {
    this.render("adminLayoutDefault", { page: "adminPageSignIn" });
  },
});

routes.route("/categories", {
  name: "admin.categories",
  action: function (params, queryParams) {
    this.render("adminLayoutDefault", { page: "adminPagesCategories" });
  },
});
