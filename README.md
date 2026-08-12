# ByteCon UMG 2026

Landing page del Congreso Tecnológico de Sistemas ByteCon UMG 2026. El sitio presenta la propuesta del evento, eventos anteriores, ponentes, programa, experiencia y opciones de participación.

## Características

- Diseño responsive para escritorio y dispositivos móviles.
- Navegación de una sola página con desplazamiento suave.
- Menú móvil desplegable.
- Galería horizontal de eventos anteriores controlada con el desplazamiento.
- Secciones de ponentes, programa y entradas.
- Respeto por la preferencia del usuario de reducir movimiento.

## Tecnologías

- React
- Vite
- CSS nativo

## Requisitos

- Node.js en una versión LTS actual.
- npm, incluido con Node.js.

## Ejecución local

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

3. Abre en el navegador la URL indicada por Vite, normalmente `http://localhost:5173`.

Los cambios en el código se reflejan automáticamente mientras el servidor está en ejecución.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la compilación optimizada para producción en `dist/`. |
| `npm run preview` | Sirve localmente la compilación de producción. Requiere ejecutar primero `npm run build`. |

## Estructura del proyecto

```text
.
├── index.html       # Metadatos y punto de montaje de la aplicación
├── media/           # Imágenes utilizadas por la landing
├── src/
│   ├── App.jsx      # Secciones, contenido e interacción de la página
│   └── main.jsx     # Inicialización de React
├── styles.css       # Estilos globales y diseño responsive
├── vite.config.js   # Configuración de Vite
└── package.json     # Dependencias y scripts
```

## Personalización

- Edita `src/App.jsx` para modificar textos, ponentes, programa y enlaces.
- Reemplaza los recursos de `media/` para actualizar las imágenes del sitio.
- Ajusta `styles.css` para cambiar la paleta, tipografía, espaciados y comportamiento responsive.
- Actualiza los metadatos y el título del navegador en `index.html`.
