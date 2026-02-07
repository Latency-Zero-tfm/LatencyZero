# 🗃️ Data

Los datos utilizados para entrenar los modelos se obtuvieron mediante técnicas de **web scraping** y fueron posteriormente recopilados y procesados para su análisis y preparación en este proyecto.

Las fuentes de información incluyeron sitios web especializados en componentes de PC:  

- [PCComponentes](https://www.pccomponentes.com)  
- [TechPowerUp](https://www.techpowerup.com)  
- [PCPartPicker](https://pcpartpicker.com)

Estos portales proporcionan información detallada sobre marcas, modelos y especificaciones técnicas, lo que permitió construir un dataset representativo y de calidad para el entrenamiento del modelo.


![dataset](/img/dataset.png)

```
.
├── README.md
├── images
│   └── ...
├── processed
│   ├── components_01.csv
│   ├── components_01.json
│   ├── components_02.csv
│   └── components_03.csv
│   └── components_04.csv
└── raw
    ├── pccomponentes
    │   ├── productos_pccomponentes.csv
    │   └── productos_pccomponentes.json
    ├── pcpartpicker
    │   ├── csv
    │   │   ├── cases_pspartpicker.csv
    │   │   ├── cpu_cooler_pspartpicker.csv
    │   │   ├── cpu_pspartpicker.csv
    │   │   ├── gpu_pspartpicker.csv
    │   │   ├── monitor_pspartpicker.csv
    │   │   ├── motherboard_pspartpicker.csv
    │   │   ├── os_pspartpicker.csv
    │   │   ├── psu_pspartpicker.csv
    │   │   ├── ram_pspartpicker.csv
    │   │   └── storage_pspartpicker.csv
    │   └── json
    │       ├── cases_pspartpicker.json
    │       ├── cpu_cooler_pspartpicker.json
    │       ├── cpu_pspartpicker.json
    │       ├── gpu_pspartpicker.json
    │       ├── monitor_pspartpicker.json
    │       ├── motherboard_pspartpicker.json
    │       ├── os_pspartpicker.json
    │       ├── psu_pspartpicker.json
    │       ├── ram_pspartpicker.json
    │       └── storage_pspartpicker.json
    └── techpowerup
        ├── productos_cpu.csv
        └── productos_cpu.json
```