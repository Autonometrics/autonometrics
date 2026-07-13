// api/subscribe.js — Guarda suscripciones en Supabase
const { createClient } = require('@supabase/supabase-js');

const sb = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY   // service key para saltarse RLS en servidor
);

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

    const { email, comunidad = 'todas', sector = 'Cualquiera', antiguedad = 'Cualquiera' } = req.body || {};

    if (!email || !email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ error: 'Email inválido' });
    }

    const { error } = await sb
        .from('suscriptores')
        .upsert(
            {
                email: email.toLowerCase().trim(),
                comunidad,
                sector,
                antiguedad,
                activo: true
            },
            { onConflict: 'email' }
        );

    if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: 'Error al guardar la suscripción' });
    }

    return res.status(200).json({ ok: true, message: '¡Suscripción guardada! Te avisaremos por email.' });
};
