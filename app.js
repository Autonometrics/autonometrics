// ═══════════════════════════════════════════════════════
// SUPABASE — Cliente
// ═══════════════════════════════════════════════════════
const { createClient } = supabase;
const sb = createClient(
    'https://jgaehoxzxexecjlmferb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnYWVob3h6eGV4ZWNqbG1mZXJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4OTAzMDEsImV4cCI6MjA5NzQ2NjMwMX0.J2e_UPYu72GWBTEe6L8CdfRuPs78k6r9RaLuKDfhVYY'
);

// ═══════════════════════════════════════════════════════
// BASE DE DATOS DE AYUDAS
// ═══════════════════════════════════════════════════════
const ayudasDB = [
    // NACIONAL
    {
        id: 1, nombre: "Kit Digital — Segmento III (Autónomos sin empleados)", tipo: "Bono Digital",
        categoria: "Digitalización", comunidad: "Nacional",
        requisitos: { sector: "Cualquiera", antiguedad: "Cualquiera" },
        descripcion: "Bono de Fondos NextGen para digitalizar tu negocio: página web, e-commerce, ciberseguridad, ofimática en la nube, gestión de clientes (CRM) y más. Requiere registro previo en Acelera Pyme.",
        documentos: ["Registro en www.acelerapyme.gob.es + test de diagnóstico digital completado", "Certificado de estar al corriente con la AEAT", "Certificado de estar al corriente con la Seguridad Social"],
        monto: "Hasta 2.000 €", fechaLimite: "Abierta (hasta agotar fondos — BOE Orden TDF/39/2026)", dificultad: "Baja",
        url: "https://sede.red.gob.es/es/procedimientos/convocatoria-de-ayudas-destinadas-la-digitalizacion-de-empresas-del-segmento-iii"
    },
    {
        id: 2, nombre: "Tarifa Plana RETA — 80 €/mes (12 meses)", tipo: "Bonificación de cuota",
        categoria: "Seguridad Social", comunidad: "Nacional",
        requisitos: { sector: "Cualquiera", antiguedad: "0" },
        descripcion: "Reducción automática de la cuota RETA a 80 €/mes durante los primeros 12 meses de actividad. Se solicita en el momento del alta a través del portal Import@ss de la Seguridad Social.",
        documentos: ["Alta en el RETA (modelo TA.0521 o trámite digital en Import@ss)", "No haber cotizado en el RETA en los últimos 2 años (3 si ya la disfrutaste)", "Estar al corriente con la AEAT y la Seguridad Social"],
        monto: "Ahorro de ~2.500 € (primer año)", fechaLimite: "Permanente (solicitarla en el alta)", dificultad: "Baja",
        url: "https://importass.seg-social.es/enportal/publico/landing"
    },
    {
        id: 3, nombre: "Plan MOVES III — Vehículos Eléctricos y Recarga", tipo: "Subvención directa",
        categoria: "Movilidad Sostenible", comunidad: "Nacional",
        requisitos: { sector: "Transporte", antiguedad: "Cualquiera" },
        descripcion: "Subvenciones para adquisición de turismos, furgonetas, motos eléctricas y puntos de recarga. Gestionado por cada CCAA con su propia convocatoria.",
        documentos: ["Factura de compra del vehículo eléctrico nuevo", "Ficha técnica ITV homologada del vehículo adquirido", "Certificado de baja y achatarramiento del vehículo antiguo (si se pide bonus extra)"],
        monto: "Hasta 9.000 €", fechaLimite: "31/12/2026 (por CCAA)", dificultad: "Media",
        url: "https://www.idae.es/ayudas-y-financiacion/para-movilidad-y-vehiculos/moves-iii-2025"
    },
    {
        id: 4, nombre: "Bono Eficiencia Energética — Hostelería y Turismo", tipo: "Subvención directa",
        categoria: "Eficiencia Energética", comunidad: "Nacional",
        requisitos: { sector: "Hostelería", antiguedad: "12" },
        descripcion: "Fondos europeos para mejorar la eficiencia energética en locales de hostelería y alojamientos turísticos: sustitución de equipos, iluminación LED, climatización eficiente y auditorías.",
        documentos: ["Auditoría energética previa firmada por técnico competente", "Presupuesto de instalación/reforma visado", "Licencia de apertura del local en vigor"],
        monto: "Hasta 10.000 €", fechaLimite: "31/10/2026", dificultad: "Alta",
        url: "https://www.mincotur.gob.es/PortalAyudas/Eficiencia-Energetica-Turismo/Paginas/Index.aspx"
    },
    // EUROPEA
    {
        id: 5, nombre: "EIC Accelerator — Horizonte Europa (UE)", tipo: "Subvención + Inversión",
        categoria: "Innovación / I+D+i", comunidad: "Europea",
        requisitos: { sector: "Tecnológico", antiguedad: "12" },
        descripcion: "Financiación directa de la UE para pymes con proyectos de innovación disruptiva a escala global. Hasta 2,5M€ en subvención + equity opcional del EIC Fund (hasta 15M€).",
        documentos: ["Short Application: pitch en vídeo (3 min) + deck de 10 diapositivas", "Full Application: Business Plan europeo completo (formato EIC)", "Presupuesto detallado del proyecto de I+D+i"],
        monto: "Hasta 2.500.000 € + equity opcional", fechaLimite: "Abierta — 3 cortes anuales", dificultad: "Muy Alta",
        url: "https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en"
    },
    // MURCIA
    {
        id: 6, nombre: "Cuota Cero Ampliada — SEF Región de Murcia 2026", tipo: "Subvención directa",
        categoria: "Inicio de actividad", comunidad: "Murcia",
        requisitos: { sector: "Cualquiera", antiguedad: "0" },
        descripcion: "Reembolso del 100% de las cuotas RETA durante hasta 24 meses para nuevos autónomos murcianos. Convocatoria 2026 activa con ~6 millones de euros presupuestados.",
        documentos: ["Alta IAE y en el RETA (resolución de la SS)", "Informe de inscripción como demandante de empleo en el SEF", "Certificado de empadronamiento en la Región de Murcia", "Declaración responsable de no haber sido autónomo/a en los últimos 2 años"],
        monto: "Hasta 2.920 € (24 meses de cuotas)", fechaLimite: "15/10/2026", dificultad: "Media",
        url: "https://sede.carm.es/web/pagina?IDCONTENIDO=4091&IDTIPO=240&RASTRO=c672%24m"
    },
    {
        id: 7, nombre: "Cheque de Innovación — INFO Murcia 2026", tipo: "Bono para servicios externos",
        categoria: "Innovación / Competitividad", comunidad: "Murcia",
        requisitos: { sector: "Tecnológico", antiguedad: "Cualquiera" },
        descripcion: "Subvención del 70% (hasta 85% en sectores RIS4 Murcia) para contratar servicios externos de innovación. Dotación: 1M€ en 2026.",
        documentos: ["Memoria técnica justificativa del servicio a contratar", "Presupuesto proforma del proveedor acreditado por el INFO", "Certificados de estar al corriente con AEAT y Seguridad Social"],
        monto: "Hasta 15.000 €", fechaLimite: "Hasta agotar fondos (abierta en 2026)", dificultad: "Alta",
        url: "https://www.institutofomentomurcia.es/cheques-de-innovacion"
    },
    // MADRID
    {
        id: 8, nombre: "Tarifa Cero — Comunidad de Madrid", tipo: "Bonificación de cuota",
        categoria: "Inicio de actividad", comunidad: "Madrid",
        requisitos: { sector: "Cualquiera", antiguedad: "0" },
        descripcion: "Reembolso del 100% de la cuota RETA durante los primeros meses de actividad para nuevos autónomos residentes en la Comunidad de Madrid. Compatible con la Tarifa Plana estatal.",
        documentos: ["Alta en el RETA", "Certificado de empadronamiento en la Comunidad de Madrid", "Declaración responsable de no haber sido autónomo/a en los 2 últimos años"],
        monto: "Hasta 960 € (reembolso de cuotas)", fechaLimite: "Abierta", dificultad: "Baja",
        url: "https://sede.comunidad.madrid/ayudas-becas-subvenciones/ayudas-tarifa-cero"
    },
    {
        id: 9, nombre: "Ayudas Autónomos y Emprendedores — Ayuntamiento de Madrid 2026", tipo: "Subvención directa",
        categoria: "Consolidación / Relevo generacional", comunidad: "Madrid",
        requisitos: { sector: "Cualquiera", antiguedad: "12" },
        descripcion: "Nueva convocatoria de 2 millones de euros del Ayuntamiento de Madrid para apoyar la viabilidad de negocios autónomos, traspasos de negocio y creación de empleo.",
        documentos: ["Plan de viabilidad del negocio (modelo BOCM)", "Alta IAE en el municipio de Madrid", "Memoria explicativa de la actividad y del empleo generado"],
        monto: "Hasta 10.000 €", fechaLimite: "20 días desde publicación BOCM (junio 2026)", dificultad: "Media",
        url: "https://www.comunidad.madrid/empleo/ayudas-personas-trabajadoras-autonomas-emprendedoras-entidades-economia-social"
    },
    {
        id: 10, nombre: "Modernización del Comercio — Comunidad de Madrid", tipo: "Subvención directa",
        categoria: "Equipamiento / Reforma", comunidad: "Madrid",
        requisitos: { sector: "Comercio", antiguedad: "12" },
        descripcion: "Financiación co-financiada con FEDER para obras de mejora, adquisición de mobiliario comercial y equipos en locales comerciales minoristas.",
        documentos: ["Proyecto técnico de obra o reforma firmado", "Facturas proforma de los proveedores", "Alta IAE en epígrafe de comercio al por menor", "Escritura de propiedad o contrato de arrendamiento del local"],
        monto: "Hasta 30.000 €", fechaLimite: "31/10/2026", dificultad: "Media",
        url: "https://tramita.comunidad.madrid/ayudas-becas-subvenciones/ayudas-modernizacion-comercios"
    },
    // ANDALUCÍA
    {
        id: 11, nombre: "Cuota Cero — Junta de Andalucía (Línea 1)", tipo: "Bonificación de cuota",
        categoria: "Inicio de actividad", comunidad: "Andalucia",
        requisitos: { sector: "Cualquiera", antiguedad: "0" },
        descripcion: "Subvención del 100% de la cuota RETA durante los primeros meses para mujeres, jóvenes menores de 35 años y colectivos vulnerables que inicien actividad en Andalucía.",
        documentos: ["Alta en el RETA y en el IAE", "Certificado de empadronamiento en Andalucía", "Documentación acreditativa del colectivo (DNI, tarjeta de discapacidad, etc.)"],
        monto: "Hasta 1.440 € (cuotas del periodo subvencionado)", fechaLimite: "Abierta", dificultad: "Baja",
        url: "https://www.juntadeandalucia.es/organismos/empleoempresaytrabajoautonomo/areas/trabajo-autonomo/fomento-trabajo-autonomo/paginas/subv-fomento-cuota-cero.html"
    },
    {
        id: 12, nombre: "Inicio de Actividad Autónoma — Junta de Andalucía (Línea 2)", tipo: "Subvención directa",
        categoria: "Inicio de actividad", comunidad: "Andalucia",
        requisitos: { sector: "Cualquiera", antiguedad: "0" },
        descripcion: "Ayuda directa para el inicio de actividad con cuantías diferenciadas por colectivo. Convocatoria conjunta 2025-2026.",
        documentos: ["Plan de viabilidad del negocio", "Alta en el RETA", "Certificado de empadronamiento en Andalucía", "Acreditación del colectivo (género/edad con DNI)"],
        monto: "Hasta 5.000 €", fechaLimite: "30/06/2026", dificultad: "Alta",
        url: "https://www.juntadeandalucia.es/organismos/empleoempresaytrabajoautonomo/areas/trabajo-autonomo/fomento-trabajo-autonomo/paginas/subv-fomento-inicio-actividad.html"
    },
    // CATALUÑA
    {
        id: 13, nombre: "Cupones ACCIÓ a la Innovación 2026 — Cataluña", tipo: "Bono para servicios externos",
        categoria: "Innovación / Digitalización / IA", comunidad: "Cataluña",
        requisitos: { sector: "Tecnológico", antiguedad: "Cualquiera" },
        descripcion: "Cupones directos de la Generalitat para contratar servicios de innovación: IA, sostenibilidad, propiedad industrial y acceso a proyectos europeos R+D+I. Cuatro líneas en 2026.",
        documentos: ["Registro previo en el portal ACCIÓ (accio.gencat.cat)", "Memoria de la necesidad y el servicio a contratar", "Presupuesto del proveedor homologado por ACCIÓ"],
        monto: "Hasta 20.000 €", fechaLimite: "Hasta agotar fondos (convocatoria abierta mayo 2026)", dificultad: "Media",
        url: "https://www.accio.gencat.cat/ca/serveis/innovacio/cupons-a-la-innovacio/"
    },
    {
        id: 14, nombre: "Bonificación Alta Autónomo/a — Canal Empresa Catalunya", tipo: "Bonificación de cuota",
        categoria: "Inicio de actividad", comunidad: "Cataluña",
        requisitos: { sector: "Cualquiera", antiguedad: "0" },
        descripcion: "Complemento autonómico catalán a la tarifa plana estatal para nuevos autónomos: bonificación adicional de cuotas durante el primer año de actividad para residentes en Cataluña.",
        documentos: ["Alta en el RETA", "Domicilio fiscal en Cataluña", "No haber estado de alta como autónomo/a en los últimos 2 años"],
        monto: "Hasta 1.200 €", fechaLimite: "Permanente", dificultad: "Baja",
        url: "https://canalempresa.gencat.cat/es/01_que_voleu_fer/mesuresempresesiautonoms/informacio-temes-sectors-cicle-vida/autonoms/index.html"
    }
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
const IRPF_FACTOR = 0.19;

// ═══════════════════════════════════════════════════════
// AUTH — Escuchar cambios de sesión
// ═══════════════════════════════════════════════════════
sb.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
        currentUser = session.user;
        document.getElementById('auth-modal').classList.add('hidden');
        document.getElementById('user-email').textContent = session.user.email;
        document.getElementById('user-info').classList.remove('hidden');
        await cargarDatosUsuario();
        actualizarUI();
    } else {
        currentUser = null;
        state.transacciones = [];
        state.isPremium = false;
        state.perfil = { comunidad: "Murcia", sector: "Tecnológico", antiguedad: "0" };
        document.getElementById('auth-modal').classList.remove('hidden');
        document.getElementById('user-info').classList.add('hidden');
    }
});

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

async function signOut() {
    await sb.auth.signOut();
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
            ? 'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left bg-brand-accent text-white font-medium transition'
            : 'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left hover:bg-gray-800 text-gray-400 hover:text-white transition';
    });
}

async function togglePremiumPlan() {
    if (!currentUser) return;
    if (state.isPremium) return; // Ya es PRO, no hacer nada

    // Redirigir a Stripe con el ID del usuario como referencia
    // Stripe llamará al webhook cuando el pago se complete y activará PRO automáticamente
    const PAYMENT_LINK = 'https://buy.stripe.com/test_fZu7sN6WD7Nvcji5a0cQU00';
    window.location.href = `${PAYMENT_LINK}?client_reference_id=${currentUser.id}`;
}

async function limpiarTransacciones() {
    if (!currentUser) return;
    if (confirm('⚠️ ¿Estás seguro de que quieres eliminar todos tus movimientos? Esta acción no se puede deshacer.')) {
        await sb.from('transactions').delete().eq('user_id', currentUser.id);
        state.transacciones = [];
        actualizarUI();
    }
}

// ═══════════════════════════════════════════════════════
// DASHBOARD — Cálculos y render
// ═══════════════════════════════════════════════════════
function actualizarUI() {
    const badge = document.getElementById('plan-badge');
    badge.innerText = state.isPremium ? 'PRO ACTIVADO' : 'GRATIS';
    badge.className = state.isPremium
        ? 'text-xs bg-brand-success text-white px-2 py-0.5 rounded-full font-bold mb-3 inline-block'
        : 'text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full font-bold mb-3 inline-block';

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
        tr.className = 'border-b border-gray-100 hover:bg-gray-50 transition';
        const tipoColor = t.tipo === 'ingreso' ? 'text-brand-success' : 'text-brand-danger';
        const iconoEstado = t.estado === 'cobrada' || t.estado === 'pagado' ? '✅' : '⏳';
        const ivaTotal = t.base * t.ivaPct;
        tr.innerHTML = `
            <td class="py-3 text-gray-500">${t.fecha}</td>
            <td class="py-3 font-semibold text-gray-800">${t.concepto}</td>
            <td class="py-3 capitalize font-bold ${tipoColor}">${t.tipo}</td>
            <td class="py-3">${t.base.toFixed(2)} €</td>
            <td class="py-3 text-gray-500">${ivaTotal.toFixed(2)} €</td>
            <td class="py-3 capitalize text-xs bg-gray-50 rounded px-2">${iconoEstado} ${t.estado}</td>
        `;
        listaDom.appendChild(tr);
    });

    if (state.transacciones.length === 0) {
        listaDom.innerHTML = `<tr><td colspan="6" class="py-6 text-center text-gray-400 italic">No hay movimientos registrados.</td></tr>`;
    }

    // Alertas
    const panelAlertas = document.getElementById('panel-alertas');
    const indicadorSalud = document.getElementById('indicador-salud');
    panelAlertas.innerHTML = '';
    let isDanger = false, isWarning = false;

    if (facturasPendientes > 0) {
        panelAlertas.innerHTML += `<div class="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start space-x-3"><span class="text-amber-500">⚠️</span><div><p class="text-xs font-bold text-amber-800">Facturas impagadas</p><p class="text-[11px] text-amber-700">Tienes ${facturasPendientes} facturas (${dineroPendiente.toFixed(2)}€) pendientes.</p></div></div>`;
        isWarning = true;
    }
    if (ivaLiquidacion > (ingresosTotal - dineroPendiente) * 0.5) {
        panelAlertas.innerHTML += `<div class="bg-red-50 border border-red-200 p-3 rounded-lg flex items-start space-x-3"><span class="text-red-500">🚨</span><div><p class="text-xs font-bold text-red-800">Líquido Crítico</p><p class="text-[11px] text-red-700">Tus impuestos superan tu liquidez. Evita grandes gastos.</p></div></div>`;
        isDanger = true;
    }
    if (!isDanger && !isWarning) {
        panelAlertas.innerHTML = `<div class="bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex items-start space-x-3"><span class="text-emerald-500">✅</span><div><p class="text-xs font-bold text-emerald-800">Todo en orden</p><p class="text-[11px] text-emerald-700">Tu provisión fiscal está cubierta por tus cobros.</p></div></div>`;
        indicadorSalud.innerHTML = `<div class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div><span class="text-xs font-bold text-emerald-600">ÓPTIMO</span>`;
    } else if (isDanger) {
        indicadorSalud.innerHTML = `<div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div><span class="text-xs font-bold text-red-600">RIESGO ALTO</span>`;
    } else {
        indicadorSalud.innerHTML = `<div class="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div><span class="text-xs font-bold text-amber-600">PRECAUCIÓN</span>`;
    }

    matchAyudas();
}

// ═══════════════════════════════════════════════════════
// TRANSACCIONES — Guardar en Supabase
// ═══════════════════════════════════════════════════════
async function addTransaction(e, tipo) {
    e.preventDefault();
    if (!currentUser) return;

    const newT = {
        user_id: currentUser.id,
        fecha: document.getElementById(`${tipo}-fecha`).value,
        concepto: document.getElementById(`${tipo}-concepto`).value,
        tipo: tipo,
        base: parseFloat(document.getElementById(`${tipo}-base`).value),
        iva_pct: parseFloat(document.getElementById(`${tipo}-iva`).value),
        estado: document.getElementById(`${tipo}-estado`).value
    };

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
    if (!currentUser) return;
    state.perfil.comunidad = document.getElementById('profile-comunidad').value;
    state.perfil.sector = document.getElementById('profile-sector').value;
    state.perfil.antiguedad = document.getElementById('profile-antiguedad').value;

    await sb.from('profiles').update({
        comunidad: state.perfil.comunidad,
        sector: state.perfil.sector,
        antiguedad: state.perfil.antiguedad
    }).eq('id', currentUser.id);

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

        if (state.isPremium) {
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
            card.innerHTML = `
                <div class="space-y-3">
                    <div class="flex justify-between items-start">
                        <div class="flex flex-col space-y-1">
                            <span class="bg-gray-100 text-gray-500 font-bold text-[10px] px-2 py-1 rounded uppercase tracking-wider">${ayuda.categoria} | ${ayuda.comunidad}</span>
                            <span class="bg-gray-100 text-gray-400 font-semibold text-[10px] px-2 py-0.5 rounded-full w-fit blur-[2px]">${ayuda.tipo}</span>
                        </div>
                        <div class="text-right ml-2 shrink-0">
                            <span class="${matchColor} font-black text-lg block leading-none blur-[2px]">${matchScore}%</span>
                            <span class="text-[10px] text-gray-400 font-medium">MATCH</span>
                        </div>
                    </div>
                    <h4 class="text-md font-bold text-gray-700 flex items-center space-x-2">🔒 <span>${ayuda.nombre}</span></h4>
                    <p class="text-xs text-gray-400 line-clamp-2 blur-[2px]">${ayuda.descripcion}</p>
                    <div class="bg-gray-50 p-3 rounded-xl border border-dashed border-gray-300 text-center mt-4">
                        <p class="text-[10px] text-gray-500 font-medium mb-1">Importe, plazo, documentación y enlace directo a la convocatoria</p>
                        <p class="text-[10px] text-gray-400 mb-3">disponibles en el plan PRO.</p>
                        <button onclick="togglePremiumPlan()" class="w-full text-xs bg-brand-dark hover:bg-black text-white font-bold py-2 rounded-lg transition">Desbloquear Guía PRO</button>
                    </div>
                </div>`;
        }
        container.appendChild(card);
    });
}
