import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::dashboard.dashboard", {
  config: {
    find: {
      policies: [],
      middlewares: [],
    },
  },
});
