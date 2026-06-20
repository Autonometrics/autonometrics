const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end('Method Not Allowed');
    }

    const sig = req.headers['stripe-signature'];

    // Leer body en bruto para verificar firma de Stripe
    const chunks = [];
    for await (const chunk of req) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    const rawBody = Buffer.concat(chunks);

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('❌ Error de firma:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log('✅ Evento recibido:', event.type);

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.client_reference_id;

        console.log('👤 client_reference_id:', userId);
        console.log('🔑 SUPABASE_URL:', process.env.SUPABASE_URL ? 'OK' : 'FALTA');
        console.log('🔑 SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'OK' : 'FALTA');

        if (!userId) {
            console.error('❌ No se recibió client_reference_id');
            return res.status(200).json({ received: true, warning: 'Sin user ID' });
        }

        // Upsert para asegurar que la fila exista aunque el trigger no la creara
        const { data, error } = await supabase
            .from('profiles')
            .upsert({ id: userId, is_premium: true }, { onConflict: 'id' })
            .select();

        if (error) {
            console.error('❌ Error Supabase completo:', JSON.stringify(error));
            return res.status(500).json({ error: error.message, details: error });
        }

        console.log('🎉 PRO activado para:', userId, '| Resultado:', JSON.stringify(data));
    }

    return res.status(200).json({ received: true });
};
