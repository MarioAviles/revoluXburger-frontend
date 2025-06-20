# 📘 Documentación de Instalación - Proyecto React JS

Este documento contiene los pasos de instalación y configuración para iniciar un proyecto React con Bootstrap, React Router y carga diferida de componentes.

---

## 📦 Instalaciones necesarias

Ejecuta los siguientes comandos en tu terminal:

npm install react-router-dom

npm install react-lazy-load

npm install ldrs

npm install motion

npm install react-hook-form

npm install --save-dev purgecss

npm install --save-dev @fullhuman/postcss-purgecss postcss

Si hay algun tipo de problema al instalar lo necesario, usar "--force" para hacerlo sin problema.

## 🌐 Importaciones en el HTML

Agrega las líneas "link" dentro de la etiqueta `<head>` y las líneas "script" de la etiqueta `<body>` del archivo `public/index.html`:

🔸 [Bootstrap JS Bundle 5.3.6](https://getbootstrap.com/docs/5.3/getting-started/introduction/) → Script de Bootstrap

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
