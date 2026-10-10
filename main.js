const path = require("path");
const fs = require("fs");
const {
  colors,
  stereotypeColors,
  LINE,
  FONT,
  PREFIXES
} = require("./theme-colors");
const {
  PROFILE_NAME,
  STEREOTYPES,
  METACLASSES
} = require("./stereotypes-def");

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

function stereotypeNameOf(modelOrView) {
  const model = modelOrView && modelOrView.model ? modelOrView.model : modelOrView;
  if (!model || model.stereotype == null || model.stereotype === "") {
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

function fillForStereotypeName(st) {
  if (!st) {
    return null;
  }
  if (stereotypeColors[st]) {
    return stereotypeColors[st];
  }
  const key = Object.keys(stereotypeColors).find(
    (k) => k.toLowerCase() === String(st).toLowerCase()
  );
  return key ? stereotypeColors[key] : null;
}

function fillForView(view) {
  const stFill = fillForStereotypeName(stereotypeNameOf(view));
  if (stFill) {
    return stFill;
  }
  const prefId = preferenceKeyForView(view);
  return (prefId && colors[prefId]) || colors["view.fillColor"];
}

/** Tipografía/línea clara en toda la jerarquía (subViews + ownedViews) */
function paintTextContrast(view, depth) {
  if (!view || depth > 12) {
    return;
  }
  if (typeof view.fontColor !== "undefined") {
    view.fontColor = FONT;
  }
  if (typeof view.lineColor !== "undefined") {
    view.lineColor = LINE;
  }
  if (Array.isArray(view.subViews)) {
    view.subViews.forEach((child) => paintTextContrast(child, depth + 1));
  }
  if (Array.isArray(view.ownedViews)) {
    view.ownedViews.forEach((child) => paintTextContrast(child, depth + 1));
  }
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
  paintTextContrast(view, 0);
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
  try {
    app.diagrams.repaint();
  } catch (err) {
    /* el editor aún no está listo al arrancar */
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
  app.toast.info("Tema dark aplicado a " + n + " elementos (texto claro + grid oscuro)");
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

function findExistingProfile(project) {
  if (!project || !project.ownedElements) {
    return null;
  }
  return (
    project.ownedElements.find((e) => {
      return e && e.name === PROFILE_NAME && e.getClassName && e.getClassName() === "UMLProfile";
    }) || null
  );
}

function createProfileProgrammatically(project) {
  const profile = app.factory.createModel({
    id: "UMLProfile",
    parent: project,
    modelInitializer: (m) => {
      m.name = PROFILE_NAME;
      m.documentation =
        "Perfil DDD + SOLID/POO (Theme Dark StarUML). Usa la lupa en stereotype para elegir.";
    }
  });

  const metaByName = {};
  METACLASSES.forEach((mcName) => {
    const mc = app.factory.createModel({
      id: "UMLMetaClass",
      parent: profile,
      modelInitializer: (m) => {
        m.name = mcName;
      }
    });
    metaByName[mcName] = mc;
  });

  STEREOTYPES.forEach(([name, mcName, doc]) => {
    const st = app.factory.createModel({
      id: "UMLStereotype",
      parent: profile,
      modelInitializer: (m) => {
        m.name = name;
        m.documentation = doc;
      }
    });

    try {
      const ext = new type.UMLExtension();
      ext.name = "";
      ext.source = st;
      ext.target = metaByName[mcName];
      ext._parent = st;
      app.engine.addModel(st, "ownedElements", ext);
    } catch (err) {
      console.error("[Theme Dark] UMLExtension:", name, err);
    }
  });

  return profile;
}

function applyDDDSolidProfile() {
  const project = app.project.getProject();
  if (!project) {
    app.toast.error("Abre o crea un proyecto primero");
    return;
  }

  const existing = findExistingProfile(project);
  if (existing) {
    app.toast.info(
      PROFILE_NAME +
        " ya está en el proyecto. Expande Project en Model Explorer y usa la lupa en stereotype."
    );
    return;
  }

  try {
    const fullPath = path.join(__dirname, "profiles", "DDDSolidProfile.mfj");
    if (fs.existsSync(fullPath)) {
      const imported = app.project.importFromFile(project, fullPath);
      if (imported) {
        app.toast.info(
          "✓ Perfil importado. Model Explorer → " +
            PROFILE_NAME +
            ". Luego: clase → lupa stereotype."
        );
        return;
      }
    }

    createProfileProgrammatically(project);
    app.toast.info("✓ Perfil creado. Expande Project → " + PROFILE_NAME);
  } catch (err) {
    console.error("[Theme Dark] apply profile:", err);
    try {
      createProfileProgrammatically(project);
      app.toast.info("✓ Perfil creado (fallback). Expande Project → " + PROFILE_NAME);
    } catch (err2) {
      console.error(err2);
      app.toast.error("No se pudo crear el perfil: " + (err2 && err2.message ? err2.message : err2));
    }
  }
}

function recolorViewsOfModels(models) {
  if (!models || !models.length) {
    return;
  }
  const diagram = app.diagrams.getCurrentDiagram();
  if (!diagram || !diagram.ownedViews) {
    return;
  }
  let changed = false;
  diagram.ownedViews.forEach((view) => {
    if (view.model && models.indexOf(view.model) >= 0) {
      setViewStyle(view, fillForView(view));
      changed = true;
    }
  });
  if (changed) {
    app.diagrams.repaint();
  }
}

function init() {
  applyPreferences();

  app.commands.register("theme-dark:apply-prefs", () => {
    applyPreferences();
    app.toast.info("Preferencias dark aplicadas");
  });
  app.commands.register("theme-dark:apply-diagram", applyToCurrentDiagram);
  app.commands.register("theme-dark:apply-all", applyToAllDiagrams);
  app.commands.register("theme-dark:apply-profile", applyDDDSolidProfile);

  app.repository.on("updated", (elems) => {
    try {
      recolorViewsOfModels(elems || []);
    } catch (err) {
      console.error("[Theme Dark] recolor:", err);
    }
  });
}

exports.init = init;
