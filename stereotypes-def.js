/**
 * Definición del perfil DDD + SOLID/POO.
 * Cada entrada: [nombre, metaclass, documentación]
 */
const STEREOTYPES = [
  ["AggregateRoot", "UMLClass", "Raíz de agregado DDD. Frontera de consistencia transaccional."],
  ["Entity", "UMLClass", "Entidad de dominio con identidad única."],
  ["ValueObject", "UMLClass", "Objeto de valor inmutable, igualdad por atributos."],
  ["DomainEvent", "UMLClass", "Evento de dominio que ocurrió en el pasado."],
  ["DomainService", "UMLClass", "Servicio de dominio sin estado propio de entidad."],
  ["ApplicationService", "UMLClass", "Orquesta casos de uso de la capa de aplicación."],
  ["Repository", "UMLInterface", "Puerto de persistencia del agregado."],
  ["Factory", "UMLClass", "Fábrica de creación de agregados/entidades."],
  ["Specification", "UMLClass", "Regla de negocio evaluable (patrón Specification)."],
  ["BoundedContext", "UMLPackage", "Contexto delimitado DDD."],
  ["Domain", "UMLPackage", "Capa / paquete de dominio."],
  ["Application", "UMLPackage", "Capa de aplicación / casos de uso."],
  ["Infrastructure", "UMLPackage", "Capa de infraestructura (DB, mensajería, APIs)."],
  ["Presentation", "UMLPackage", "Capa de presentación / UI / API controllers."],
  ["UseCase", "UMLClass", "Caso de uso (aplicación) — un flujo de negocio."],
  ["Command", "UMLClass", "Comando CQRS (intención de cambio)."],
  ["Query", "UMLClass", "Consulta CQRS (lectura)."],
  ["Handler", "UMLClass", "Handler de Command/Query/Event."],
  ["DTO", "UMLClass", "Data Transfer Object entre capas."],
  ["Port", "UMLInterface", "Puerto hexagonal (entrada/salida)."],
  ["Adapter", "UMLClass", "Adaptador hexagonal que implementa un Port."],
  ["AntiCorruptionLayer", "UMLPackage", "ACL entre bounded contexts o sistemas legacy."],
  ["Policy", "UMLClass", "Política de dominio / reglas."],
  ["Saga", "UMLClass", "Orquestación/coordinación de procesos largos."],
  ["Service", "UMLClass", "Servicio de aplicación o de infraestructura."],
  ["Controller", "UMLClass", "Controlador (entrada HTTP/UI) — Presentation."],
  ["Presenter", "UMLClass", "Presenter (UI) — separa vista de lógica."],
  ["Gateway", "UMLInterface", "Gateway hacia sistema externo."],
  ["Mapper", "UMLClass", "Mapeo Domain <-> DTO / persistencia."],
  ["Validator", "UMLClass", "Validación de entrada o reglas."],
  ["Abstract", "UMLClass", "Tipo abstracto / base (OCP, herencia controlada)."],
  ["Concrete", "UMLClass", "Implementación concreta."],
  ["Facade", "UMLClass", "Fachada — API simple sobre un subsistema."],
  ["Strategy", "UMLClass", "Estrategia intercambiable (OCP / DIP)."],
  ["Observer", "UMLClass", "Observador de eventos/cambios."],
  ["Builder", "UMLClass", "Constructor fluido de objetos complejos."],
  ["Singleton", "UMLClass", "Instancia única (usar con cuidado)."],
  ["Module", "UMLPackage", "Módulo cohesivo dentro de un contexto."],
  ["SharedKernel", "UMLPackage", "Kernel compartido entre contextos."],
  ["SRP", "UMLClass", "Marca Single Responsibility Principle."],
  ["OCP", "UMLClass", "Marca Open/Closed Principle."],
  ["LSP", "UMLClass", "Marca Liskov Substitution Principle."],
  ["ISP", "UMLInterface", "Marca Interface Segregation Principle."],
  ["DIP", "UMLInterface", "Marca Dependency Inversion Principle."]
];

const METACLASSES = [
  "UMLClass",
  "UMLInterface",
  "UMLPackage",
  "UMLComponent",
  "UMLArtifact"
];

module.exports = {
  PROFILE_NAME: "DDDSolidProfile",
  STEREOTYPES,
  METACLASSES
};
