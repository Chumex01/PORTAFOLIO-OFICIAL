# Portfolio Neon — Cesar.DEV

Portafolio estático creado únicamente con HTML, CSS y JavaScript.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub.
2. Sube `index.html`, `style.css`, `script.js` y la carpeta `assets`.
3. En **Settings → Pages**, selecciona:
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`
4. Guarda y espera a que GitHub Pages publique el sitio.

## Chatbot

El chatbot funciona completamente en el navegador con una base de conocimientos JavaScript inspirada en la KB proporcionada.

No necesita FastAPI para funcionar.

## Contacto

El formulario utiliza `mailto:` para abrir el cliente de correo del visitante. Esto evita exponer credenciales de Gmail.

Para envío realmente automático sin abrir el correo del usuario, conecta el formulario a un servicio externo o a un backend/API desplegado por separado.

## Seguridad

No pongas contraseñas de Gmail, API keys ni secretos dentro de `index.html`, `script.js` ni ningún repositorio público.
