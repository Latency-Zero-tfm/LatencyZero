import { ChatSession } from "../interfaces/chatSession.interface";

export const MOCK_CHAT_SESSIONS: ChatSession[] = [
  {
    id: '1',
    title: 'Mejor PC gaming 4K 2025',
    preview: '¿Qué GPU me recomendarías para gaming en 4K?',
    timestamp: new Date(),
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: '¿Qué GPU me recomendarías para gaming en 4K con un presupuesto de 600€?',
        timestamp: new Date(),
      },
      {
        id: 'm2',
        role: 'assistant',
        content: 'Para gaming en 4K con un presupuesto de 600€, te recomendaría la NVIDIA RTX 4070 Super. Es una opción que ofrece un rendimiento sólido en 4K en la mayoría de títulos, buena eficiencia energética y es compatible con DLSS 3 para mejorar el rendimiento.\n\nSi puedes estirar un poco el presupuesto, la RTX 4070 Ti Super sería aún mejor para 4K nativo sin upscaling.',
        timestamp: new Date(),
      },
    ],
  },
  {
    id: '2',
    title: 'Compatibilidad RAM DDR5',
    preview: 'La plataforma AM4 no soporta DDR5',
    timestamp: new Date(Date.now() - 86400000),
    messages: [
      {
        id: 'm3',
        role: 'user',
        content: 'Tengo una placa B550 con un Ryzen 5 5600X, ¿es compatible con RAM DDR5?',
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: 'm4',
        role: 'assistant',
        content: 'No, la plataforma AM4 (que usa el Ryzen 5 5600X con placas B550) no es compatible con DDR5. Solo soporta DDR4.\n\nPara usar DDR5 necesitarías actualizar a una plataforma AM5 como el Ryzen 7000 series con una placa X670 o B650.',
        timestamp: new Date(Date.now() - 86400000),
      },
    ],
  },
  {
    id: '3',
    title: 'Refrigeración Ryzen 9 7950X',
    preview: 'Una AIO de 360mm sería lo ideal',
    timestamp: new Date(Date.now() - 3 * 86400000),
    messages: [
      {
        id: 'm5',
        role: 'user',
        content: '¿Qué sistema de refrigeración me recomiendas para un Ryzen 9 7950X? He visto que se calientan bastante.',
        timestamp: new Date(Date.now() - 3 * 86400000),
      },
      {
        id: 'm6',
        role: 'assistant',
        content: 'Es correcto, esos procesadores están diseñados para operar a temperaturas altas. Para mantenerlo a raya bajo cargas pesadas, una AIO (refrigeración líquida) de 360mm sería lo ideal. Opciones como la Arctic Liquid Freezer III 360 o la NZXT Kraken Elite 360 te darán el mejor rendimiento térmico.',
        timestamp: new Date(Date.now() - 3 * 86400000),
      },
    ],
  },
  {
    id: '4',
    title: 'PSU para RTX 4090 + i9-14900K',
    preview: 'Necesitarías mínimo 1000W',
    timestamp: new Date(Date.now() - 5 * 86400000),
    messages: [
      {
        id: 'm7',
        role: 'user',
        content: 'Voy a montar un equipo nuevo con una RTX 4090 y un procesador Intel Core i9-14900K. ¿De cuántos vatios tiene que ser la fuente de alimentación?',
        timestamp: new Date(Date.now() - 5 * 86400000),
      },
      {
        id: 'm8',
        role: 'assistant',
        content: 'Para esa combinación de gama ultra alta, necesitarías mínimo 1000W. Sin embargo, para tener un buen margen de seguridad frente a picos de consumo, lo más recomendable sería ir por una de 1200W con certificación ATX 3.0 (que traiga el cable 12VHPWR nativo). Una Corsair RM1200x Shift o una Seasonic Vertex GX-1200 serían perfectas.',
        timestamp: new Date(Date.now() - 5 * 86400000),
      },
    ],
  },
];
