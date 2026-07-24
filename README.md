# Theme Dark StarUML

Tema **total dark** + perfil **DDD/SOLID/POO** para StarUML 6.3.1+.

## Flujo recomendado

1. Reinicia StarUML.
2. **Tools → Theme Dark StarUML → Aplicar perfil DDD/SOLID**  
   Aparece `DDDSolidProfile` bajo el Project.
3. En una clase/paquete/interfaz: Property Editor → `stereotype` → elige uno del perfil.
4. **Tools → Theme Dark StarUML → Recolorear diagrama actual**  
   Pinta cada figura según su estereotipo.

## Estereotipos incluidos (44)

### DDD
`AggregateRoot`, `Entity`, `ValueObject`, `DomainEvent`, `DomainService`, `ApplicationService`, `Repository`, `Factory`, `Specification`, `BoundedContext`, `Domain`, `Application`, `Infrastructure`, `Presentation`, `UseCase`, `Command`, `Query`, `Handler`, `DTO`, `Port`, `Adapter`, `AntiCorruptionLayer`, `Policy`, `Saga`, `Module`, `SharedKernel`

### SOLID / POO / patrones
`Service`, `Controller`, `Presenter`, `Gateway`, `Mapper`, `Validator`, `Abstract`, `Concrete`, `Facade`, `Strategy`, `Observer`, `Builder`, `Singleton`, `SRP`, `OCP`, `LSP`, `ISP`, `DIP`

Cada uno tiene documentación en el propio estereotipo y un color dark distinto.

## Menú

| Comando | Efecto |
|---------|--------|
| Aplicar perfil DDD/SOLID | Importa el perfil al proyecto |
| Aplicar preferencias dark | UI + canvas oscuro |
| Recolorear diagrama actual | Color por estereotipo (o por tipo UML) |
| Recolorear TODOS | Igual en todo el proyecto |
