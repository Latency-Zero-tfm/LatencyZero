# 🌐 LatencyZero Server

Backend desarrollado en **FastAPI** para integrar modelos de Machine Learning, agentes con LLM y otras funcionalidades.

## 📌 Diagrama Entidad-Relación

![latencyzero](/backend/db/latencyzero.png)


<!-- ## 📁 Estructura del proyecto -->

## 🧪 Instalación y ejecución

Sigue estos pasos para levantar el servidor en entorno local:


### 1️⃣ Entrar al proyecto

```bash
cd backend
```

### 2️⃣ Crear el archivo `.env`

En el directorio `backend/`, crea un archivo llamado `.env` con el siguiente contenido:

```env
# Entorno
ENV=development 

# Base de datos producción
DATABASE_URL=

# JWT
SECRET_KEY=
```

⚠️ Asegúrate de completar los valores necesarios antes de ejecutar el servidor.

### 3️⃣ Configurar el token de email

Accede a la carpeta:

```bash
cd latencyzero_server
```

Añade aquí los archivos:

* `token.json`
* `token.pickle`

Luego vuelve al directorio principal:

```bash
cd ..
```

### 4️⃣ Crear entorno virtual

```bash
python -m venv venv
```


### 5️⃣ Activar entorno virtual

#### 🪟 Windows

```bash
venv\Scripts\activate
```

#### 🐧 Linux / 🍎 macOS

```bash
source venv/bin/activate
```


### 6️⃣ Instalar dependencias

```bash
pip install -r requirements.txt
```

### 7️⃣ Ejecutar el servidor

```bash
uvicorn latencyzero_server.main:app --reload
```

### 8️⃣ Acceder a la API

Una vez iniciado el servidor, podrás acceder a:

* 🌍 **API raíz**
  👉 [http://127.0.0.1:8000](http://127.0.0.1:8000)

* 📚 **Documentación interactiva (Swagger)**
  👉 [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
