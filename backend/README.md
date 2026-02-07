# 🌐 LatencyZero Server

Backend desarrollado en **FastAPI** para integrar modelos de Machine Learning, agentes con LLM y otras funcionalidades.

## 📁 Estructura del proyecto

```
backend/
│
├── latencyzero_server/       # Paquete principal de la app
│   ├── api/                  # Endpoints / rutas de la app
│   │   ├── auth/             # Rutas de autenticación (login, registro)
│   │   ├── users/            # Rutas de usuarios
│   │   ├── ml/               # Rutas de Machine Learning
│   │   └── __init__.py
│   │
│   ├── core/                 # Configuración y constantes globales
│   ├── models/               # Modelos de base de datos (ORM)
│   ├── schemas/              # Pydantic models / DTOs
│   ├── services/             # Lógica de negocio / servicios
│   ├── db/                   # Conexión a la base de datos y migraciones
│   └── utils/                # Funciones auxiliares y helpers
│
├── tests/                    # Tests unitarios e integraciones
├── venv/
├── requirements.txt
└── README.md
```

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

