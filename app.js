// ═══════════════════════════════════════════════════════
// SUPABASE — Cliente
// ═══════════════════════════════════════════════════════
const { createClient } = supabase;
const sb = createClient(
    'https://jgaehoxzxexecjlmferb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnYWVob3h6eGV4ZWNqbG1mZXJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4OTAzMDEsImV4cCI6MjA5NzQ2NjMwMX0.J2e_UPYu72GWBTEe6L8CdfRuPs78k6r9RaLuKDfhVYY'
);

// ═══════════════════════════════════════════════════════
// BASE DE DATOS DE AYUDAS (v3 — 32 entradas, 7 CCAA)
// ═══════════════════════════════════════════════════════
const ayudasDB = [

    // ── NACIONAL ──────────────────────────────────────
    {
        id: 1, nombre: "Kit Digital — Segmento III (Autónomos sin empleados)", tipo: "Bono Digital",
        categoria: "Digitalización", comunidad: "Nacional",
        requisitos: { sector: "Cualquiera", antiguedad: "Cualquiera" },
        descripcion: "Bono NextGen para digitalizar tu negocio: web, e-commerce, ciberseguridad, ofimática en la nube y CRM. Válido para cualquier sector. Requiere registro previo en Acelera Pyme.",
        documentos: ["Registro en acelerapyme.gob.es + test de diagnóstico digital", "Certificado AEAT al corriente", "Certificado SS al corriente"],
        monto: "Hasta 2.000 €", fechaLimite: "Abierta (hasta agotar fondos — BOE TDF/39/2026)", dificultad: "Baja",
        url: "https://sede.red.gob.es/es/procedimientos/convocatoria-de-ayudas-destinadas-la-digitalizacion-de-empresas-del-segmento-iii"
    },
    {
        id: 2, nombre: "Tarifa Plana RETA — 80 €/mes (12 meses)", tipo: "Bonificación de cuota",
        categoria: "Seguridad Social", comunidad: "Nacional",
        requisitos: { sector: "Cualquiera", antiguedad: "0" },
        descripcion: "Cuota RETA reducida a 80 €/mes durante los primeros 12 meses. Se solicita en el momento del alta en Import@ss. Compatible con cualquier sector de actividad.",
        documentos: ["Alta en el RETA en Import@ss", "No haber cotizado en RETA en los últimos 2 años", "Al corriente con AEAT y SS"],
        monto: "Ahorro de ~2.500 € el primer año", fechaLimite: "Permanente (solicitarla en el alta)", dificultad: "Muy Baja",
        url: "https://importass.seg-social.es/enportal/publico/landing"
    },
    {
        id: 3, nombre: "Capitalización del Desempleo — Pago Único", tipo: "Subvención directa",
        categoria: "Inicio de actividad", comunidad: "Nacional",
        requisitos: { sector: "Cualquiera", antiguedad: "0" },
        descripcion: "Cobra de una sola vez toda la prestación por desempleo pendiente para invertirla en tu actividad. Compatible con la tarifa plana. Solicítala antes de darte de alta en el RETA.",
        documentos: ["Solicitud en SEPE (modelo oficial)", "Plan de inversión del capital recibido", "Alta en RETA en los 30 días siguientes al cobro"],
        monto: "100 % de la prestación por desempleo pendiente", fechaLimite: "Permanente (antes de agotar el paro)", dificultad: "Baja",
        url: "https://www.sepe.es/HomeSepe/en/autonomos/incentivos-ayudas-emprendedores-autonomos.html"
    },
    {
        id: 4, nombre: "FUNDAE — Formación Continua para Autónomos", tipo: "Bonificación formación",
        categoria: "Formación", comunidad: "Nacional",
        requisitos: { sector: "Cualquiera", antiguedad: "Cualquiera" },
        descripcion: "Bonificación en la cuota de SS para financiar cursos de formación relacionados con tu actividad. Los autónomos sin asalariados disponen de un crédito anual de 500 €.",
        documentos: ["Alta en RETA", "Inscripción en la entidad organizadora del curso", "Comunicación previa a FUNDAE (según entidad)"],
        monto: "Hasta 500 €/año en bonificaciones", fechaLimite: "Permanente (año natural)", dificultad: "Muy Baja",
        url: "https://www.fundae.es/autonomos"
    },
    {
        id: 5, nombre: "Reducción IRPF 7 % — Nuevos Autónomos (3 primeros años)", tipo: "Beneficio fiscal",
        categoria: "Fiscal", comunidad: "Nacional",
        requisitos: { sector: "Cualquiera", antiguedad: "0" },
        descripcion: "Retención del 7 % en lugar del 15 % habitual en las facturas a empresas. Aplica el año de inicio y los dos siguientes. Mejora notablemente la liquidez en los primeros años.",
        documentos: ["Indicar en tus facturas la retención reducida del 7 %", "No haber ejercido actividad profesional el año anterior"],
        monto: "Ahorro del 8 % por cada factura emitida", fechaLimite: "Permanente (3 primeros años de actividad)", dificultad: "Muy Baja",
        url: "https://www.agenciatributaria.es"
    },
    {
        id: 6, nombre: "Plan MOVES III — Vehículos Eléctricos y Puntos de Recarga", tipo: "Subvención directa",
        categoria: "Movilidad Sostenible", comunidad: "Nacional",
        requisitos: { sector: "Transporte", antiguedad: "Cualquiera" },
        descripcion: "Subvenciones para adquisición de vehículos eléctricos y puntos de recarga. Ideal para autónomos del transporte, reparto y logística que quieran renovar su flota.",
        documentos: ["Factura del vehículo eléctrico nuevo", "Ficha técnica ITV homologada", "Baja y achatarramiento del vehículo antiguo (si aplica)"],
        monto: "Hasta 9.000 €", fechaLimite: "31/12/2026 (por CCAA)", dificultad: "Media",
        url: "https://www.idae.es/ayudas-y-financiacion/para-movilidad-y-vehiculos/moves-iii-2025"
    },
    {
        id: 7, nombre: "Bono Eficiencia Energética — Hostelería y Turismo", tipo: "Subvención directa",
        categoria: "Eficiencia Energética", comunidad: "Nacional",
        requisitos: { sector: "Hostelería", antiguedad: "12" },
        descripcion: "Fondos europeos para climatización eficiente, iluminación LED y auditorías energéticas en locales de hostelería y alojamientos turísticos.",
        documentos: ["Auditoría energética previa firmada por técnico competente", "Presupuesto de instalación visado", "Licencia de apertura en vigor"],
        monto: "Hasta 10.000 €", fechaLimite: "31/10/2026", dificultad: "Alta",
        url: "https://www.mincotur.gob.es/PortalAyudas/Eficiencia-Energetica-Turismo/Paginas/Index.aspx"
    },
    {
        id: 8, nombre: "Creación Artística Contemporánea — Ministerio de Cultura 2026", tipo: "Subvención directa",
        categoria: "Cultura y Arte", comunidad: "Nacional",
        requisitos: { sector: "Arte", antiguedad: "Cualquiera" },
        descripcion: "Ayudas dotadas con 1 millón de euros para proyectos de creación, producción e investigación artística. Hasta 30.000 € por proyecto para artistas con residencia fiscal en España.",
        documentos: ["Memoria del proyecto artístico", "CV artístico actualizado", "Presupuesto detallado del proyecto", "Residencia fiscal en España"],
        monto: "Hasta 30.000 €", fechaLimite: "Convocatoria anual — cultura.gob.es", dificultad: "Alta",
        url: "https://www.cultura.gob.es/servicios-a-la-ciudadania/catalogo/becas-ayudas-y-subvenciones/ayudas-y-subvenciones/promoarte.html"
    },
    {
        id: 9, nombre: "Ayudas Fotografía — Ministerio de Cultura 2026", tipo: "Subvención directa",
        categoria: "Fotografía", comunidad: "Nacional",
        requisitos: { sector: "Arte", antiguedad: "Cualquiera" },
        descripcion: "Convocatoria para creación, conservación y difusión del patrimonio fotográfico español. Actividades entre junio 2026 y mayo 2027.",
        documentos: ["Memoria del proyecto fotográfico", "Portfolio actualizado", "Presupuesto desglosado"],
        monto: "Hasta 15.000 € por proyecto", fechaLimite: "Próxima convocatoria: primavera 2027", dificultad: "Alta",
        url: "https://www.cultura.gob.es/cultura/creacion-contemporanea/becas-ayudas-y-subvenciones/promocion-fotografia.html"
    },
    {
        id: 10, nombre: "Industrias Culturales y Creativas — Ministerio de Cultura", tipo: "Subvención directa",
        categoria: "Cultura e Industrias Creativas", comunidad: "Nacional",
        requisitos: { sector: "Arte", antiguedad: "12" },
        descripcion: "Subvenciones para proyectos empresariales de innovación en el sector cultural: diseño, audiovisual, música, artes escénicas y editorial. Dirigida a autónomos con actividad consolidada.",
        documentos: ["Proyecto de innovación cultural detallado", "Plan de negocio", "Alta IAE en actividad cultural", "Certificados AEAT y SS"],
        monto: "Hasta 50.000 €", fechaLimite: "Convocatoria 2026 activa — cultura.gob.es", dificultad: "Alta",
        url: "https://www.cultura.gob.es/servicios-a-la-ciudadania/catalogo/general/99/995758/ficha/995758-2026.html"
    },
    {
        id: 11, nombre: "PAC 2026/2027 — Pagos Directos Agricultura y Ganadería", tipo: "Subvención directa",
        categoria: "Agricultura y Ganadería", comunidad: "Nacional",
        requisitos: { sector: "Agricultura", antiguedad: "Cualquiera" },
        descripcion: "Ayudas directas de la Política Agrícola Común (PAC). Incluye pago básico por hectárea y eco-regímenes para prácticas sostenibles. Solicitud anual obligatoria.",
        documentos: ["DUN (Declaración Única de Notificación) en sede FEGA", "Certificado de agricultor activo", "Referencia catastral de parcelas"],
        monto: "Variable según hectáreas y tipo de explotación", fechaLimite: "Plazo 2027: 1 feb – 30 abr 2027", dificultad: "Media",
        url: "https://www.mapa.gob.es/es/pac/pagos-directos/"
    },
    {
        id: 12, nombre: "Incorporación Jóvenes a la Agricultura — FEADER/MAPA", tipo: "Subvención directa",
        categoria: "Agricultura y Ganadería", comunidad: "Nacional",
        requisitos: { sector: "Agricultura", antiguedad: "0" },
        descripcion: "Ayuda para la primera instalación de jóvenes agricultores (menores de 41 años) que inicien actividad agraria. Financiada con fondos FEADER. Gestionada por cada CCAA.",
        documentos: ["Plan empresarial agrícola", "Alta en RETA modalidad agraria", "Titulación agraria mínima (FP o similar)", "Empadronamiento"],
        monto: "Hasta 70.000 €", fechaLimite: "Por convocatoria CCAA (consultar cada región)", dificultad: "Alta",
        url: "https://www.mapa.gob.es/es/desarrollo-rural/temas/programa-de-desarrollo-rural-senergia/pdrs-2014-2022/medidas/M6_es.aspx"
    },

    // ── EUROPEA ───────────────────────────────────────
    {
        id: 13, nombre: "EIC Accelerator — Horizonte Europa (UE)", tipo: "Subvención + Inversión",
        categoria: "Innovación / I+D+i", comunidad: "Europea",
        requisitos: { sector: "Tecnológico", antiguedad: "12" },
        descripcion: "Financiación directa de la UE para pymes con proyectos de innovación disruptiva. Hasta 2,5 M€ en subvención + equity opcional del EIC Fund (hasta 15 M€).",
        documentos: ["Pitch en vídeo (3 min) + deck de 10 diapositivas", "Business Plan europeo completo (formato EIC)", "Presupuesto detallado del proyecto I+D+i"],
        monto: "Hasta 2.500.000 € + equity opcional", fechaLimite: "Abierta — 3 cortes anuales", dificultad: "Muy Alta",
        url: "https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en"
    },
    {
        id: 14, nombre: "Erasmus para Emprendedores — UE", tipo: "Bono movilidad",
        categoria: "Emprendimiento / Internacionalización", comunidad: "Europea",
        requisitos: { sector: "Cualquiera", antiguedad: "0" },
        descripcion: "Como nuevo emprendedor, trabajas 1-6 meses junto a un empresario consolidado de otro país de la UE. La UE financia una asignación mensual para gastos de estancia.",
        documentos: ["Registro en la red oficial Erasmus para Emprendedores", "Plan de actividades del intercambio", "Acuerdo con el empresario de acogida"],
        monto: "Entre 530 € y 1.100 €/mes según país", fechaLimite: "Solicitudes abiertas todo el año", dificultad: "Media",
        url: "https://www.erasmus-entrepreneurs.eu/index.php?lan=es"
    },

    // ── MURCIA ────────────────────────────────────────
    {
        id: 15, nombre: "Cuota Cero Ampliada — SEF Región de Murcia 2026", tipo: "Subvención directa",
        categoria: "Inicio de actividad", comunidad: "Murcia",
        requisitos: { sector: "Cualquiera", antiguedad: "0" },
        descripcion: "Reembolso del 100 % de las cuotas RETA durante hasta 24 meses para nuevos autónomos murcianos. Convocatoria 2026 activa con ~6 millones de euros presupuestados.",
        documentos: ["Alta IAE y en el RETA", "Informe de inscripción como demandante de empleo en el SEF", "Certificado de empadronamiento en Murcia", "Declaración responsable (no autónomo en los últimos 2 años)"],
        monto: "Hasta 2.920 € (24 meses de cuotas)", fechaLimite: "15/10/2026", dificultad: "Media",
        url: "https://sede.carm.es/web/pagina?IDCONTENIDO=4091&IDTIPO=240&RASTRO=c672%24m"
    },
    {
        id: 16, nombre: "Cheque de Innovación — INFO Murcia 2026", tipo: "Bono para servicios externos",
        categoria: "Innovación / Competitividad", comunidad: "Murcia",
        requisitos: { sector: "Tecnológico", antiguedad: "Cualquiera" },
        descripcion: "Subvención del 70 % (hasta 85 % en sectores RIS4 Murcia) para contratar servicios externos de innovación: IA, transformación digital, sostenibilidad.",
        documentos: ["Memoria técnica del servicio a contratar", "Presupuesto del proveedor acreditado por el INFO", "Certificados AEAT y SS"],
        monto: "Hasta 15.000 €", fechaLimite: "Hasta agotar fondos (abierta 2026)", dificultad: "Alta",
        url: "https://www.institutofomentomurcia.es/cheques-de-innovacion"
    },
    {
        id: 17, nombre: "Apoyo Autónomos Sanitarios y Sociales — CARM Murcia", tipo: "Subvención directa",
        categoria: "Emprendimiento sanitario", comunidad: "Murcia",
        requisitos: { sector: "Salud", antiguedad: "0" },
        descripcion: "Subvención de la Región de Murcia para autónomos de servicios sanitarios y de bienestar que inicien actividad: fisioterapeutas, psicólogos, logopedas, nutricionistas y terapeutas.",
        documentos: ["Alta en RETA y en el Colegio Profesional correspondiente", "Plan de negocio de la consulta/clínica", "Certificado de empadronamiento en Murcia"],
        monto: "Hasta 5.000 €", fechaLimite: "Convocatoria semestral — sede.carm.es", dificultad: "Media",
        url: "https://sede.carm.es"
    },

    // ── MADRID ────────────────────────────────────────
    {
        id: 18, nombre: "Tarifa Cero — Comunidad de Madrid", tipo: "Bonificación de cuota",
        categoria: "Inicio de actividad", comunidad: "Madrid",
        requisitos: { sector: "Cualquiera", antiguedad: "0" },
        descripcion: "Reembolso del 100 % de la cuota RETA durante los primeros meses para nuevos autónomos madrileños. Compatible con la Tarifa Plana estatal.",
        documentos: ["Alta en el RETA", "Certificado de empadronamiento en Madrid", "Declaración responsable (no autónomo en los 2 últimos años)"],
        monto: "Hasta 960 € en cuotas reembolsadas", fechaLimite: "Abierta", dificultad: "Baja",
        url: "https://sede.comunidad.madrid/ayudas-becas-subvenciones/ayudas-tarifa-cero"
    },
    {
        id: 19, nombre: "Ayudas Autónomos y Emprendedores — Ayuntamiento de Madrid 2026", tipo: "Subvención directa",
        categoria: "Consolidación", comunidad: "Madrid",
        requisitos: { sector: "Cualquiera", antiguedad: "12" },
        descripcion: "Convocatoria de 2 millones de euros del Ayuntamiento de Madrid para viabilidad de negocios autónomos consolidados y creación de empleo.",
        documentos: ["Plan de viabilidad del negocio (modelo BOCM)", "Alta IAE en Madrid", "Memoria de la actividad y empleo generado"],
        monto: "Hasta 10.000 €", fechaLimite: "20 días desde publicación BOCM (junio 2026)", dificultad: "Media",
        url: "https://www.comunidad.madrid/empleo/ayudas-personas-trabajadoras-autonomas-emprendedoras-entidades-economia-social"
    },
    {
        id: 20, nombre: "Modernización del Comercio — Comunidad de Madrid", tipo: "Subvención directa",
        categoria: "Equipamiento / Reforma", comunidad: "Madrid",
        requisitos: { sector: "Comercio", antiguedad: "12" },
        descripcion: "Financiación cofinanciada con FEDER para obras de mejora, mobiliario y equipos en locales comerciales minoristas madrileños.",
        documentos: ["Proyecto técnico de obra firmado", "Facturas proforma de proveedores", "Alta IAE en comercio al por menor", "Contrato de arrendamiento o escritura del local"],
        monto: "Hasta 30.000 €", fechaLimite: "31/10/2026", dificultad: "Media",
        url: "https://tramita.comunidad.madrid/ayudas-becas-subvenciones/ayudas-modernizacion-comercios"
    },

    // ── ANDALUCÍA ─────────────────────────────────────
    {
        id: 21, nombre: "Cuota Cero — Junta de Andalucía (Línea 1)", tipo: "Bonificación de cuota",
        categoria: "Inicio de actividad", comunidad: "Andalucia",
        requisitos: { sector: "Cualquiera", antiguedad: "0" },
        descripcion: "Subvención del 100 % de la cuota RETA durante los primeros meses para mujeres, jóvenes menores de 35 años y colectivos vulnerables en Andalucía.",
        documentos: ["Alta en RETA e IAE", "Certificado de empadronamiento en Andalucía", "Documentación del colectivo (DNI, etc.)"],
        monto: "Hasta 1.440 €", fechaLimite: "Abierta", dificultad: "Baja",
        url: "https://www.juntadeandalucia.es/organismos/empleoempresaytrabajoautonomo/areas/trabajo-autonomo/fomento-trabajo-autonomo/paginas/subv-fomento-cuota-cero.html"
    },
    {
        id: 22, nombre: "Inicio de Actividad Autónoma — Junta de Andalucía (Línea 2)", tipo: "Subvención directa",
        categoria: "Inicio de actividad", comunidad: "Andalucia",
        requisitos: { sector: "Cualquiera", antiguedad: "0" },
        descripcion: "Ayuda directa para el inicio de actividad con cuantías diferenciadas por colectivo. Convocatoria 2025-2026 del Servicio Andaluz de Empleo.",
        documentos: ["Plan de viabilidad del negocio", "Alta en el RETA", "Certificado de empadronamiento en Andalucía"],
        monto: "Hasta 5.000 €", fechaLimite: "30/06/2026", dificultad: "Alta",
        url: "https://www.juntadeandalucia.es/organismos/empleoempresaytrabajoautonomo/areas/trabajo-autonomo/fomento-trabajo-autonomo/paginas/subv-fomento-inicio-actividad.html"
    },
    {
        id: 23, nombre: "Subvenciones Profesionales Sanitarios — Junta de Andalucía", tipo: "Subvención directa",
        categoria: "Salud y Bienestar", comunidad: "Andalucia",
        requisitos: { sector: "Salud", antiguedad: "0" },
        descripcion: "Ayudas de la Consejería de Empleo andaluza para fisioterapeutas, psicólogos, nutricionistas y otros profesionales sanitarios que inicien actividad como autónomos.",
        documentos: ["Título universitario o FP sanitario oficial", "Colegiación en Colegio Profesional de Andalucía", "Alta en RETA", "Plan de negocio de la consulta"],
        monto: "Hasta 6.000 €", fechaLimite: "Revisión semestral — Junta de Andalucía", dificultad: "Media",
        url: "https://www.juntadeandalucia.es/organismos/empleoempresaytrabajoautonomo.html"
    },

    // ── CATALUÑA ──────────────────────────────────────
    {
        id: 24, nombre: "Cupones ACCIÓ a la Innovación 2026 — Cataluña", tipo: "Bono para servicios externos",
        categoria: "Innovación / Digitalización / IA", comunidad: "Cataluña",
        requisitos: { sector: "Tecnológico", antiguedad: "Cualquiera" },
        descripcion: "Cupones directos de la Generalitat para contratar servicios de innovación: IA, sostenibilidad, propiedad industrial y acceso a proyectos europeos R+D+I. Cuatro líneas en 2026.",
        documentos: ["Registro en accio.gencat.cat", "Memoria de la necesidad a cubrir", "Presupuesto del proveedor homologado por ACCIÓ"],
        monto: "Hasta 20.000 €", fechaLimite: "Hasta agotar fondos (abierta mayo 2026)", dificultad: "Media",
        url: "https://www.accio.gencat.cat/ca/serveis/innovacio/cupons-a-la-innovacio/"
    },
    {
        id: 25, nombre: "Bonificación Alta Autónomo/a — Canal Empresa Catalunya", tipo: "Bonificación de cuota",
        categoria: "Inicio de actividad", comunidad: "Cataluña",
        requisitos: { sector: "Cualquiera", antiguedad: "0" },
        descripcion: "Complemento autonómico catalán a la tarifa plana estatal: bonificación adicional de cuotas durante el primer año para residentes en Cataluña.",
        documentos: ["Alta en el RETA", "Domicilio fiscal en Cataluña", "No haber sido autónomo en los últimos 2 años"],
        monto: "Hasta 1.200 €", fechaLimite: "Permanente", dificultad: "Baja",
        url: "https://canalempresa.gencat.cat/es/01_que_voleu_fer/mesuresempresesiautonoms/informacio-temes-sectors-cicle-vida/autonoms/index.html"
    },
    {
        id: 26, nombre: "Ajuts Formació Professional — Generalitat de Catalunya", tipo: "Bono formación",
        categoria: "Formación y Especialización", comunidad: "Cataluña",
        requisitos: { sector: "Educación", antiguedad: "Cualquiera" },
        descripcion: "Ayudas de la Generalitat para autónomos del sector educativo y formativo que quieran actualizar competencias, obtener certificaciones o ampliar su oferta formativa.",
        documentos: ["Alta en RETA en actividad educativa", "Memoria del plan formativo", "Presupuesto del centro formativo acreditado"],
        monto: "Hasta 3.000 €", fechaLimite: "Convocatoria anual (generalmente primavera)", dificultad: "Baja",
        url: "https://canalempresa.gencat.cat"
    },

    // ── COMUNITAT VALENCIANA ──────────────────────────
    {
        id: 27, nombre: "IVACE — Bono Digitalización Pymes y Autónomos 2026", tipo: "Bono Digital",
        categoria: "Digitalización", comunidad: "Valencia",
        requisitos: { sector: "Cualquiera", antiguedad: "Cualquiera" },
        descripcion: "El Institut Valencià de Competitivitat Empresarial subvenciona hasta el 60 % de los costes de digitalización: software de gestión, ciberseguridad y presencia online.",
        documentos: ["Solicitud en sede electrónica de IVACE", "Memoria de necesidades de digitalización", "Presupuesto del proveedor tecnológico", "Alta en RETA con domicilio en Valencia"],
        monto: "Hasta 5.000 €", fechaLimite: "Convocatoria 2026 activa — ivace.es", dificultad: "Media",
        url: "https://www.ivace.es/index.php/es/ayudas-a-la-empresa/digitalizacion"
    },
    {
        id: 28, nombre: "GVA Labora — Fomento Empleo Autónomo Valencia", tipo: "Subvención directa",
        categoria: "Inicio de actividad", comunidad: "Valencia",
        requisitos: { sector: "Cualquiera", antiguedad: "0" },
        descripcion: "La Generalitat Valenciana subvenciona el inicio de actividad autónoma con cuantías diferenciales para mujeres, jóvenes, personas con discapacidad y desempleados de larga duración.",
        documentos: ["Alta en RETA", "Empadronamiento en la Comunitat Valenciana", "Informe de vida laboral del SEPE", "Declaración responsable de inicio de actividad"],
        monto: "Hasta 8.000 €", fechaLimite: "Convocatoria semestral — labora.gva.es", dificultad: "Media",
        url: "https://www.labora.gva.es/es/personas/emprenedors-autonoms"
    },

    // ── PAÍS VASCO ────────────────────────────────────
    {
        id: 29, nombre: "Bono Emprendimiento Digital — Lanbide Euskadi", tipo: "Bono Digital",
        categoria: "Digitalización", comunidad: "PaisVasco",
        requisitos: { sector: "Tecnológico", antiguedad: "0" },
        descripcion: "Lanbide (Servicio Vasco de Empleo) subvenciona hasta el 80 % de las herramientas, formación tecnológica y asesoramiento de negocio para nuevos autónomos digitales en Euskadi.",
        documentos: ["Alta en RETA", "Empadronamiento en el País Vasco", "Plan de negocio digital", "Formación o experiencia acreditada en tecnología"],
        monto: "Hasta 6.000 €", fechaLimite: "Convocatoria trimestral — lanbide.euskadi.eus", dificultad: "Media",
        url: "https://www.lanbide.euskadi.eus/emprendimiento"
    },
    {
        id: 30, nombre: "Programa Kudeatu — Apoyo Integral al Autónomo Vasco", tipo: "Subvención directa",
        categoria: "Inicio / Consolidación", comunidad: "PaisVasco",
        requisitos: { sector: "Cualquiera", antiguedad: "Cualquiera" },
        descripcion: "Programa integral de apoyo al autónomo vasco: subvenciones de inicio (hasta 5.000 €), bonificaciones en formación y asesoramiento de gestión empresarial.",
        documentos: ["Alta en RETA", "Empadronamiento en Euskadi", "Plan de empresa", "Solicitud en sede SPRI o Lanbide"],
        monto: "Hasta 5.000 € + bonificaciones", fechaLimite: "Abierta (revisión semestral)", dificultad: "Baja",
        url: "https://www.spri.eus/es/kudeatu"
    },

    // ── GALICIA ───────────────────────────────────────
    {
        id: 31, nombre: "Programa PEMES — Xunta de Galicia", tipo: "Subvención directa",
        categoria: "Emprendimiento y Consolidación", comunidad: "Galicia",
        requisitos: { sector: "Cualquiera", antiguedad: "Cualquiera" },
        descripcion: "La Xunta apoya a autónomos y micropymes con subvenciones para inversión en activos productivos, digitalización y creación de empleo en Galicia.",
        documentos: ["Alta en RETA con domicilio fiscal en Galicia", "Plan de inversión o negocio", "Certificados AEAT y SS", "Solicitud en sede Xunta"],
        monto: "Hasta 12.000 €", fechaLimite: "Convocatoria 2026 activa — xunta.gal", dificultad: "Media",
        url: "https://www.xunta.gal/emprego"
    },
    {
        id: 32, nombre: "IG290 — Incentivos Empleo Autónomo · Xunta de Galicia", tipo: "Subvención directa",
        categoria: "Inicio de actividad", comunidad: "Galicia",
        requisitos: { sector: "Cualquiera", antiguedad: "0" },
        descripcion: "Ayudas de la Consellería de Emprego gallega para nuevos autónomos: bonificación de cuota RETA, subvención por formación y ayuda de conciliación.",
        documentos: ["Alta en RETA", "Empadronamiento en Galicia", "Informe SEPE como demandante de empleo", "Solicitud IG290 en sede xunta.gal"],
        monto: "Hasta 3.000 € + bonificación cuota RETA", fechaLimite: "Plazo abierto — IG290 en xunta.gal", dificultad: "Baja",
        url: "https://www.xunta.gal/dog/Publicados/2024/20240110/AnuncioG0656-191223-0001_gl.html"
    },
];

// ═══════════════════════════════════════════════════════
// ESTADO GLOBAL (caché en memoria)
// ═══════════════════════════════════════════════════════
let state = {
    isPremium: false,
    perfil: { comunidad: "Murcia", sector: "Tecnológico", antiguedad: "0" },
    transacciones: []
};

let currentUser = null;
let guestMode = false; // Modo exploración sin registro
const IRPF_FACTOR = 0.19;

// Variables accesibles para modal de liquidación trimestral
let _ivaCobrado = 0, _ivaPagado = 0, _netoLiq = 0, _irpfLiq = 0;

// ═══════════════════════════════════════════════════════
// AUTH — Escuchar cambios de sesión
// ═══════════════════════════════════════════════════════
sb.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
        guestMode = false;
        currentUser = session.user;
        document.getElementById('auth-modal').classList.add('hidden');
        document.getElementById('user-email').textContent = session.user.email;
        document.getElementById('user-info').classList.remove('hidden');
        document.getElementById('guest-info').classList.add('hidden');
        await cargarDatosUsuario();
        actualizarUI();
        verificarPagoExitoso(); // detectar retorno desde Stripe
    } else {
        currentUser = null;
        state.transacciones = [];
        state.isPremium = false;
        state.perfil = { comunidad: "Murcia", sector: "Tecnológico", antiguedad: "0" };
        // No bloquear con modal — permitir exploración libre
        document.getElementById('user-info').classList.add('hidden');
        document.getElementById('guest-info').classList.remove('hidden');
        guestMode = true;
        actualizarUI();
    }
});

// Activar modo exploración (llamado desde el botón del modal)
function enableGuestMode() {
    document.getElementById('auth-modal').classList.add('hidden');
    guestMode = true;
    actualizarUI();
    matchAyudas();
}

// ═══════════════════════════════════════════════════════
// CARGA DE DATOS DESDE SUPABASE
// ═══════════════════════════════════════════════════════
async function cargarDatosUsuario() {
    // Perfil
    const { data: profile } = await sb
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

    if (profile) {
        state.isPremium = profile.is_premium;
        state.perfil.comunidad = profile.comunidad || 'Murcia';
        state.perfil.sector = profile.sector || 'Tecnológico';
        state.perfil.antiguedad = profile.antiguedad || '0';
    }

    // Transacciones
    const { data: transactions } = await sb
        .from('transactions')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('fecha', { ascending: false });

    if (transactions) {
        state.transacciones = transactions.map(t => ({
            id: t.id,
            fecha: t.fecha,
            concepto: t.concepto,
            tipo: t.tipo,
            base: parseFloat(t.base),
            ivaPct: parseFloat(t.iva_pct),
            estado: t.estado
        }));
    }

    // Sincronizar selectores
    document.getElementById('profile-comunidad').value = state.perfil.comunidad;
    document.getElementById('profile-sector').value = state.perfil.sector;
    document.getElementById('profile-antiguedad').value = state.perfil.antiguedad;
}

// ═══════════════════════════════════════════════════════
// INICIALIZACIÓN DOM
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    // Trimestre actual en el header
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const trimNum = month < 3 ? 1 : month < 6 ? 2 : month < 9 ? 3 : 4;
    const el = document.getElementById('cuarto-actual');
    if (el) el.textContent = `${trimNum}T ${year}`;

    // Inicial del usuario en sidebar
    const initEl = document.getElementById('user-initial');
    if (initEl && currentUser?.email) initEl.textContent = currentUser.email[0].toUpperCase();

    // Fechas por defecto en formularios
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('ingreso-fecha').value = today;
    document.getElementById('gasto-fecha').value = today;

    // Auth form
    document.getElementById('auth-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;
        const errorDiv = document.getElementById('auth-error');
        const submitBtn = document.getElementById('auth-submit');

        submitBtn.textContent = 'Cargando...';
        submitBtn.disabled = true;
        errorDiv.classList.add('hidden');

        const result = isSignUp
            ? await sb.auth.signUp({ email, password })
            : await sb.auth.signInWithPassword({ email, password });

        if (result.error) {
            errorDiv.textContent = traducirError(result.error.message);
            errorDiv.classList.remove('hidden');
            submitBtn.textContent = isSignUp ? 'Crear cuenta' : 'Iniciar sesión';
            submitBtn.disabled = false;
        }
    });
});

// ═══════════════════════════════════════════════════════
// AUTH — Funciones de interfaz
// ═══════════════════════════════════════════════════════
let isSignUp = false;

function toggleAuthMode() {
    isSignUp = !isSignUp;
    document.getElementById('auth-title').textContent = isSignUp ? 'Crear cuenta' : 'Iniciar sesión';
    document.getElementById('auth-subtitle').textContent = isSignUp
        ? 'Empieza a controlar tus finanzas como autónomo'
        : 'Accede a tu panel de AutonoMetrics';
    document.getElementById('auth-submit').textContent = isSignUp ? 'Crear cuenta' : 'Iniciar sesión';
    document.getElementById('auth-toggle-text').textContent = isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?';
    document.getElementById('auth-toggle-btn').textContent = isSignUp ? 'Iniciar sesión' : 'Crear cuenta';
    document.getElementById('auth-error').classList.add('hidden');
}

function traducirError(msg) {
    if (msg.includes('Invalid login credentials')) return 'Email o contraseña incorrectos.';
    if (msg.includes('already registered') || msg.includes('already been registered')) return 'Este email ya tiene cuenta. Inicia sesión.';
    if (msg.includes('Password should be')) return 'La contraseña debe tener al menos 6 caracteres.';
    if (msg.includes('Unable to validate')) return 'Email no válido.';
    return 'Error inesperado. Inténtalo de nuevo.';
}

function signOut() {
    // Limpiar sesión localmente sin esperar a Supabase
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('sb-')) localStorage.removeItem(key);
    });
    // Intentar avisar a Supabase (sin bloquear)
    try { sb.auth.signOut(); } catch (e) {}
    // Recargar tras breve pausa
    setTimeout(() => window.location.reload(), 200);
}

// ═══════════════════════════════════════════════════════
// NAVEGACIÓN
// ═══════════════════════════════════════════════════════
function switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    document.getElementById(`view-${viewId}`).classList.add('active');

    ['dashboard', 'calculadora', 'ayudas'].forEach(btn => {
        const el = document.getElementById(`nav-${btn}`);
        el.className = btn === viewId
            ? 'nav-active w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors'
            : 'nav-inactive w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors';
    });
}

async function togglePremiumPlan() {
    if (guestMode || !currentUser) {
        // Primero hay que tener cuenta
        document.getElementById('auth-modal').classList.remove('hidden');
        return;
    }
    if (state.isPremium) return; // Ya es PRO, no hacer nada

    // Redirigir a Stripe con el ID del usuario como referencia
    const PAYMENT_LINK = 'https://buy.stripe.com/8x23cwaNk9rB5alaMVgw000';
    window.location.href = `${PAYMENT_LINK}?client_reference_id=${currentUser.id}`;
}

async function limpiarTransacciones() {
    if (confirm('⚠️ ¿Estás seguro de que quieres eliminar todos tus movimientos? Esta acción no se puede deshacer.')) {
        if (!guestMode && currentUser) {
            await sb.from('transactions').delete().eq('user_id', currentUser.id);
        }
        state.transacciones = [];
        actualizarUI();
    }
}

// ═══════════════════════════════════════════════════════
// DASHBOARD — Cálculos y render
// ═══════════════════════════════════════════════════════
function actualizarUI() {
    const badge = document.getElementById('plan-badge');
    if (guestMode) {
        badge.innerText = 'EXPLORACIÓN';
        badge.className = 'text-[10px] bg-blue-50 text-blue-500 border border-blue-200 px-2.5 py-1 rounded-full font-bold inline-block uppercase tracking-wider';
    } else if (state.isPremium) {
        badge.innerText = '✦ PRO ACTIVADO';
        badge.className = 'text-[10px] bg-brand-success text-white px-2.5 py-1 rounded-full font-bold inline-block uppercase tracking-wider';
    } else {
        badge.innerText = 'GRATIS';
        badge.className = 'text-[10px] bg-brand-bg text-brand-muted border border-brand-border px-2.5 py-1 rounded-full font-bold inline-block uppercase tracking-wider';
    }

    // Banner de modo exploración
    const guestBanner = document.getElementById('guest-banner');
    if (guestBanner) guestBanner.classList.toggle('hidden', !guestMode);

    // Ocultar botón PRO si ya es premium
    const btnPlan = document.getElementById('btn-toggle-plan');
    if (btnPlan) btnPlan.style.display = state.isPremium ? 'none' : 'block';

    // Inicial del avatar
    const initEl = document.getElementById('user-initial');
    if (initEl && currentUser?.email) initEl.textContent = currentUser.email[0].toUpperCase();

    let ingresosTotal = 0, gastosTotal = 0, ivaCobrado = 0, ivaPagado = 0;
    let facturasPendientes = 0, dineroPendiente = 0;

    state.transacciones.forEach(t => {
        const iva = t.base * t.ivaPct;
        if (t.tipo === 'ingreso') {
            ingresosTotal += t.base;
            ivaCobrado += iva;
            if (t.estado === 'pendiente') { facturasPendientes++; dineroPendiente += (t.base + iva); }
        } else {
            gastosTotal += t.base;
            ivaPagado += iva;
        }
    });

    const ivaLiquidacion = Math.max(0, ivaCobrado - ivaPagado);
    const neto = Math.max(0, ingresosTotal - gastosTotal);
    const irpf = neto * IRPF_FACTOR;
    const hucha = ivaLiquidacion + irpf;

    // Guardar para modal de liquidación
    _ivaCobrado = ivaCobrado;
    _ivaPagado = ivaPagado;
    _netoLiq = neto;
    _irpfLiq = irpf;

    document.getElementById('txt-total-ingresos').innerText = `${ingresosTotal.toFixed(2)} €`;
    document.getElementById('txt-total-gastos').innerText = `${gastosTotal.toFixed(2)} €`;
    document.getElementById('txt-neto-limpio').innerText = `${(neto - irpf).toFixed(2)} €`;
    document.getElementById('txt-total-hucha').innerText = `${hucha.toFixed(2)} €`;
    document.getElementById('txt-subtotal-iva').innerText = `${ivaLiquidacion.toFixed(2)} €`;
    document.getElementById('txt-subtotal-irpf').innerText = `${irpf.toFixed(2)} €`;

    const prediccionMensual = (neto - irpf);
    const proyeccionTrimestre = prediccionMensual > 0 ? prediccionMensual * 3 : 0;
    document.getElementById('txt-prediccion').innerText = `${proyeccionTrimestre.toFixed(2)} €`;

    const totalMasa = hucha + (neto - irpf);
    document.getElementById('bar-iva').style.width = totalMasa > 0 ? `${(ivaLiquidacion / totalMasa) * 100}%` : '0%';
    document.getElementById('bar-irpf').style.width = totalMasa > 0 ? `${(irpf / totalMasa) * 100}%` : '0%';

    // Lista de movimientos
    const listaDom = document.getElementById('lista-movimientos');
    listaDom.innerHTML = '';

    [...state.transacciones].forEach(t => {
        const tr = document.createElement('tr');
        tr.className = 'border-b border-brand-border hover:bg-slate-50/60 transition-colors';
        const ivaTotal = t.base * t.ivaPct;
        const esCobrado = t.estado === 'cobrada' || t.estado === 'pagado';
        const tipoBadge = t.tipo === 'ingreso'
            ? '<span class="inline-flex items-center text-[10px] font-semibold bg-emerald-50 text-green-700 border border-emerald-100 px-2 py-0.5 rounded-full">↑ Ingreso</span>'
            : '<span class="inline-flex items-center text-[10px] font-semibold bg-red-50 text-red-700 border border-red-100 px-2 py-0.5 rounded-full">↓ Gasto</span>';
        const estadoBadge = esCobrado
            ? '<span class="inline-flex items-center text-[10px] font-semibold bg-slate-100 text-brand-muted px-2 py-0.5 rounded-full">✓ Cobrado</span>'
            : '<span class="inline-flex items-center text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full">⏳ Pendiente</span>';
        tr.innerHTML = `
            <td class="px-6 py-4 text-xs text-brand-muted font-medium tabnum">${t.fecha}</td>
            <td class="px-6 py-4 font-medium text-brand-text text-sm">${t.concepto}</td>
            <td class="px-6 py-4">${tipoBadge}</td>
            <td class="px-6 py-4 text-right text-sm font-semibold tabnum text-brand-text">${t.base.toFixed(2)} €</td>
            <td class="px-6 py-4 text-right text-xs text-brand-muted tabnum">${ivaTotal.toFixed(2)} €</td>
            <td class="px-6 py-4 text-center">${estadoBadge}</td>
        `;
        listaDom.appendChild(tr);
    });

    if (state.transacciones.length === 0) {
        listaDom.innerHTML = `<tr><td colspan="6" class="py-12 text-center text-brand-muted text-sm">Sin movimientos registrados. Añade tu primera factura.</td></tr>`;
    }

    // Alertas
    const panelAlertas = document.getElementById('panel-alertas');
    const indicadorSalud = document.getElementById('indicador-salud');
    panelAlertas.innerHTML = '';
    let isDanger = false, isWarning = false;

    if (facturasPendientes > 0) {
        panelAlertas.innerHTML += `<div class="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3"><span>⚠️</span><div><p class="text-xs font-bold text-amber-800">Facturas impagadas</p><p class="text-[11px] text-amber-700 mt-0.5">Tienes ${facturasPendientes} facturas por cobrar (${dineroPendiente.toFixed(2)} €).</p></div></div>`;
        isWarning = true;
    }
    if (ivaLiquidacion > (ingresosTotal - dineroPendiente) * 0.5) {
        panelAlertas.innerHTML += `<div class="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3"><span>🚨</span><div><p class="text-xs font-bold text-red-800">Liquidez crítica</p><p class="text-[11px] text-red-700 mt-0.5">Tus impuestos superan tu liquidez disponible. Evita gastos grandes.</p></div></div>`;
        isDanger = true;
    }
    if (!isDanger && !isWarning) {
        panelAlertas.innerHTML = `<div class="bg-white border border-brand-border rounded-xl p-4 flex items-start gap-3 shadow-card"><span class="text-sm">✅</span><div><p class="text-xs font-semibold text-brand-text">Todo en orden</p><p class="text-[11px] text-brand-muted mt-0.5">Tu provisión fiscal está cubierta por tus cobros.</p></div></div>`;
        indicadorSalud.innerHTML = `<div class="w-2 h-2 bg-brand-success rounded-full animate-pulse"></div><span class="text-[11px] font-semibold text-brand-success">Óptimo</span>`;
    } else if (isDanger) {
        indicadorSalud.innerHTML = `<div class="w-2 h-2 bg-brand-danger rounded-full animate-pulse"></div><span class="text-[11px] font-semibold text-brand-danger">Riesgo alto</span>`;
    } else {
        indicadorSalud.innerHTML = `<div class="w-2 h-2 bg-brand-warning rounded-full animate-pulse"></div><span class="text-[11px] font-semibold text-brand-warning">Precaución</span>`;
    }

    matchAyudas();
}

// ═══════════════════════════════════════════════════════
// TRANSACCIONES — Guardar en Supabase
// ═══════════════════════════════════════════════════════
async function addTransaction(e, tipo) {
    e.preventDefault();

    const fecha = document.getElementById(`${tipo}-fecha`).value;
    const concepto = document.getElementById(`${tipo}-concepto`).value;
    const base = parseFloat(document.getElementById(`${tipo}-base`).value);
    const iva_pct = parseFloat(document.getElementById(`${tipo}-iva`).value);
    const estado = document.getElementById(`${tipo}-estado`).value;

    if (guestMode) {
        // Guardar solo en memoria (sin Supabase)
        state.transacciones.unshift({ id: Date.now(), fecha, concepto, tipo, base, ivaPct: iva_pct, estado });
        actualizarUI();
        document.getElementById(`form-${tipo}`).reset();
        document.getElementById(`${tipo}-fecha`).value = new Date().toISOString().split('T')[0];
        mostrarToast('Añadido (solo en esta sesión). Regístrate gratis para guardar tus datos.', 'warning');
        return;
    }

    if (!currentUser) return;

    const newT = { user_id: currentUser.id, fecha, concepto, tipo, base, iva_pct, estado };
    const { data, error } = await sb.from('transactions').insert([newT]).select().single();

    if (!error && data) {
        state.transacciones.unshift({
            id: data.id,
            fecha: data.fecha,
            concepto: data.concepto,
            tipo: data.tipo,
            base: parseFloat(data.base),
            ivaPct: parseFloat(data.iva_pct),
            estado: data.estado
        });
        actualizarUI();
        document.getElementById(`form-${tipo}`).reset();
        document.getElementById(`${tipo}-fecha`).value = new Date().toISOString().split('T')[0];
    }
}

// ═══════════════════════════════════════════════════════
// PERFIL — Guardar en Supabase
// ═══════════════════════════════════════════════════════
async function actualizarPerfil() {
    state.perfil.comunidad = document.getElementById('profile-comunidad').value;
    state.perfil.sector = document.getElementById('profile-sector').value;
    state.perfil.antiguedad = document.getElementById('profile-antiguedad').value;

    if (!guestMode && currentUser) {
        await sb.from('profiles').update({
            comunidad: state.perfil.comunidad,
            sector: state.perfil.sector,
            antiguedad: state.perfil.antiguedad
        }).eq('id', currentUser.id);
    }

    actualizarUI();
}

// ═══════════════════════════════════════════════════════
// CALCULADORAS
// ═══════════════════════════════════════════════════════
function ejecutarCalculadoraPrecio() {
    const s = parseFloat(document.getElementById('calc-sueldo').value);
    const g = parseFloat(document.getElementById('calc-gastos').value);
    const h = parseFloat(document.getElementById('calc-horas').value);
    if (!s || !g || !h) return;
    const bruto = (s + g) / (1 - IRPF_FACTOR);
    const tarifa = bruto / h;
    document.getElementById('res-tarifa-min').innerText = `${tarifa.toFixed(0)} €/h`;
    document.getElementById('res-tarifa-rec').innerText = `${(tarifa * 1.3).toFixed(0)} €/h`;
    document.getElementById('res-tarifa-pre').innerText = `${(tarifa * 1.8).toFixed(0)} €/h`;
    document.getElementById('calc-resultado').classList.remove('hidden');
}

function ejecutarRentabilidad() {
    const prep = parseFloat(document.getElementById('proy-presupuesto').value);
    const mat = parseFloat(document.getElementById('proy-materiales').value || 0);
    const hrs = parseFloat(document.getElementById('proy-horas').value);
    if (!prep || !hrs) return;
    const beneficio = prep - mat;
    const margen = (beneficio / prep) * 100;
    const phEfectivo = beneficio / hrs;
    document.getElementById('proy-res-margen').innerText = `${margen.toFixed(1)}%`;
    document.getElementById('proy-res-ph').innerText = `${phEfectivo.toFixed(2)} €/h`;
    const veredicto = document.getElementById('proy-res-veredicto');
    document.getElementById('proy-resultado').classList.remove('hidden');
    if (phEfectivo < 20) {
        document.getElementById('proy-resultado').className = 'mt-4 p-4 rounded-xl border space-y-2 bg-red-50 border-red-200';
        veredicto.innerText = '❌ Proyecto Tóxico (Baja Rentabilidad)';
        veredicto.className = 'text-xs font-bold text-center uppercase text-red-600';
    } else if (phEfectivo < 40) {
        document.getElementById('proy-resultado').className = 'mt-4 p-4 rounded-xl border space-y-2 bg-amber-50 border-amber-200';
        veredicto.innerText = '⚠️ Rentabilidad Ajustada';
        veredicto.className = 'text-xs font-bold text-center uppercase text-amber-600';
    } else {
        document.getElementById('proy-resultado').className = 'mt-4 p-4 rounded-xl border space-y-2 bg-emerald-50 border-emerald-200';
        veredicto.innerText = '✅ Proyecto Altamente Rentable';
        veredicto.className = 'text-xs font-bold text-center uppercase text-emerald-600';
    }
}

function ejecutarImpactoFiscal() {
    const totalPagado = parseFloat(document.getElementById('imp-gasto').value);
    const ivaPct = parseFloat(document.getElementById('imp-iva').value);
    if (!totalPagado) return;
    const base = totalPagado / (1 + ivaPct);
    const ivaDeducible = totalPagado - base;
    const irpfDeducible = base * IRPF_FACTOR;
    const costeReal = totalPagado - ivaDeducible - irpfDeducible;
    document.getElementById('res-imp-iva').innerText = `-${ivaDeducible.toFixed(2)} €`;
    document.getElementById('res-imp-irpf').innerText = `-${irpfDeducible.toFixed(2)} €`;
    document.getElementById('res-imp-real').innerText = `${costeReal.toFixed(2)} €`;
    document.getElementById('imp-resultado').classList.remove('hidden');
}

// ═══════════════════════════════════════════════════════
// AYUDAS — Match y render
// ═══════════════════════════════════════════════════════
function getTipoBadgeClass(tipo) {
    if (!tipo) return 'bg-gray-100 text-gray-500';
    const t = tipo.toLowerCase();
    if (t.includes('bono') || t.includes('cupón') || t.includes('cupon')) return 'bg-blue-100 text-blue-700';
    if (t.includes('bonificación') || t.includes('bonificacion')) return 'bg-purple-100 text-purple-700';
    if (t.includes('subvención') || t.includes('subvencion')) return 'bg-emerald-100 text-emerald-700';
    if (t.includes('inversión') || t.includes('inversion')) return 'bg-amber-100 text-amber-700';
    return 'bg-gray-100 text-gray-500';
}

// ═══════════════════════════════════════════════════════
// DECLARACIÓN TRIMESTRAL — Modal
// ═══════════════════════════════════════════════════════
function mostrarLiquidacion() {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    let trimNum, periodo, plazo;
    if (month <= 2)      { trimNum = 1; periodo = `1 enero – 31 marzo ${year}`;       plazo = `20 de abril de ${year}`; }
    else if (month <= 5) { trimNum = 2; periodo = `1 abril – 30 junio ${year}`;       plazo = `20 de julio de ${year}`; }
    else if (month <= 8) { trimNum = 3; periodo = `1 julio – 30 septiembre ${year}`;  plazo = `20 de octubre de ${year}`; }
    else                 { trimNum = 4; periodo = `1 octubre – 31 diciembre ${year}`; plazo = `20 de enero de ${year + 1}`; }

    const ivaAPagar = Math.max(0, _ivaCobrado - _ivaPagado);
    const total = ivaAPagar + _irpfLiq;

    document.getElementById('liq-title').textContent = `${trimNum}T ${year}`;
    document.getElementById('liq-periodo').textContent = periodo;
    document.getElementById('liq-plazo').textContent = plazo;
    document.getElementById('liq-iva-cobrado').textContent = `${_ivaCobrado.toFixed(2)} €`;
    document.getElementById('liq-iva-pagado').textContent = `−${_ivaPagado.toFixed(2)} €`;
    document.getElementById('liq-iva-pagar').textContent = `${ivaAPagar.toFixed(2)} €`;
    document.getElementById('liq-base').textContent = `${_netoLiq.toFixed(2)} €`;
    document.getElementById('liq-irpf-pagar').textContent = `${_irpfLiq.toFixed(2)} €`;
    document.getElementById('liq-irpf-total').textContent = `${_irpfLiq.toFixed(2)} €`;
    document.getElementById('liq-total').textContent = `${total.toFixed(2)} €`;

    document.getElementById('modal-liquidacion').classList.remove('hidden');
}

function cerrarLiquidacion() {
    document.getElementById('modal-liquidacion').classList.add('hidden');
}

// ═══════════════════════════════════════════════════════
// POST-PAGO — Detectar retorno desde Stripe y activar PRO
// ═══════════════════════════════════════════════════════
function mostrarToast(mensaje, tipo = 'info') {
    const colores = { success: '#0C7C4A', warning: '#B45309', info: '#0A2540' };
    const toast = document.createElement('div');
    toast.style.cssText = `
        position:fixed; bottom:24px; right:24px; z-index:9999;
        background:${colores[tipo] || colores.info}; color:white;
        font-size:14px; font-weight:500; padding:12px 20px;
        border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.2);
        max-width:320px; line-height:1.4;
    `;
    toast.textContent = mensaje;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 6000);
}

async function verificarPagoExitoso() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') !== 'success') return;

    // Limpiar ?payment=success de la URL sin recargar
    window.history.replaceState({}, '', window.location.pathname);

    // Si ya es PRO (webhook llegó antes), mostrar confirmación directa
    if (state.isPremium) {
        mostrarToast('¡Bienvenido/a a PRO! 🎉 Ya tienes acceso completo.', 'success');
        return;
    }

    // Polling: esperar hasta 10s a que el webhook procese
    mostrarToast('Verificando tu suscripción PRO...', 'info');
    let intentos = 0;
    const poll = setInterval(async () => {
        intentos++;
        const { data: profile } = await sb
            .from('profiles')
            .select('is_premium')
            .eq('id', currentUser.id)
            .single();

        if (profile?.is_premium) {
            clearInterval(poll);
            state.isPremium = true;
            actualizarUI();
            mostrarToast('¡Bienvenido/a a PRO! 🎉 Ya tienes acceso completo.', 'success');
        } else if (intentos >= 5) {
            clearInterval(poll);
            mostrarToast('Pago recibido. Si el plan no se actualiza en unos segundos, recarga la página.', 'warning');
        }
    }, 2000);
}

function matchAyudas() {
    const container = document.getElementById('ayudas-container');
    if (!container) return;
    container.innerHTML = '';

    const { comunidad: pComunidad, sector: pSector, antiguedad: pAntiguedad } = state.perfil;

    const ayudasConScore = ayudasDB
        .filter(a => a.comunidad === 'Nacional' || a.comunidad === 'Europea' || a.comunidad === pComunidad)
        .map(ayuda => {
            let score = 0;
            if (ayuda.requisitos.sector === 'Cualquiera' || ayuda.requisitos.sector === pSector) score++;
            if (ayuda.requisitos.antiguedad === 'Cualquiera' || ayuda.requisitos.antiguedad === pAntiguedad) score++;
            return { ...ayuda, matchScore: Math.round((score / 2) * 100) };
        })
        .sort((a, b) => b.matchScore - a.matchScore);

    const counter = document.getElementById('ayudas-counter');
    if (counter) counter.innerText = `${ayudasConScore.length} ayuda${ayudasConScore.length !== 1 ? 's' : ''} encontrada${ayudasConScore.length !== 1 ? 's' : ''} para tu perfil`;

    ayudasConScore.forEach(ayuda => {
        const { matchScore } = ayuda;
        const matchColor = matchScore === 100 ? 'text-brand-success' : (matchScore >= 50 ? 'text-warning' : 'text-brand-danger');
        const tipoBadgeClass = getTipoBadgeClass(ayuda.tipo);
        const card = document.createElement('div');
        card.className = 'bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between';

        if (guestMode) {
            // Invitado: muestra que existen y cambian con el perfil, pero pide registro
            card.innerHTML = `
                <div class="space-y-3">
                    <div class="flex justify-between items-start">
                        <span class="bg-gray-100 text-gray-500 font-bold text-[10px] px-2 py-1 rounded uppercase tracking-wider">${ayuda.categoria} · ${ayuda.comunidad}</span>
                        <div class="text-right shrink-0 ml-2">
                            <span class="${matchColor} font-black text-lg block leading-none">${matchScore}%</span>
                            <span class="text-[10px] text-gray-400">MATCH</span>
                        </div>
                    </div>
                    <div class="relative rounded-xl overflow-hidden">
                        <div class="blur-[5px] select-none pointer-events-none space-y-2 p-4 bg-gray-50 border border-gray-100 rounded-xl">
                            <span class="${tipoBadgeClass} font-semibold text-[10px] px-2 py-0.5 rounded-full inline-block">${ayuda.tipo}</span>
                            <h4 class="text-sm font-bold text-gray-800 leading-snug">${ayuda.nombre}</h4>
                            <p class="text-xs text-gray-600 leading-relaxed">${ayuda.descripcion}</p>
                            <div class="pt-2 border-t border-gray-200 space-y-1">
                                <div class="flex justify-between text-xs">
                                    <span class="text-gray-500">Importe máximo</span>
                                    <span class="font-bold text-green-700">${ayuda.monto}</span>
                                </div>
                            </div>
                        </div>
                        <div class="absolute inset-0 flex items-center justify-center rounded-xl" style="background: rgba(255,255,255,0.75); backdrop-filter: blur(2px);">
                            <div class="text-center px-4">
                                <span class="text-2xl block mb-2">👤</span>
                                <p class="text-xs font-bold text-brand-text mb-0.5">Crea una cuenta gratis</p>
                                <p class="text-[11px] text-brand-muted mb-3">Para ver las ayudas de tu perfil</p>
                                <button onclick="document.getElementById('auth-modal').classList.remove('hidden')"
                                    class="text-xs bg-brand-text hover:bg-black text-white font-semibold px-5 py-2 rounded-lg transition">
                                    Registrarme gratis
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
        } else if (state.isPremium) {
            const docsHTML = ayuda.documentos.map(d => `<li class="flex items-start space-x-1"><span class="text-brand-accent mt-0.5">•</span><span>${d}</span></li>`).join('');
            card.innerHTML = `
                <div class="space-y-3">
                    <div class="flex justify-between items-start">
                        <div class="flex flex-col space-y-1">
                            <span class="bg-gray-100 text-gray-500 font-bold text-[10px] px-2 py-1 rounded uppercase tracking-wider">${ayuda.categoria} | ${ayuda.comunidad}</span>
                            <span class="${tipoBadgeClass} font-semibold text-[10px] px-2 py-0.5 rounded-full w-fit">${ayuda.tipo}</span>
                        </div>
                        <div class="text-right ml-2 shrink-0">
                            <span class="${matchColor} font-black text-lg block leading-none">${matchScore}%</span>
                            <span class="text-[10px] text-gray-400 font-medium">MATCH</span>
                        </div>
                    </div>
                    <h4 class="text-md font-bold text-gray-800 flex items-start space-x-2">
                        <span>✅</span>
                        <a href="${ayuda.url}" target="_blank" rel="noopener noreferrer" class="hover:text-brand-accent transition underline decoration-gray-300 underline-offset-4">${ayuda.nombre} ↗</a>
                    </h4>
                    <p class="text-xs text-gray-600 leading-relaxed">${ayuda.descripcion}</p>
                    <div class="flex items-center text-xs font-semibold text-gray-500">
                        ⏳ Plazo: <span class="text-brand-danger font-bold ml-1">${ayuda.fechaLimite}</span>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-xl border border-gray-200 mt-2">
                        <div class="flex justify-between items-center mb-3">
                            <span class="text-xs font-bold text-gray-700">Importe máximo</span>
                            <span class="text-sm font-black text-brand-success">${ayuda.monto}</span>
                        </div>
                        <details class="group cursor-pointer">
                            <summary class="text-[10px] font-bold text-gray-500 uppercase bg-gray-200 hover:bg-gray-300 p-2 rounded-lg flex justify-between items-center transition outline-none">
                                Documentación necesaria <span class="group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <ul class="text-xs text-gray-600 mt-2 space-y-1.5 pl-1 pb-1">${docsHTML}</ul>
                        </details>
                        <a href="${ayuda.url}" target="_blank" rel="noopener noreferrer"
                           class="mt-3 flex w-full items-center justify-center text-xs bg-brand-accent hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition">
                            Ir a la convocatoria oficial ↗
                        </a>
                    </div>
                </div>`;
        } else {
            // Free tier: datos reales borrosos + overlay con CTA
            card.innerHTML = `
                <div class="space-y-3">
                    <!-- Cabecera visible: categoría y match son reales y legibles -->
                    <div class="flex justify-between items-start">
                        <span class="bg-gray-100 text-gray-500 font-bold text-[10px] px-2 py-1 rounded uppercase tracking-wider">${ayuda.categoria} · ${ayuda.comunidad}</span>
                        <div class="text-right shrink-0 ml-2">
                            <span class="${matchColor} font-black text-lg block leading-none">${matchScore}%</span>
                            <span class="text-[10px] text-gray-400">MATCH</span>
                        </div>
                    </div>
                    <!-- Contenido real borroso + capa de desbloqueo -->
                    <div class="relative rounded-xl overflow-hidden">
                        <div class="blur-[5px] select-none pointer-events-none space-y-2 p-4 bg-gray-50 border border-gray-100 rounded-xl">
                            <span class="${tipoBadgeClass} font-semibold text-[10px] px-2 py-0.5 rounded-full inline-block">${ayuda.tipo}</span>
                            <h4 class="text-sm font-bold text-gray-800 leading-snug">${ayuda.nombre}</h4>
                            <p class="text-xs text-gray-600 leading-relaxed">${ayuda.descripcion}</p>
                            <div class="pt-2 border-t border-gray-200 space-y-1">
                                <div class="flex justify-between text-xs">
                                    <span class="text-gray-500">Importe máximo</span>
                                    <span class="font-bold text-green-700">${ayuda.monto}</span>
                                </div>
                                <div class="flex justify-between text-xs">
                                    <span class="text-gray-500">Plazo</span>
                                    <span class="font-semibold text-orange-600">${ayuda.fechaLimite}</span>
                                </div>
                                <div class="flex justify-between text-xs">
                                    <span class="text-gray-500">Dificultad</span>
                                    <span class="font-semibold">${ayuda.dificultad}</span>
                                </div>
                            </div>
                        </div>
                        <!-- Capa frosted glass con CTA -->
                        <div class="absolute inset-0 flex items-center justify-center rounded-xl" style="background: rgba(255,255,255,0.72); backdrop-filter: blur(2px);">
                            <div class="text-center px-4">
                                <span class="text-2xl block mb-2">🔒</span>
                                <p class="text-xs font-bold text-brand-text mb-0.5">Contenido PRO</p>
                                <p class="text-[11px] text-brand-muted mb-3">Importe, plazo, docs y enlace oficial</p>
                                <button onclick="togglePremiumPlan()"
                                    class="text-xs bg-brand-accent hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition">
                                    Activar PRO · 4,99 €/mes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
        }
        container.appendChild(card);
    });
}
