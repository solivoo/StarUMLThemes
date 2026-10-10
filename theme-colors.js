/**
 * Paleta total-dark para StarUML.
 * Fills oscuros + texto/líneas claros = contraste legible.
 */
const LINE = "#d8d8d8";
const FONT = "#ffffff";
const CANVAS = "#121212";
const DEFAULT_FILL = "#2a2a2e";
/** Color del grid. En StarUML 7 se aplica con diagramEditor.gridColor. */
const GRID = "#2a2a2a";

const base = {
  "theme.default": "dark",
  "diagramEditor.backgroundColor": CANVAS,
  "diagramEditor.gridColor": GRID,
  "view.fillColor": DEFAULT_FILL,
  "view.lineColor": LINE,
  "view.fontColor": FONT,
  "view.showShadow": false
};

const uml = {
  "uml.package.fillColor": "#3a3228",
  "uml.model.fillColor": "#35302a",
  "uml.subsystem.fillColor": "#3a2f3a",
  "uml.class.fillColor": "#243b55",
  "uml.interface.fillColor": "#2f3f28",
  "uml.signal.fillColor": "#3a2a2a",
  "uml.datatype.fillColor": "#2a3540",
  "uml.primitivetype.fillColor": "#2a3a35",
  "uml.enumeration.fillColor": "#4a2a35",
  "uml.port.fillColor": "#4a2f5a",
  "uml.part.fillColor": "#2f3540",
  "uml.collaboration.fillColor": "#2a3a45",
  "uml.collaborationuse.fillColor": "#2a3545",
  "uml.artifact.fillColor": "#2a402a",
  "uml.component.fillColor": "#2a3550",
  "uml.node.fillColor": "#403528",
  "uml.object.fillColor": "#2f3340",
  "uml.artifactinstance.fillColor": "#2a3a2a",
  "uml.componentinstance.fillColor": "#2a3550",
  "uml.nodeinstance.fillColor": "#403528",
  "uml.usecase.fillColor": "#1f3d32",
  "uml.actor.fillColor": "#2b2b2b",
  "uml.lifeline.fillColor": "#2a3340",
  "uml.state.fillColor": "#352a45",
  "uml.action.fillColor": "#243b55",
  "uml.objectnode.fillColor": "#3a3528",
  "uml.metaclass.fillColor": "#3a2840",
  "uml.stereotype.fillColor": "#5a2a6a",
  "uml.note.fillColor": "#3a3a22"
};

const flowchart = {
  "flowchart.process.fillColor": "#243b55",
  "flowchart.terminator.fillColor": "#1f3d32",
  "flowchart.decision.fillColor": "#3a3520",
  "flowchart.delay.fillColor": "#2a3540",
  "flowchart.predefined-process.fillColor": "#2f3550",
  "flowchart.alternate-process.fillColor": "#2a3a45",
  "flowchart.data.fillColor": "#2a3550",
  "flowchart.document.fillColor": "#2a402a",
  "flowchart.multidocument.fillColor": "#2a3a2a",
  "flowchart.preparation.fillColor": "#3a3020",
  "flowchart.display.fillColor": "#2a3a40",
  "flowchart.manual-input.fillColor": "#35302a",
  "flowchart.manual-operation.fillColor": "#3a2f28",
  "flowchart.card.fillColor": "#2f3340",
  "flowchart.punched-tape.fillColor": "#2a3540",
  "flowchart.connector.fillColor": "#2b2b2b",
  "flowchart.off-page-connector.fillColor": "#333333",
  "flowchart.or.fillColor": "#3a2a2a",
  "flowchart.summing-junction.fillColor": "#2a2a3a",
  "flowchart.collate.fillColor": "#3a2a35",
  "flowchart.sort.fillColor": "#2a3a35",
  "flowchart.merge.fillColor": "#352a3a",
  "flowchart.extract.fillColor": "#2a3a2f",
  "flowchart.stored-data.fillColor": "#2a3545",
  "flowchart.database.fillColor": "#4a2a45",
  "flowchart.direct-access-storage.fillColor": "#3a2a40",
  "flowchart.internal-storage.fillColor": "#2f3550"
};

const erd = {
  "erd.entity.fillColor": "#243b55"
};

const dfd = {
  "dfd.external-entity.fillColor": "#3a3228",
  "dfd.process.fillColor": "#243b55",
  "dfd.datastore.fillColor": "#2a402a"
};

const sysml = {
  "sysml.requirement.fillColor": "#3a2a35",
  "sysml.block.fillColor": "#243b55",
  "sysml.interface-block.fillColor": "#2f3f28",
  "sysml.constraint-block.fillColor": "#352a45",
  "sysml.value-type.fillColor": "#2a3540",
  "sysml.part.fillColor": "#2f3540",
  "sysml.port.fillColor": "#4a2f5a",
  "sysml.constraint-property.fillColor": "#3a2a45",
  "sysml.constraint-parameter.fillColor": "#2a3a45"
};

const bpmn = {
  "bpmn.activity.fillColor": "#243b55",
  "bpmn.event.fillColor": "#1f3d32",
  "bpmn.message.fillColor": "#2a3540",
  "bpmn.gateway.fillColor": "#3a3520",
  "bpmn.dataobject.fillColor": "#2a402a",
  "bpmn.conversation.fillColor": "#2f3550"
};

const c4 = {
  "c4.person.fillColor": "#1f4a5a",
  "c4.software-system.fillColor": "#1f3d55",
  "c4.container.fillColor": "#243b55",
  "c4.component.fillColor": "#2a3550"
};

const mindmap = {
  "mindmap.node.fillColor": "#243b55"
};

const colors = Object.assign(
  {},
  base,
  uml,
  flowchart,
  erd,
  dfd,
  sysml,
  bpmn,
  c4,
  mindmap
);

const PREFIXES = {
  DFD: "dfd",
  FC: "flowchart",
  UML: "uml",
  SysML: "sysml",
  ERD: "erd",
  BPMN: "bpmn",
  C4: "c4",
  MindMap: "mindmap"
};

/** Colores por nombre de estereotipo del perfil DDDSolidProfile */
const stereotypeColors = {
  AggregateRoot: "#5a3a1e",
  Entity: "#243b55",
  ValueObject: "#2f3f28",
  DomainEvent: "#4a2a55",
  DomainService: "#2a3a50",
  ApplicationService: "#1f4a5a",
  Repository: "#1f3d40",
  Factory: "#3a3520",
  Specification: "#352a45",
  BoundedContext: "#3a3228",
  Domain: "#2a402a",
  Application: "#1f3d55",
  Infrastructure: "#3a2a2a",
  Presentation: "#2a3550",
  UseCase: "#1f4a45",
  Command: "#4a3020",
  Query: "#203a4a",
  Handler: "#2f3550",
  DTO: "#333340",
  Port: "#2f3f28",
  Adapter: "#3a2f40",
  AntiCorruptionLayer: "#4a2a35",
  Policy: "#3a2840",
  Saga: "#403028",
  Service: "#243b55",
  Controller: "#2a3550",
  Presenter: "#2a3a45",
  Gateway: "#2a3540",
  Mapper: "#35302a",
  Validator: "#3a3528",
  Abstract: "#2a2a3a",
  Concrete: "#2b2b2b",
  Facade: "#2f3545",
  Strategy: "#2a3a40",
  Observer: "#352a3a",
  Builder: "#3a3028",
  Singleton: "#333333",
  Module: "#3a3228",
  SharedKernel: "#3a3530",
  SRP: "#1f4a3a",
  OCP: "#1f3d55",
  LSP: "#3a2a50",
  ISP: "#2f3f28",
  DIP: "#243b55"
};

module.exports = {
  colors,
  stereotypeColors,
  LINE,
  FONT,
  CANVAS,
  GRID,
  DEFAULT_FILL,
  PREFIXES
};
