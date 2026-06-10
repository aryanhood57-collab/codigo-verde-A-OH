import { useState, useEffect, useRef } from "react";

// ─── PALETA PASTEL HOTELERA ───────────────────────────────────────────────────
const COLORS = {
  bg: "#F0F7F4",
  card: "#FFFFFF",
  headerBg: "#D6EAF8",
  calentamiento: "#D5F5E3",
  calentamientoDark: "#1E8449",
  nucleo: "#FCF3CF",
  nucleoDark: "#B7770D",
  sprint: "#FADBD8",
  sprintDark: "#922B21",
  accent: "#1A5276",
  accentLight: "#D6EAF8",
  text: "#1C2833",
  textLight: "#566573",
  correct: "#1E8449",
  wrong: "#C0392B",
  border: "#AED6F1",
  gold: "#F0B429",
  revealed: "#1A5276",
  hidden: "#BFC9CA",
  teamAlfa: "#D6EAF8",
  teamGamma: "#D5F5E3",
  teamEpsilon: "#FCF3CF",
};

// ─── DATOS DE LOS RETOS — VERSIÓN A ──────────────────────────────────────────
// Palabra: H-O-U-S-K-E-E-P-E-R (10 letras, una por reto)
const RETOS = [
  // ════════════════════════════════════════════════════════
  // BLOQUE 1: CALENTAMIENTO (Retos 1–3, 10 min c/u)
  // ════════════════════════════════════════════════════════
  {
    id: 1, bloque: "CALENTAMIENTO", minutos: 10,
    letra: "H",
    titulo: "La Huella Invisible del Hotel",
    narrativa: `Un hotel de 80 habitaciones en Ciudad de Panamá ha solicitado tu diagnóstico ambiental inicial. El gerente dice que "el hotel es limpio porque limpian todo el día". Tu equipo tiene 10 minutos para demostrarle que "limpio" y "sostenible" no son lo mismo.`,
    escenario: `Datos del Hotel Brisa Marina:
• Consumo de agua: 320 litros/habitación/noche (benchmark UNWTO: 170 L/hab/noche)
• Energía: 45 kWh/habitación/noche (benchmark eficiente: 25 kWh/hab/noche)
• Residuos: 2.8 kg/huésped/noche (promedio global: 1.0 kg/huésped/noche)
• Productos de limpieza: 18 tipos distintos, ninguno con sello ecoetiqueta
• Lavandería: 12 cargas/día de 8 kg c/u con agua a 90°C`,
    pregunta1: {
      texto: "Calcula la huella hídrica diaria del hotel si opera con 65 habitaciones ocupadas. Compara con el benchmark de la UNWTO e indica el exceso en porcentaje.",
      tipo: "abierta",
      respuesta: "Consumo real: 65 hab × 320 L = 20,800 L/día. Benchmark UNWTO: 65 × 170 L = 11,050 L/día. Exceso: (20,800 – 11,050) / 11,050 × 100 = 88.2% por encima del estándar internacional. El hotel consume casi el doble del agua recomendada.",
    },
    pregunta2: {
      texto: "¿Cuál de los siguientes describe mejor el concepto de 'huella ambiental' de un establecimiento hotelero?",
      opciones: [
        "A) La cantidad de residuos sólidos generados por habitación ocupada",
        "B) El total de impactos ambientales negativos causados por todas las operaciones del hotel, incluyendo agua, energía, residuos y emisiones",
        "C) El número de productos químicos utilizados en el área de housekeeping",
        "D) El porcentaje de energía renovable utilizada en el establecimiento",
      ],
      correcta: "B",
      explicacion: "La huella ambiental es un concepto integrador que abarca todos los impactos que genera una organización sobre el medio ambiente: consumo de recursos naturales (agua, energía), generación de residuos, emisiones de GEI y uso de sustancias peligrosas. No se limita a un solo aspecto operativo.",
    },
  },
  {
    id: 2, bloque: "CALENTAMIENTO", minutos: 10,
    letra: "O",
    titulo: "ODS en el Check-in",
    narrativa: `La cadena hotelera donde trabajas quiere publicar su primer Informe de Sostenibilidad. El director pide que identifiques qué Objetivos de Desarrollo Sostenible aplican directamente a sus operaciones. Tienes 10 minutos para construir ese argumento.`,
    escenario: `Perfil del Hotel Continental Plaza:
• 120 habitaciones, restaurante de 80 puestos, salón de eventos, spa, piscina
• Emplea 95 personas (60% mujeres, 40% contratos locales del área metropolitana)
• Proveedor de alimentos: 30% local, 70% importado
• Energía: 100% red eléctrica nacional (mix hídrico + termoeléctrico)
• Programa de reciclaje: solo cartón y vidrio
• Sin política formal de inclusión ni protocolo de seguridad ocupacional`,
    pregunta1: {
      texto: "Identifica 4 ODS directamente aplicables a este hotel y para cada uno señala una acción concreta que el establecimiento podría implementar en sus operaciones actuales.",
      tipo: "abierta",
      respuesta: "ODS 6 (Agua limpia): instalar sistemas de reutilización de agua de lavandería. ODS 7 (Energía asequible): incorporar paneles solares en techos y calentadores solares de agua. ODS 8 (Trabajo decente): formalizar contratos con beneficios completos y programa de capacitación. ODS 12 (Producción responsable): ampliar el reciclaje a orgánicos y plásticos, incrementar proveedores locales al 60%. También válidos: ODS 13 (acción climática), ODS 14/15 (si tiene acceso a áreas costeras/naturales), ODS 17 (alianzas).",
    },
    pregunta2: {
      texto: "¿Qué ODS está más directamente vinculado con la gestión eficiente del agua en operaciones de alojamiento y hospitalidad?",
      opciones: [
        "A) ODS 3 — Salud y bienestar",
        "B) ODS 6 — Agua limpia y saneamiento",
        "C) ODS 11 — Ciudades y comunidades sostenibles",
        "D) ODS 14 — Vida submarina",
      ],
      correcta: "B",
      explicacion: "El ODS 6 busca garantizar la disponibilidad y gestión sostenible del agua potable y el saneamiento. Los hoteles son grandes consumidores de agua (piscinas, lavandería, restauración, habitaciones), lo que los convierte en actores clave para alcanzar las metas del ODS 6, especialmente la 6.3 (calidad del agua) y la 6.4 (eficiencia en el uso).",
    },
  },
  {
    id: 3, bloque: "CALENTAMIENTO", minutos: 10,
    letra: "U",
    titulo: "El Turista que Deja Huella",
    narrativa: `Una consultora ambiental te contrató para calcular la huella de carbono de la estadía de un grupo de turistas en un resort de playa. El cliente quiere saber exactamente cuánto CO₂ generó su visita para compensarlo con proyectos de reforestación. Tienes 10 minutos.`,
    escenario: `Grupo de 8 turistas, estadía de 3 noches:
• Consumo eléctrico asignado: 35 kWh/habitación/noche × 4 hab × 3 noches
• Factor de emisión eléctrico Panamá (ETESA/CEPAL): 0.264 kg CO₂eq/kWh
• Agua caliente (gas LP): 40 L/persona/día × factor 0.002 kg CO₂eq/L
• Residuos generados: 1.2 kg/persona/noche → 40% orgánico a relleno sanitario
• Factor residuos orgánicos en relleno: 0.5 kg CO₂eq/kg orgánico
• Transporte al resort (bus turístico, 120 km ida y vuelta): 0.089 kg CO₂eq/km/pasajero`,
    pregunta1: {
      texto: "Calcula la huella de carbono total (kg CO₂eq) de la estadía del grupo, desglosada por: electricidad, agua caliente, residuos orgánicos y transporte.",
      tipo: "abierta",
      respuesta: "Electricidad: 35 × 4 × 3 × 0.264 = 111.0 kg CO₂eq. Agua caliente: 40 × 8 × 3 × 0.002 = 1.9 kg CO₂eq. Residuos orgánicos: (1.2 × 8 × 3) × 0.40 × 0.5 = 5.8 kg CO₂eq. Transporte: 120 × 8 × 0.089 = 85.4 kg CO₂eq. TOTAL: 204.1 kg CO₂eq para el grupo completo. Per cápita: ~25.5 kg CO₂eq/turista.",
    },
    pregunta2: {
      texto: "Según los datos del escenario, ¿cuál fuente representa la mayor contribución a la huella de carbono de la estadía del grupo?",
      opciones: [
        "A) Los residuos orgánicos enviados al relleno sanitario",
        "B) El consumo de agua caliente con gas LP",
        "C) El consumo de energía eléctrica en las habitaciones",
        "D) El transporte en bus turístico",
      ],
      correcta: "C",
      explicacion: "El consumo eléctrico genera ~111 kg CO₂eq, siendo la mayor fuente individual (54% del total). El transporte ocupa el segundo lugar (~85 kg CO₂eq), seguido por residuos (~5.8 kg) y agua caliente (~1.9 kg). Esto demuestra que la eficiencia energética es la palanca más poderosa para reducir la huella de carbono hotelera.",
    },
  },

  // ════════════════════════════════════════════════════════
  // BLOQUE 2: NÚCLEO TÉCNICO (Retos 4–7, 8 min c/u)
  // ════════════════════════════════════════════════════════
  {
    id: 4, bloque: "NÚCLEO TÉCNICO", minutos: 8,
    letra: "S",
    titulo: "Housekeeping Bajo la Lupa",
    narrativa: `El departamento de Housekeeping del Hotel Gran Pacífico está siendo auditado por MiAMBIENTE tras una queja vecinal por el vertido incorrecto de agua con detergentes al drenaje pluvial. Tu equipo debe identificar los aspectos e impactos ambientales del área antes de que llegue el inspector. Tienes 8 minutos.`,
    escenario: `Operaciones diarias del área de Housekeeping (120 habitaciones):
• Limpieza: 22 productos químicos distintos (desengrasantes, blanqueadores, ambientadores)
• Lavandería interna: 480 kg ropa/día, temperatura media 75°C, detergente con fosfatos
• Cambio de ropa de cama: diario (política actual), sin programa de reutilización
• Residuos de amenidades: 240 minibotellas plásticas/día (shampoo, acondicionador, jabón)
• Agua utilizada en limpieza: ~85 L/habitación/turno
• Disposición actual: todo al drenaje general sin pretratamiento`,
    pregunta1: {
      texto: "Construye una tabla de aspectos e impactos para el área de Housekeeping con al menos 4 aspectos ambientales, indicando para cada uno: aspecto, impacto asociado, medio receptor y nivel de significancia (Alto/Medio/Bajo).",
      tipo: "abierta",
      respuesta: "Aspecto 1: Uso de productos químicos con fosfatos → Impacto: eutrofización de cuerpos de agua → Medio: agua → Significancia: ALTA. Aspecto 2: Generación de minibotellas plásticas → Impacto: contaminación por residuos sólidos plásticos → Medio: suelo/agua → ALTA. Aspecto 3: Consumo de agua en lavandería → Impacto: agotamiento del recurso hídrico → Medio: agua → MEDIA. Aspecto 4: Consumo energético en lavado a alta temperatura → Impacto: aumento de emisiones de GEI → Medio: aire → MEDIA. Aspecto 5 (opcional): Vertido de aguas residuales sin tratamiento → Impacto: contaminación de acuíferos → Medio: agua → ALTA.",
    },
    pregunta2: {
      texto: "¿Cuál es la diferencia fundamental entre un 'aspecto ambiental' y un 'impacto ambiental' según la norma ISO 14001:2015?",
      opciones: [
        "A) El aspecto es el daño causado al ambiente; el impacto es la actividad que lo genera",
        "B) El aspecto es el elemento de las actividades de la organización que puede interactuar con el ambiente; el impacto es el cambio en el ambiente resultante de ese aspecto",
        "C) El aspecto es siempre negativo; el impacto puede ser positivo o negativo",
        "D) Son sinónimos utilizados indistintamente en la norma ISO 14001",
      ],
      correcta: "B",
      explicacion: "ISO 14001:2015 define aspecto ambiental como el elemento de las actividades, productos o servicios de una organización que puede interactuar con el ambiente (ej.: uso de detergentes). El impacto ambiental es cualquier cambio en el ambiente, adverso o beneficioso, como resultado total o parcial de los aspectos ambientales (ej.: eutrofización del río receptor). La relación es causa (aspecto) → efecto (impacto).",
    },
  },
  {
    id: 5, bloque: "NÚCLEO TÉCNICO", minutos: 8,
    letra: "K",
    titulo: "Cocina Sostenible en Crisis",
    narrativa: `El restaurante del hotel recibió una auditoría de sostenibilidad sorpresa. El chef ejecutivo te llama desesperado: tiene 8 minutos antes de que el auditor entre a la cocina. Necesita que su equipo identifique los impactos críticos y proponga al menos una solución concreta por área.`,
    escenario: `Restaurante del Hotel — 80 puestos, operación 7 días/semana:
• Residuos orgánicos de cocina: 48 kg/día (cáscaras, recortes, preparaciones)
• Aceite de cocina usado: 35 litros/semana (disposición actual: fregadero)
• Refrigeración: 4 cámaras con gas refrigerante R-22 (gas con alto potencial de agotamiento de ozono)
• Gas LP en cocinas: 2 cilindros de 100 lb/semana
• Agua en plonge (lavado industrial): 1,200 L/turno
• Empaques de proveedores: 40 kg plástico/semana, sin separación`,
    pregunta1: {
      texto: "Para el aceite de cocina usado y los residuos orgánicos, diseña el protocolo de manejo correcto: recolección, almacenamiento temporal, disposición final y el impacto ambiental que se previene con cada protocolo.",
      tipo: "abierta",
      respuesta: "Aceite usado: recolectar en bidones herméticos etiquetados 'aceite usado - no mezclar con agua', almacenar en área techada con contención secundaria (bandeja), entregar a gestor ambiental autorizado para recolección/reciclaje en biodiesel. Previene: obstrucción de redes de alcantarillado, contaminación de acuíferos (1 L de aceite contamina 1,000 L de agua). Residuos orgánicos: separar en contenedores diferenciados, almacenar en cuarto frío de residuos, destinar a compostaje o biogás. Previene: generación de lixiviados en relleno sanitario, emisiones de metano (GEI), proliferación de vectores.",
    },
    pregunta2: {
      texto: "El gas refrigerante R-22 que utilizan las cámaras del restaurante está regulado internacionalmente porque:",
      opciones: [
        "A) Es altamente inflamable y representa un riesgo de incendio en cocinas profesionales",
        "B) Tiene un alto potencial de agotamiento de la capa de ozono y está siendo eliminado progresivamente bajo el Protocolo de Montreal",
        "C) Genera olores fuertes que afectan la calidad de los alimentos almacenados",
        "D) Su producción industrial genera grandes cantidades de residuos sólidos peligrosos",
      ],
      correcta: "B",
      explicacion: "El R-22 (clorodifluorometano) es un hidroclorofluorocarbono (HCFC) con un Potencial de Agotamiento del Ozono (PAO) de 0.055, regulado bajo el Protocolo de Montreal. Los países en desarrollo debieron eliminarlo progresivamente a partir de 2020. Su reemplazo son los HFC (como R-410A) y los HFO, con PAO de cero, aunque algunos tienen alto Potencial de Calentamiento Global.",
    },
  },
  {
    id: 6, bloque: "NÚCLEO TÉCNICO", minutos: 8,
    letra: "E",
    titulo: "El Informe que Salva el Hotel",
    narrativa: `Un hotel boutique recibió una notificación de MiAMBIENTE por no contar con un diagnóstico ambiental documentado. El gerente tiene una reunión con el regulador en dos días. Tu equipo debe estructurar los hallazgos más críticos del diagnóstico para que el hotel pueda presentar un plan de acción creíble. Tienes 8 minutos.`,
    escenario: `Hallazgos del diagnóstico preliminar — Hotel Boutique Selva Verde (28 habitaciones):
• Residuos: mezcla de orgánicos, reciclables y peligrosos (pilas, fluorescentes) en el mismo contenedor
• Agua: consumo 410 L/hab/noche, sin medidores por área, sin programa de reutilización de toallas
• Energía: 100% incandescente en habitaciones y pasillos, A/C en modo continuo 24/7
• Ruido: generador diésel a 15 metros de habitaciones sin barrera acústica
• Químicos: almacén de limpieza sin fichas técnicas, sin EPP disponible para el personal
• Aguas residuales: no hay trampa de grasas antes del drenaje municipal`,
    pregunta1: {
      texto: "Clasifica los 6 hallazgos según su nivel de riesgo ambiental (Crítico / Significativo / Moderado) y justifica los dos que clasificaste como Críticos con el impacto concreto que generan.",
      tipo: "abierta",
      respuesta: "CRÍTICOS: (1) Mezcla de residuos peligrosos con comunes — riesgo de contaminación química del suelo y agua subterránea por pilas/mercurio de fluorescentes; violación de normativa de manejo de residuos peligrosos. (2) Sin trampa de grasas — las grasas obstruyen el sistema municipal y generan lixiviados con alta DBO que contaminan cuerpos de agua receptores. SIGNIFICATIVOS: consumo de agua sin medición (imposible gestionar lo que no se mide), químicos sin fichas/EPP (riesgo ocupacional y ambiental). MODERADOS: energía incandescente (ineficiencia pero sin violación normativa inmediata), ruido del generador (impacto en bienestar huésped y comunidad). Las clasificaciones justificadas con criterios de probabilidad, severidad y marco legal son válidas.",
    },
    pregunta2: {
      texto: "¿Cuál es la función principal de una trampa de grasas en las instalaciones de un hotel o restaurante?",
      opciones: [
        "A) Filtrar los sólidos grandes para evitar obstrucciones en las tuberías de agua potable",
        "B) Separar las grasas y aceites de las aguas residuales antes de su descarga al sistema de alcantarillado",
        "C) Tratar las aguas grises del área de lavandería mediante filtración por carbón activado",
        "D) Recircular el agua de la piscina eliminando los residuos orgánicos flotantes",
      ],
      correcta: "B",
      explicacion: "La trampa de grasas es un dispositivo de pretratamiento que aprovecha la diferencia de densidad entre el agua y las grasas/aceites: las grasas flotan y quedan retenidas en la cámara, mientras el agua relativamente limpia fluye hacia el alcantarillado. Sin ella, las grasas solidifican en las tuberías municipales y generan aguas residuales con alta carga orgánica (DBO elevada) que afectan las plantas de tratamiento.",
    },
  },
  {
    id: 7, bloque: "NÚCLEO TÉCNICO", minutos: 8,
    letra: "E",
    titulo: "Bar Verde: Cócteles con Conciencia",
    narrativa: `El bar del hotel ha sido seleccionado para un programa piloto de sostenibilidad. El gerente de bar quiere demostrar que las operaciones de un bar pueden ser ambientalmente responsables. Tu equipo debe diseñar el argumento técnico y el plan de acción. Tienes 8 minutos.`,
    escenario: `Bar del Hotel Cosmos — operación nocturna, 6 noches/semana:
• Consumo de botellas de vidrio: 180/semana (solo 20% va a reciclaje, 80% a basura general)
• Popotes/pajillas plásticas: 400/semana, desechables
• Frutas frescas: 15 kg/semana, 35% se desperdicia (oxidación, sobrecompra)
• Agua en cóctelería: 280 L/noche (lavado de vasos, hielo, preparaciones)
• Servilletas: 500 unidades de papel virgen/noche
• Iluminación: 40 focos dicroicos de 50W operando 6 horas/noche`,
    pregunta1: {
      texto: "Propón un programa de 'Bar Verde' con al menos 4 medidas concretas de mejora ambiental. Para cada medida indica: el aspecto que atiende, la acción específica, el beneficio ambiental cuantificable y el ODS al que contribuye.",
      tipo: "abierta",
      respuesta: "Medida 1: Reciclaje de vidrio al 90% → aspecto: residuos de vidrio → acción: convenio con gestor de reciclaje, contenedor diferenciado → beneficio: desvía ~144 botellas/semana del relleno, ahorra 30% energía en producción de vidrio nuevo → ODS 12. Medida 2: Eliminar popotes plásticos → aspecto: residuos plásticos → acción: sustitución por popotes de bambú/acero/papel → beneficio: 400 unidades plásticas/semana menos → ODS 14/12. Medida 3: Gestión FIFO de frutas → aspecto: desperdicio alimentario → acción: rotación FIFO + menú de 'cócteles del excedente' → beneficio: reduce 35% desperdicio (~5.25 kg/semana) → ODS 12/2. Medida 4: LED en iluminación → aspecto: consumo energético → acción: cambio de dicroicos 50W por LED 8W → beneficio: ahorro 84% energía = 2,016 Wh/noche → ODS 7/13.",
    },
    pregunta2: {
      texto: "En el contexto de la sostenibilidad hotelera, ¿qué principio describe la jerarquía correcta de gestión de residuos, de mayor a menor preferencia?",
      opciones: [
        "A) Reciclar → Reutilizar → Reducir → Disponer",
        "B) Reducir → Reutilizar → Reciclar → Recuperar → Disponer adecuadamente",
        "C) Disponer adecuadamente → Reciclar → Reutilizar → Reducir",
        "D) Reutilizar → Reducir → Reciclar → Incinerar",
      ],
      correcta: "B",
      explicacion: "La jerarquía de residuos (pirámide de las 5R o regla de las 3R ampliada) establece que la prioridad máxima es REDUCIR la generación en origen, seguida de REUTILIZAR los materiales, luego RECICLAR, después RECUPERAR energía (compostaje, biogás), y como última opción la DISPOSICIÓN ADECUADA en relleno sanitario controlado. Esta jerarquía minimiza el consumo de recursos y la contaminación.",
    },
  },

  // ════════════════════════════════════════════════════════
  // BLOQUE 3: SPRINT FINAL (Retos 8–10, 5 min c/u)
  // ════════════════════════════════════════════════════════
  {
    id: 8, bloque: "SPRINT FINAL", minutos: 5,
    letra: "P",
    titulo: "El KPI que Miente",
    narrativa: `Un analista presentó 5 indicadores ambientales para el reporte anual del hotel. Tu equipo tiene 5 minutos para identificar cuál no es un KPI verde válido y explicar por qué.`,
    escenario: `Indicadores presentados por el analista:
1. Litros de agua consumidos por habitación ocupada por noche
2. Kilovatios-hora de energía por metro cuadrado de área construida por mes
3. Porcentaje de residuos desviados del relleno sanitario sobre total generado
4. Número de quejas de huéspedes sobre limpieza recibidas por semana
5. Toneladas de CO₂ equivalente emitidas por habitación disponible por año`,
    pregunta1: {
      texto: "Identifica el indicador que NO es un KPI ambiental válido, explica por qué no lo es, y propón un KPI ambiental que sí podría reemplazarlo para esa área operativa.",
      tipo: "abierta",
      respuesta: "El indicador #4 ('quejas de huéspedes sobre limpieza') es un KPI de satisfacción del cliente/calidad de servicio, no un indicador de desempeño ambiental. Mide la percepción del huésped, no el impacto sobre el ambiente. Un KPI ambiental válido para el área de limpieza podría ser: 'Litros de producto químico concentrado utilizado por habitación por mes' o 'Porcentaje de productos de limpieza con certificación ecológica sobre total de productos usados' o 'Kilogramos de residuos peligrosos de limpieza generados por mes'.",
    },
    pregunta2: {
      texto: "¿Cuál es la característica esencial que distingue un KPI ambiental de un indicador operativo convencional?",
      opciones: [
        "A) El KPI ambiental siempre se expresa en unidades monetarias (costo del impacto)",
        "B) El KPI ambiental mide el desempeño de la organización en relación con su interacción con el ambiente natural",
        "C) El KPI ambiental solo aplica a industrias extractivas y manufactureras, no a servicios",
        "D) El KPI ambiental es obligatorio únicamente para empresas certificadas bajo ISO 14001",
      ],
      correcta: "B",
      explicacion: "Un KPI ambiental (Key Performance Indicator ambiental) mide específicamente el desempeño de la organización en su relación con el ambiente: consumo de recursos naturales, generación de residuos, emisiones, calidad del agua, etc. A diferencia de los KPI operativos convencionales (productividad, ventas, satisfacción), los ambientales tienen como referente el sistema natural y los límites planetarios. Son aplicables a cualquier tipo de organización, independientemente de su sector o certificación.",
    },
  },
  {
    id: 9, bloque: "SPRINT FINAL", minutos: 5,
    letra: "E",
    titulo: "Recepción Verde: La Decisión Rápida",
    narrativa: `El turno de noche en recepción. Llegan tres situaciones ambientales simultáneas. Tu equipo tiene 5 minutos para decidir la acción correcta en cada una.`,
    escenario: `Situación A: Un huésped entregó en recepción una bolsa con pilas usadas, medicamentos vencidos y una bombilla fluorescente rota.
Situación B: El técnico de mantenimiento reporta que el A/C de la habitación 412 tiene fuga de gas refrigerante — hay un olor químico leve en el pasillo.
Situación C: Un proveedor llegó a entregar 200 litros de cloro líquido concentrado y 50 kg de detergente granulado. El almacén de químicos está lleno.`,
    pregunta1: {
      texto: "Para cada una de las tres situaciones, describe la acción inmediata correcta que debe tomar el equipo, indicando a quién se notifica, cómo se maneja el material y qué riesgo ambiental u ocupacional se previene.",
      tipo: "abierta",
      respuesta: "Situación A: Recibir los residuos peligrosos, colocarlos en contenedor diferenciado señalizado 'Residuos Peligrosos', NO mezclar la bombilla rota con otros residuos (mercurio), notificar al responsable ambiental del hotel para coordinación con gestor autorizado. Previene: contaminación por mercurio, plomo de pilas y residuos farmacéuticos. Situación B: Evacuar la habitación 412 y habitaciones adyacentes, no intentar reparar, llamar inmediatamente al técnico de refrigeración certificado, ventilar el área. Si es R-22, notificar al gestor ambiental — su liberación requiere registro. Previene: intoxicación ocupacional y emisión de ODS/GEI. Situación C: No recibir el pedido si el almacén está lleno; almacenar temporalmente en área ventilada, techada y con contención secundaria NUNCA junto a ácidos o materiales incompatibles; verificar fichas de seguridad (SDS). Previene: reacción química accidental, incendio, contaminación por derrame.",
    },
    pregunta2: {
      texto: "Las Fichas de Datos de Seguridad (FDS/SDS) de los productos químicos utilizados en hoteles deben estar disponibles porque:",
      opciones: [
        "A) Son un requisito únicamente del Ministerio de Salud para productos de uso alimentario",
        "B) Contienen información crítica sobre propiedades peligrosas, medidas de primeros auxilios, almacenamiento seguro y disposición ambiental correcta de cada producto",
        "C) Permiten al hotel calcular el costo ambiental de cada producto para el informe de sostenibilidad",
        "D) Son exigidas solo cuando el hotel solicita certificación de turismo sostenible",
      ],
      correcta: "B",
      explicacion: "Las Fichas de Datos de Seguridad (FDS), conocidas internacionalmente como SDS (Safety Data Sheets) bajo el Sistema Globalmente Armonizado (SGA), contienen 16 secciones con información esencial: identificación del producto, peligros, composición, primeros auxilios, lucha contra incendios, derrames, manipulación y almacenamiento, controles de exposición/EPP, propiedades fisicoquímicas, estabilidad y reactividad, información toxicológica, ecológica y sobre la disposición. Son obligatorias en cualquier centro de trabajo que use sustancias peligrosas.",
    },
  },
  {
    id: 10, bloque: "SPRINT FINAL", minutos: 5,
    letra: "R",
    titulo: "El Cierre Verde del Turno",
    narrativa: `¡Último reto! El turno está a punto de cerrar. El gerente de sostenibilidad llama: necesita que el equipo confirme si el hotel está en condiciones de aplicar a la certificación de Turismo Sostenible. Tienen los datos del año. 5 minutos para el veredicto final.`,
    escenario: `Reporte anual del Hotel Estrella del Pacífico:
• Agua: reducción del 18% vs. año anterior (meta: 15%) ✓
• Energía: aumento del 3% (meta: reducción del 10%) ✗
• Residuos reciclados: 52% del total generado (meta: 60%) ✗
• Capacitación ambiental personal: 85% del personal capacitado (meta: 80%) ✓
• Incidentes ambientales documentados: 3 (todos con plan correctivo) ✓
• Proveedores sostenibles: 22% (meta: 30%) ✗`,
    pregunta1: {
      texto: "Elabora un veredicto técnico sobre la elegibilidad del hotel para la certificación. Identifica las brechas críticas, prioriza cuál debe atenderse primero y justifica por qué ese criterio es el más urgente desde una perspectiva ambiental.",
      tipo: "abierta",
      respuesta: "El hotel cumple 3 de 6 metas (agua, capacitación, gestión de incidentes) y falla en 3 (energía, reciclaje, proveedores). Desde una perspectiva ambiental, la brecha más crítica es la ENERGÍA: no solo no se cumplió la meta sino que hubo un aumento del 3%, lo que significa que las emisiones de GEI crecieron. El consumo energético es el mayor contribuyente a la huella de carbono hotelera y un criterio de alta ponderación en los estándares de turismo sostenible (ej.: Green Globe, Rainforest Alliance). La brecha de reciclaje (52% vs 60%) es significativa pero más fácil de cerrar operativamente. Veredicto: el hotel no está listo para certificarse en este ciclo; debe implementar un plan de eficiencia energética urgente (auditoría, LED, automatización de A/C) y establecer metas mensuales para el año siguiente.",
    },
    pregunta2: {
      texto: "En un sistema de gestión ambiental bajo el ciclo PHVA (Planificar-Hacer-Verificar-Actuar), ¿en qué fase se ubica el análisis de brechas entre metas propuestas y resultados obtenidos?",
      opciones: [
        "A) Planificar — porque determina las acciones futuras del sistema",
        "B) Hacer — porque implica ejecutar el análisis como una actividad del sistema",
        "C) Verificar — porque consiste en comparar los resultados obtenidos con los objetivos establecidos",
        "D) Actuar — porque genera las correcciones necesarias para cerrar las brechas",
      ],
      correcta: "C",
      explicacion: "En el ciclo PHVA, la fase VERIFICAR corresponde al seguimiento, medición, análisis y evaluación del desempeño ambiental: comparar los resultados reales con los objetivos y metas planificados para identificar brechas y desviaciones. La fase ACTUAR (A) es la que sigue: implementa las acciones correctivas y preventivas derivadas de esa verificación. El análisis de brechas es el corazón de la fase Verificar y la base técnica para la mejora continua.",
    },
  },
];

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function CodigoVerdeA_OH() {
  const [equipo, setEquipo] = useState(null);
  const [reto, setReto] = useState(0);
  const [fase, setFase] = useState("intro"); // intro | seleccion | reto | resultado | victoria
  const [seleccion, setSeleccion] = useState(null);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  const [letrasObtenidas, setLetrasObtenidas] = useState([]);
  const [tiempoGlobal, setTiempoGlobal] = useState(90 * 60);
  const [tiempoReto, setTiempoReto] = useState(0);
  const [corriendo, setCorriendo] = useState(false);
  const intervalGlobal = useRef(null);
  const intervalReto = useRef(null);

  const EQUIPOS = [
    { nombre: "ALFA", color: COLORS.teamAlfa, emoji: "🏛️" },
    { nombre: "GAMMA", color: COLORS.teamGamma, emoji: "🌿" },
    { nombre: "ÉPSILON", color: COLORS.teamEpsilon, emoji: "⭐" },
  ];

  const PALABRA = "HOUSKEEPER";

  useEffect(() => {
    if (corriendo && tiempoGlobal > 0) {
      intervalGlobal.current = setInterval(() => setTiempoGlobal(t => t - 1), 1000);
    }
    return () => clearInterval(intervalGlobal.current);
  }, [corriendo]);

  useEffect(() => {
    if (corriendo && tiempoReto > 0) {
      intervalReto.current = setInterval(() => setTiempoReto(t => t - 1), 1000);
    } else if (tiempoReto === 0 && corriendo && fase === "reto") {
      clearInterval(intervalReto.current);
    }
    return () => clearInterval(intervalReto.current);
  }, [corriendo, tiempoReto, fase]);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const iniciarReto = (idx) => {
    setReto(idx);
    setFase("reto");
    setSeleccion(null);
    setMostrarExplicacion(false);
    setTiempoReto(RETOS[idx].minutos * 60);
    if (!corriendo) setCorriendo(true);
  };

  const responder = (opcion) => {
    if (seleccion) return;
    setSeleccion(opcion);
    const correcto = opcion === RETOS[reto].pregunta2.correcta;
    if (correcto) {
      setLetrasObtenidas(prev => [...prev, RETOS[reto].letra]);
    }
    setMostrarExplicacion(true);
    clearInterval(intervalReto.current);
  };

  const siguiente = () => {
    if (reto + 1 >= RETOS.length) {
      setFase("victoria");
      setCorriendo(false);
    } else {
      iniciarReto(reto + 1);
    }
  };

  const bloqueColor = (b) => {
    if (b === "CALENTAMIENTO") return { bg: COLORS.calentamiento, dark: COLORS.calentamientoDark };
    if (b === "NÚCLEO TÉCNICO") return { bg: COLORS.nucleo, dark: COLORS.nucleoDark };
    return { bg: COLORS.sprint, dark: COLORS.sprintDark };
  };

  // ── PANTALLA INTRO ────────────────────────────────────────────────────────
  if (fase === "intro") return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 480, width: "100%", background: COLORS.card, borderRadius: 16, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.10)", border: `2px solid ${COLORS.border}` }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 48 }}>🏨</div>
          <div style={{ fontSize: 11, letterSpacing: 3, color: COLORS.textLight, textTransform: "uppercase", marginTop: 4 }}>ITSE · EDA1001 · II Cuatrimestre 2026</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: COLORS.accent, margin: "10px 0 4px" }}>OPERACIÓN</h1>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: COLORS.calentamientoDark, margin: 0 }}>CÓDIGO VERDE</h1>
          <div style={{ fontSize: 13, color: COLORS.textLight, marginTop: 6 }}>Versión A · Operaciones Hoteleras</div>
        </div>

        <div style={{ background: COLORS.accentLight, borderRadius: 10, padding: "14px 16px", marginBottom: 18, fontSize: 13, color: COLORS.text, lineHeight: 1.6 }}>
          🌿 <strong>BRIEFING DE MISIÓN:</strong> El sistema ambiental hotelero ha sido comprometido. Los sensores ambientales están fallando y solo los equipos con mayor conocimiento técnico podrán restaurarlo. Cada reto superado revela una letra de la clave de desencriptado. ¿Tiene tu equipo el conocimiento para salvar la operación?
        </div>

        <div style={{ background: "#FFF9C4", borderRadius: 10, padding: "12px 14px", marginBottom: 18, fontSize: 12, color: COLORS.text }}>
          <strong>⏱ ESTRUCTURA DE LA MISIÓN:</strong><br />
          🟢 Bloque 1 — Calentamiento: Retos 1–3 (10 min c/u)<br />
          🟡 Bloque 2 — Núcleo Técnico: Retos 4–7 (8 min c/u)<br />
          🔴 Bloque 3 — Sprint Final: Retos 8–10 (5 min c/u)<br />
          <strong>Total: 90 minutos</strong>
        </div>

        <button onClick={() => setFase("seleccion")} style={{ width: "100%", padding: "14px", background: COLORS.accent, color: "#fff", border: "none", borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: "pointer", letterSpacing: 1 }}>
          🔓 INICIAR MISIÓN
        </button>
      </div>
    </div>
  );

  // ── SELECCIÓN DE EQUIPO ───────────────────────────────────────────────────
  if (fase === "seleccion") return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 480, width: "100%", background: COLORS.card, borderRadius: 16, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.10)" }}>
        <h2 style={{ textAlign: "center", color: COLORS.accent, marginBottom: 6, fontSize: 20 }}>🏛️ IDENTIFICA TU EQUIPO</h2>
        <p style={{ textAlign: "center", color: COLORS.textLight, fontSize: 13, marginBottom: 20 }}>Versión A — selecciona el nombre de tu equipo</p>
        {EQUIPOS.map(eq => (
          <button key={eq.nombre} onClick={() => { setEquipo(eq); iniciarReto(0); }}
            style={{ width: "100%", padding: "16px", background: eq.color, color: COLORS.text, border: `2px solid ${COLORS.border}`, borderRadius: 10, fontSize: 17, fontWeight: 700, cursor: "pointer", marginBottom: 12 }}>
            {eq.emoji} EQUIPO {eq.nombre}
          </button>
        ))}
      </div>
    </div>
  );

  // ── PANTALLA DE VICTORIA ──────────────────────────────────────────────────
  if (fase === "victoria") return (
    <div style={{ minHeight: "100vh", background: "#1A5276", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 480, width: "100%", background: COLORS.card, borderRadius: 16, padding: 28, textAlign: "center", boxShadow: "0 4px 30px rgba(0,0,0,0.3)" }}>
        <div style={{ fontSize: 52 }}>🏆</div>
        <h1 style={{ color: COLORS.accent, fontSize: 24, margin: "12px 0 6px" }}>¡MISIÓN COMPLETADA!</h1>
        <p style={{ color: COLORS.textLight, fontSize: 14, marginBottom: 20 }}>Equipo {equipo?.nombre} — Versión A</p>
        <div style={{ background: COLORS.accentLight, borderRadius: 12, padding: "16px", marginBottom: 20 }}>
          <p style={{ fontSize: 13, color: COLORS.textLight, marginBottom: 8 }}>LA CLAVE DESENCRIPTADA ES:</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
            {PALABRA.split("").map((l, i) => (
              <div key={i} style={{ width: 36, height: 36, background: letrasObtenidas.includes(l) || i < letrasObtenidas.length ? COLORS.accent : COLORS.hidden, color: "#fff", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18 }}>
                {l}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 22, fontWeight: 900, color: COLORS.accent, letterSpacing: 3, marginTop: 12 }}>{PALABRA}</p>
        </div>
        <a href="https://teams.microsoft.com" target="_blank" rel="noreferrer"
          style={{ display: "block", width: "100%", padding: "13px", background: "#2563EB", color: "#fff", borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none", boxSizing: "border-box" }}>
          📤 Enviar resultados por Teams
        </a>
      </div>
    </div>
  );

  // ── PANTALLA DE RETO ──────────────────────────────────────────────────────
  const r = RETOS[reto];
  const bc = bloqueColor(r.bloque);

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "Arial, sans-serif", paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ background: COLORS.accent, color: "#fff", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ fontSize: 12 }}>🏨 {equipo?.emoji} {equipo?.nombre} · V.A</div>
        <div style={{ fontSize: 13, fontWeight: 700 }}>⏱ {fmt(tiempoGlobal)}</div>
        <div style={{ fontSize: 12 }}>Reto {r.id}/10</div>
      </div>

      {/* Letras reveladas */}
      <div style={{ background: COLORS.headerBg, padding: "8px 16px", display: "flex", gap: 4, justifyContent: "center", flexWrap: "wrap" }}>
        {PALABRA.split("").map((l, i) => (
          <div key={i} style={{ width: 28, height: 28, background: i < letrasObtenidas.length ? COLORS.revealed : COLORS.hidden, color: "#fff", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, transition: "background 0.4s" }}>
            {i < letrasObtenidas.length ? l : "?"}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 500, margin: "0 auto", padding: "16px" }}>
        {/* Bloque */}
        <div style={{ background: bc.bg, borderRadius: 8, padding: "6px 12px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: bc.dark, letterSpacing: 1 }}>{r.bloque} · RETO {r.id}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: bc.dark }}>⏱ {fmt(tiempoReto)}</span>
        </div>

        {/* Título */}
        <h2 style={{ fontSize: 18, color: COLORS.accent, marginBottom: 10, lineHeight: 1.3 }}>🔐 {r.titulo}</h2>

        {/* Narrativa */}
        <div style={{ background: "#EBF5FB", borderRadius: 8, padding: "12px 14px", marginBottom: 12, fontSize: 13, color: COLORS.text, lineHeight: 1.6, fontStyle: "italic" }}>
          {r.narrativa}
        </div>

        {/* Escenario */}
        <div style={{ background: COLORS.card, borderRadius: 8, padding: "12px 14px", marginBottom: 14, fontSize: 12.5, color: COLORS.text, lineHeight: 1.7, border: `1px solid ${COLORS.border}` }}>
          <strong style={{ color: COLORS.accent }}>📋 DATOS DE LA OPERACIÓN:</strong><br />
          <pre style={{ margin: "6px 0 0", fontFamily: "Arial, sans-serif", whiteSpace: "pre-wrap", fontSize: 12.5 }}>{r.escenario}</pre>
        </div>

        {/* Pregunta abierta */}
        <div style={{ background: "#F9F9F9", borderRadius: 8, padding: "12px 14px", marginBottom: 14, border: `1px solid ${COLORS.border}` }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent, marginBottom: 6 }}>🧪 ANÁLISIS TÉCNICO (respuesta en equipo):</p>
          <p style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.6, margin: 0 }}>{r.pregunta1.texto}</p>
        </div>

        {/* Pregunta opción múltiple */}
        <div style={{ background: COLORS.card, borderRadius: 8, padding: "12px 14px", border: `1px solid ${COLORS.border}` }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: bc.dark, marginBottom: 10 }}>🔑 PREGUNTA CLAVE (obtén la letra "{r.letra}"):</p>
          <p style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.5, marginBottom: 12 }}>{r.pregunta2.texto}</p>
          {r.pregunta2.opciones.map((op) => {
            const letra = op[0];
            const esCor = letra === r.pregunta2.correcta;
            const esSel = letra === seleccion;
            let bg = "#F4F6F7";
            if (seleccion) bg = esCor ? "#D5F5E3" : esSel ? "#FADBD8" : "#F4F6F7";
            return (
              <button key={letra} onClick={() => responder(letra)}
                disabled={!!seleccion}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 12px", marginBottom: 8, background: bg, border: `1px solid ${seleccion && esCor ? COLORS.correct : COLORS.border}`, borderRadius: 8, fontSize: 13, color: COLORS.text, cursor: seleccion ? "default" : "pointer", lineHeight: 1.4 }}>
                {op}
                {seleccion && esCor && " ✅"}
                {seleccion && esSel && !esCor && " ❌"}
              </button>
            );
          })}

          {mostrarExplicacion && (
            <div style={{ background: seleccion === r.pregunta2.correcta ? "#D5F5E3" : "#FADBD8", borderRadius: 8, padding: "10px 12px", marginTop: 10, fontSize: 12.5, color: COLORS.text, lineHeight: 1.6 }}>
              {seleccion === r.pregunta2.correcta
                ? <><strong style={{ color: COLORS.correct }}>✅ ¡Correcto! Letra "{r.letra}" obtenida.</strong><br /></>
                : <><strong style={{ color: COLORS.wrong }}>❌ Respuesta incorrecta. Letra no obtenida.</strong><br /></>
              }
              <strong>Explicación:</strong> {r.pregunta2.explicacion}
            </div>
          )}

          {mostrarExplicacion && (
            <button onClick={siguiente} style={{ width: "100%", marginTop: 14, padding: "13px", background: COLORS.accent, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              {reto + 1 < RETOS.length ? `➡ SIGUIENTE RETO (${reto + 2}/10)` : "🏆 FINALIZAR MISIÓN"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
