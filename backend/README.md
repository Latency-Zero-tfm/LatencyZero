# 🌐 LatencyZero Server

Backend desarrollado en **FastAPI** para integrar modelos de Machine Learning, agentes con LLM y otras funcionalidades.

## 📌 Diagrama Entidad-Relación

![latencyzero](/backend/db/latencyzero.png)


<!-- ## 📁 Estructura del proyecto -->

## 🧪 Instalación y ejecución

### 1️⃣ Clonar o entrar al proyecto

```bash
cd backend
```

### 2️⃣ Crear entorno virtual

```bash
python -m venv venv
```


### 3️⃣ Activar entorno virtual

* **Windows:**

```bash
venv\Scripts\activate
```

* **Linux / macOS:**

```bash
source venv/bin/activate
```

### 4️⃣ Instalar dependencias

```bash
pip install -r requirements.txt
```

### 5️⃣ Ejecutar el servidor

```bash
uvicorn latencyzero_server.main:app --reload
```

### 6️⃣ Acceder a la API

* API raíz:
  👉 [http://127.0.0.1:8000](http://127.0.0.1:8000)

* Documentación interactiva (Swagger):
  👉 [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

