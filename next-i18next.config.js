const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "id",
    locales: ["id", "en"],
    localeDetection: false,
  },
  localePath:
    typeof window === "undefined"
      ? path.resolve("./public/locales")
      : "/locales",
};
