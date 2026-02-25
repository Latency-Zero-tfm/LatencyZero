# 🖥️ LatencyZero Client

Frontend desarrollado en **Angular** para consumir y presentar servicios de Machine Learning, agentes basados en LLM y otras funcionalidades del ecosistema LatencyZero.

Este proyecto fue generado con Angular CLI 20.3.15.

![Node Version](https://img.shields.io/badge/node-v22.22.0-339933?logo=node.js&logoColor=white)
![Angular CLI Version](https://img.shields.io/badge/angular_cli-v20.3.15-DD0031?logo=angular&logoColor=white)


## 📦 Versiones requeridas

Para ejecutar correctamente el frontend, asegúrate de tener instaladas las siguientes versiones:

| Tecnología  | Versión requerida |
| ----------- | ----------------- |
| Node.js     | **v22.22.0**      |
| Angular CLI | **20.3.15**       |


```
https://nodejs.org/en/download
```

```bash
npm install -g @angular/cli@20.3.15
```


## 🔎 Comprobar versiones instaladas

Puedes verificar tus versiones con los siguientes comandos:

```bash
node -v
ng version
```

Si no coinciden con las versiones requeridas, se recomienda actualizarlas antes de continuar.

## ⚡ Instalación y ejecución

Sigue estos pasos para instalar dependencias y ejecutar el proyecto localmente.

### 1️⃣ Instalar dependencias

Dentro de la carpeta del proyecto, ejecuta:

```bash
npm install
```

Esto instalará automáticamente todas las dependencias definidas en `package.json`, incluyendo Angular, Tailwind y librerías de terceros.

### 2️⃣ Ejecutar en desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm start
```

Alternativamente, usando Angular CLI directamente:

```bash
ng serve
```

El proyecto estará disponible en tu navegador en:

```text
http://localhost:4200
```

### 3️⃣ Build para producción

Para generar la versión optimizada y lista para producción:

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta:

```text
dist/
```