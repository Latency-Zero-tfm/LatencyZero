# 📒 Documentación de Notebooks

Este repositorio contiene todos los cuadernos de Jupyter utilizados a lo largo del proyecto **LatencyZero**.

![Python Version](https://img.shields.io/badge/python-3.12-blue?logo=python&logoColor=white)

## 📚 Notebooks principales

| Nombre del Cuaderno                  | Descripción |
|------------------------------------|-------------|
| `model_training_components_pc.ipynb` | Entrenamiento de la red neuronal para la clasificación de componentes de PC. |
| `model_ocr.ipynb`                   | Aplicación de OCR a las imágenes del dataset para extraer texto, marcas, modelos y especificaciones. |
| `model_openai.ipynb`                | Pruebas con el modelo `openai/clip-vit-base-patch32` para clasificar si una imagen contiene un componente o no. |


## 🖥️ HardvisionAI `/hardvision_ai`

Estos notebooks contienen todos los pasos del proyecto, desde la recopilación y limpieza de datos hasta las pruebas previas a la implementación, excepto el entrenamiento del modelo y el OCR.

| Nombre del Cuaderno | Descripción |
|---------------------|-------------|
| `create_and_clean_dataset.ipynb` | Crea el dataset original con las URLs de las imágenes y sus etiquetas (labels). |
| `dataset_processing.ipynb` | Transforma el dataset guardando imágenes localmente y convirtiendo etiquetas a valores numéricos. |
| `app.ipynb` | Integra `model_ocr.ipynb` y `model_training`, usando el código para la interfaz de Streamlit. |

## 🌐 Web scraping `/scraping`

Estos notebooks realizan la extracción de datos desde distintas fuentes web de componentes de PC.

| Nombre del Cuaderno | Descripción |
|---------------------|-------------|
| `scraping_pccomponentes.ipynb` | Realiza scraping de datos de componentes de PC desde PCComponentes. |
| `scraping_processors.ipynb` | Realiza scraping de datos específicos de procesadores. |
| `scraping_pcpartpicker.ipynb`| Realiza scraping de datos de componentes desde PCPartPicker. |
| `scraping_steam.ipynb`| Este cuaderno Jupyter contiene el codigo fuente encargado de la extraccion automatica de datos desde la plataforma **Steam**. |


## 🐍 Versión de Python

El proyecto utiliza Python 3.12 para todo el código.

> [!NOTE]
> Asegúrate de instalar Python 3.12 antes de crear el entorno virtual para que todos los notebooks y la demo funcionen correctamente.


## ⚡ Ejecutar notebooks en entorno local

1. **Crear el entorno virtual**

   ```bash
   python -m venv venv
   ```

2. **Activar el entorno**

   * En **Linux / macOS**:

     ```bash
     source venv/bin/activate
     ```
   * En **Windows**:

     ```cmd
     venv\Scripts\activate
     ```

3. **Instalar dependencias**

    ```bash
    ip install -r requirements.txt
     ```

4. **Ejecutar Jupyter Notebook**

   ```bash
   pip install notebook
   jupyter notebook
   ```
