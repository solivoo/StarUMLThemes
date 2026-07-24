const ExtensionUtils = require("core/ExtensionUtils");

function init() {
  ExtensionUtils.loadStyleSheet(module, "stylesheets/theme-dark.css");
}

exports.init = init;
