// api/weekly-digest.js — Cron semanal (lunes 9:00)
// Vercel llama a este endpoint con Authorization: Bearer CRON_SECRET
const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

const sb = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY   // service_role key — NUNCA anon key aquí
);
const resend = new Resend(process.env.RESEND_API_KEY);

// ── Ayudas (versión resumida para el email) ───────────────────────────────────
const ayudasDB = [
    { nombre:"Kit Digital — Segmento III", comunidad:"Nacional", sector:"Cualquiera", antiguedad:"Cualquiera", monto:"Hasta 2.000 €", fechaLimite:"Abierta", url:"https://sede.red.gob.es/es/procedimientos/convocatoria-de-ayudas-destinadas-la-digitalizacion-de-empresas-del-segmento-iii" },
    { nombre:"Tarifa Plana RETA — 80 €/mes", comunidad:"Nacional", sector:"Cualquiera", antiguedad:"0", monto:"Ahorro ~2.500 € el primer año", fechaLimite:"Permanente", url:"https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/RETA" },
    { nombre:"Capitalización del Desempleo — Pago Único", comunidad:"Nacional", sector:"Cualquiera", antiguedad:"0", monto:"100% de la prestación pendiente", fechaLimite:"Permanente", url:"https://www.sepe.es/HomeSepe/es/autonomos/capitaliza-tu-prestacion.html" },
    { nombre:"FUNDAE — Formación Continua", comunidad:"Nacional", sector:"Cualquiera", antiguedad:"Cualquiera", monto:"Hasta 500 €/año", fechaLimite:"Permanente", url:"https://www.fundae.es/trabajadores" },
    { nombre:"Reducción IRPF 7% — Nuevos Autónomos", comunidad:"Nacional", sector:"Cualquiera", antiguedad:"0", monto:"Ahorro del 8% por factura", fechaLimite:"Permanente", url:"https://www.agenciatributaria.es" },
    { nombre:"Plan MOVES III — Vehículos Eléctricos", comunidad:"Nacional", sector:"Transporte", antiguedad:"Cualquiera", monto:"Hasta 9.000 €", fechaLimite:"31/12/2026", url:"https://www.idae.es/ayudas-y-financiacion/para-movilidad-y-vehiculos/moves-iii-2025" },
    { nombre:"Bono Eficiencia Energética — Hostelería", comunidad:"Nacional", sector:"Hostelería", antiguedad:"12", monto:"Hasta 10.000 €", fechaLimite:"31/10/2026", url:"https://www.mincotur.gob.es" },
    { nombre:"Creación Artística Contemporánea — Ministerio Cultura", comunidad:"Nacional", sector:"Arte", antiguedad:"Cualquiera", monto:"Hasta 30.000 €", fechaLimite:"Convocatoria anual", url:"https://www.cultura.gob.es" },
    { nombre:"PAC 2026/2027 — Pagos Directos Agricultura", comunidad:"Nacional", sector:"Agricultura", antiguedad:"Cualquiera", monto:"Variable según hectáreas", fechaLimite:"Plazo 2027: 1 feb – 30 abr", url:"https://www.mapa.gob.es/es/pac/pac-2023-2027" },
    { nombre:"EIC Accelerator — Horizonte Europa", comunidad:"Europea", sector:"Tecnológico", antiguedad:"12", monto:"Hasta 2.500.000 €", fechaLimite:"Abierta — 3 cortes anuales", url:"https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en" },
    { nombre:"Erasmus para Emprendedores", comunidad:"Europea", sector:"Cualquiera", antiguedad:"0", monto:"530 € – 1.100 €/mes", fechaLimite:"Abierta todo el año", url:"https://www.erasmus-entrepreneurs.eu/index.php?lan=es" },
    { nombre:"Cuota Cero Ampliada — SEF Murcia 2026", comunidad:"Murcia", sector:"Cualquiera", antiguedad:"0", monto:"Hasta 2.920 €", fechaLimite:"15/10/2026", url:"https://sede.carm.es" },
    { nombre:"Cheque de Innovación — INFO Murcia 2026", comunidad:"Murcia", sector:"Tecnológico", antiguedad:"Cualquiera", monto:"Hasta 15.000 €", fechaLimite:"Hasta agotar fondos", url:"https://www.institutofomentomurcia.es" },
    { nombre:"Tarifa Cero — Comunidad de Madrid", comunidad:"Madrid", sector:"Cualquiera", antiguedad:"0", monto:"Hasta 960 €", fechaLimite:"Abierta", url:"https://sede.comunidad.madrid" },
    { nombre:"⚠️ Ayudas Autónomos — Ayuntamiento de Madrid 2026", comunidad:"Madrid", sector:"Cualquiera", antiguedad:"12", monto:"Hasta 10.000 €", fechaLimite:"⚠️ 23/07/2026 — ¡Plazo próximo!", url:"https://www.comunidad.madrid/empleo/ayudas-personas-trabajadoras-autonomas-emprendedoras-entidades-economia-social" },
    { nombre:"Modernización del Comercio — Comunidad de Madrid", comunidad:"Madrid", sector:"Comercio", antiguedad:"12", monto:"Hasta 30.000 €", fechaLimite:"31/10/2026", url:"https://tramita.comunidad.madrid" },
    { nombre:"Cuota Cero — Junta de Andalucía", comunidad:"Andalucia", sector:"Cualquiera", antiguedad:"0", monto:"Hasta 1.440 €", fechaLimite:"Abierta", url:"https://www.juntadeandalucia.es" },
    { nombre:"Cupones ACCIÓ a la Innovación 2026 — Cataluña", comunidad:"Cataluña", sector:"Tecnológico", antiguedad:"Cualquiera", monto:"Hasta 20.000 €", fechaLimite:"Hasta agotar fondos", url:"https://www.accio.gencat.cat" },
    { nombre:"IVACE — Bono Digitalización — Valencia", comunidad:"Valencia", sector:"Cualquiera", antiguedad:"Cualquiera", monto:"Hasta 5.000 €", fechaLimite:"Convocatoria 2026 activa", url:"https://www.ivace.es" },
    { nombre:"GVA Labora — Fomento Empleo Autónomo Valencia", comunidad:"Valencia", sector:"Cualquiera", antiguedad:"0", monto:"Hasta 8.000 €", fechaLimite:"Convocatoria semestral", url:"https://www.labora.gva.es" },
    { nombre:"Bono Emprendimiento Digital — Lanbide Euskadi", comunidad:"PaisVasco", sector:"Tecnológico", antiguedad:"0", monto:"Hasta 6.000 €", fechaLimite:"Convocatoria trimestral", url:"https://www.lanbide.euskadi.eus" },
    { nombre:"Programa Kudeatu — Autónomo Vasco", comunidad:"PaisVasco", sector:"Cualquiera", antiguedad:"Cualquiera", monto:"Hasta 5.000 €", fechaLimite:"Abierta", url:"https://www.spri.eus" },
    { nombre:"Programa PEMES — Xunta de Galicia", comunidad:"Galicia", sector:"Cualquiera", antiguedad:"Cualquiera", monto:"Hasta 12.000 €", fechaLimite:"Convocatoria 2026 activa", url:"https://www.xunta.gal/emprego" },
    { nombre:"IG290 — Incentivos Empleo Autónomo — Galicia", comunidad:"Galicia", sector:"Cualquiera", antiguedad:"0", monto:"Hasta 3.000 €", fechaLimite:"Plazo abierto", url:"https://www.xunta.gal" },
];

function filtrarAyudas(comunidad, sector, antiguedad) {
    return ayudasDB.filter(a => {
        const cOk = comunidad === 'todas' || a.comunidad === comunidad || a.comunidad === 'Nacional' || a.comunidad === 'Europea';
        const sOk = sector === 'Cualquiera' || a.sector === 'Cualquiera' || a.sector === sector;
        const aOk = antiguedad === 'Cualquiera' || a.antiguedad === 'Cualquiera' || a.antiguedad === antiguedad;
        return cOk && sOk && aOk;
    });
}

function buildEmailHTML(ayudas, suscriptor) {
    const urgentes = ayudas.filter(a => a.fechaLimite.includes('⚠️'));
    const resto    = ayudas.filter(a => !a.fechaLimite.includes('⚠️'));

    const itemHTML = (a) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #E5E7EB;">
          <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#1D1D1F;">${a.nombre}</p>
          <p style="margin:0 0 6px;font-size:13px;color:#6E6E73;">${a.monto} · Plazo: ${a.fechaLimite}</p>
          <a href="${a.url}" style="font-size:12px;color:#0071E3;text-decoration:none;font-weight:600;">
            Ver convocatoria oficial →
          </a>
        </td>
      </tr>`;

    const urgentesSection = urgentes.length ? `
      <h3 style="font-size:14px;font-weight:700;color:#DC2626;margin:24px 0 8px;">⚠️ Urgente — Plazo próximo</h3>
      <table width="100%" cellpadding="0" cellspacing="0">${urgentes.map(itemHTML).join('')}</table>
    ` : '';

    const restoSection = resto.length ? `
      <h3 style="font-size:14px;font-weight:700;color:#1D1D1F;margin:24px 0 8px;">Ayudas disponibles para ti</h3>
      <table width="100%" cellpadding="0" cellspacing="0">${resto.map(itemHTML).join('')}</table>
    ` : '';

    return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F5F5F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F7;padding:32px 16px;">
    <tr><td>
      <table width="600" align="center" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;padding:32px;max-width:600px;">
        <tr><td>
          <p style="font-size:22px;font-weight:800;color:#1D1D1F;margin:0 0 4px;">AutonoMetrics</p>
          <p style="font-size:14px;color:#6E6E73;margin:0 0 24px;">Resumen semanal de ayudas para autónomos</p>
          <p style="font-size:15px;color:#1D1D1F;margin:0 0 8px;">
            Hemos encontrado <strong>${ayudas.length} ayuda${ayudas.length !== 1 ? 's' : ''}</strong> que coinciden con tu perfil.
          </p>
          ${urgentesSection}
          ${restoSection}
          <hr style="border:none;border-top:1px solid #E5E7EB;margin:28px 0 20px;">
          <p style="font-size:12px;color:#9CA3AF;margin:0;">
            Recibes este email porque te suscribiste en autonometrics.vercel.app.<br>
            <a href="https://autonometrics.vercel.app/?baja=${suscriptor.email}" style="color:#9CA3AF;">Darse de baja</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

module.exports = async (req, res) => {
    // Verificar que la llamada viene de Vercel Cron
    if (req.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).json({ error: 'No autorizado' });
    }

    const { data: suscriptores, error } = await sb
        .from('suscriptores')
        .select('*')
        .eq('activo', true);

    if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error });
    }

    let enviados = 0;
    const errores = [];

    for (const s of suscriptores) {
        const matches = filtrarAyudas(s.comunidad, s.sector, s.antiguedad);
        if (matches.length === 0) continue;

        try {
            await resend.emails.send({
                from:    'AutonoMetrics <onboarding@resend.dev>',
                to:      s.email,
                subject: `${matches.length} ayuda${matches.length !== 1 ? 's' : ''} para autónomos que te pueden interesar`,
                html:    buildEmailHTML(matches, s)
            });
            enviados++;
        } catch (e) {
            errores.push({ email: s.email, error: e.message });
        }
    }

    return res.status(200).json({ ok: true, enviados, errores });
};
