# Theme Dark StarUML

Tema oscuro para **StarUML 6.3.1+**.

## Instalar en StarUML (por URL)

StarUML instala extensiones desde **GitHub** (no desde npm).

1. Sube este repo a GitHub: `https://github.com/solivo/ThemeDarkStarUML`
2. Crea un **Release** con tag `1.0.0` (debe coincidir con `version` en `package.json`)
3. En StarUML: **Tools → Extension Manager… → Install from URL**
4. Pega: `https://github.com/solivo/ThemeDarkStarUML`
5. Reinicia StarUML

## Probar en local (sin publicar)

```bash
# Linux
ln -s "$(pwd)" ~/.config/StarUML/extensions/user/solivo.theme-dark-staruml
```

Reinicia StarUML.

## Publicar en npm (opcional)

Útil para versionar el paquete; **StarUML no instala desde npm**.

```bash
npm login
# usuario npm ligado a olivosergio@gmail.com
npm publish --access public
```

## Estructura

```
ThemeDarkStarUML/
├── main.js
├── package.json
├── stylesheets/
│   └── theme-dark.css
├── LICENSE
└── README.md
```

## Autor

Sergio Olivo — olivosergio@gmail.com
