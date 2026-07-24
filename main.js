function applyDarkTheme() {
  try {
    app.preferences.set("theme.default", "dark");
  } catch (err) {
    console.error("[Theme Dark StarUML] No se pudo guardar la preferencia:", err);
  }

  try {
    app.stylesheets.setThemeCSS("dark");
  } catch (err) {
    console.error("[Theme Dark StarUML] No se pudo aplicar el CSS del tema:", err);
  }
}

function init() {
  // Asegura el tema oscuro nativo de StarUML al cargar la extensión.
  applyDarkTheme();

  app.commands.register("theme-dark:apply", applyDarkTheme);
}

exports.init = init;
