const path = require("path");
const {
  colors,
  stereotypeColors,
  LINE,
  FONT,
  PREFIXES
} = require("./theme-colors");

function preferenceKeyForView(view) {
  if (!view || typeof view.getClassName !== "function") {
    return null;
  }

  let name = view.getClassName();
  let prefId = "";

  for (const key of Object.keys(PREFIXES)) {
    if (name.startsWith(key)) {
      prefId += PREFIXES[key] + ".";
      name = name.substring(key.length);
      break;
    }
  }

  prefId += name.replace("View", "").toLowerCase() + ".fillColor";
  return prefId;
}

function stereotypeNameOf(view) {
  const model = view && view.model;
  if (!model || model.stereotype == null) {
    return null;
  }
  if (typeof model.stereotype === "string") {
    return model.stereotype;
  }
  if (model.stereotype.name) {
    return model.stereotype.name;
  }
  return null;
}

function fillForView(view) {
  const st = stereotypeNameOf(view);
  if (st && stereotypeColors[st]) {
    return stereotypeColors[st];
  }
  // case-insensitive fallback
  if (st) {
    const key = Object.keys(stereotypeColors).find(
      (k) => k.toLowerCase() === String(st).toLowerCase()
    );
    if (key) {
      return stereotypeColors[key];
    }
  }
  const prefId = preferenceKeyForView(view);
  return (prefId && colors[prefId]) || colors["view.fillColor"];
}

function setViewStyle(view, fillColor) {
  if (!view) {
    return;
  }

  if (typeof fillColor === "string") {
    view.fillColor = fillColor;
  }
  view.lineColor = LINE;
  view.fontColor = FONT;

  if (Array.isArray(view.ownedViews)) {
    view.ownedViews.forEach((child) => {
      if (child && typeof child.fillColor === "string") {
        child.lineColor = LINE;
        child.fontColor = FONT;
      }
    });
  }
}

function applyPreferences() {
  Object.keys(colors).forEach((key) => {
    app.preferences.set(key, colors[key]);
  });

  try {
    app.stylesheets.setThemeCSS("dark");
  } catch (err) {
    console.error("[Theme Dark] setThemeCSS:", err);
  }
}

function applyToDiagram(diagram) {
  if (!diagram || !Array.isArray(diagram.ownedViews)) {
    return 0;
  }

  let count = 0;
  diagram.ownedViews.forEach((view) => {
    setViewStyle(view, fillForView(view));
    count += 1;
  });
  return count;
}

function applyToCurrentDiagram() {
  const diagram = app.diagrams.getCurrentDiagram();
  if (!diagram) {
    app.toast.info("No hay diagrama activo");
    return;
  }
  const n = applyToDiagram(diagram);
  app.diagrams.repaint();
  app.toast.info("Tema dark aplicado a " + n + " elementos");
}

function applyToAllDiagrams() {
  let total = 0;

  app.repository.getAll().forEach((elem) => {
    if (elem && typeof elem.getClassName === "function" && /Diagram$/.test(elem.getClassName())) {
      total += applyToDiagram(elem);
    }
  });

  app.diagrams.repaint();
  app.toast.info("Tema dark aplicado en el proyecto (" + total + " vistas)");
}

function applyDDDSolidProfile() {
  const profileName = "DDDSolidProfile";
  const project = app.project.getProject();
  if (!project) {
    app.toast.error("Abre o crea un proyecto primero");
    return;
  }

  const exists = project.ownedElements && project.ownedElements.find(
    (e) => e.name === profileName && e instanceof type.UMLProfile
  );
  if (exists) {
    app.toast.info(profileName + " ya está aplicado. Míralo bajo Project.");
    return;
  }

  const fullPath = path.join(__dirname, "profiles", "DDDSolidProfile.mfj");
  const ok = app.project.importFromFile(project, fullPath);
  if (ok) {
    app.toast.info(profileName + " aplicado. Asigna estereotipos desde Property Editor.");
  } else {
    app.toast.error("No se pudo importar " + profileName);
  }
}

function init() {
  applyPreferences();

  app.commands.register("theme-dark:apply-prefs", () => {
    applyPreferences();
    app.diagrams.repaint();
    app.toast.info("Preferencias dark aplicadas (nuevos elementos)");
  });

  app.commands.register("theme-dark:apply-diagram", applyToCurrentDiagram);
  app.commands.register("theme-dark:apply-all", applyToAllDiagrams);
  app.commands.register("theme-dark:apply-profile", applyDDDSolidProfile);
}

exports.init = init;
