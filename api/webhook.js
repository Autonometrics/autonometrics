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

    // ── Pago completado → activar PRO ──────────────────────────────────────
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.client_reference_id;
        const customerId = session.customer;

        console.log('👤 user_id:', userId, '| customer_id:', customerId);

        if (!userId) {
            console.error('❌ Sin client_reference_id');
            return res.status(200).json({ received: true, warning: 'Sin user ID' });
        }

        const { error } = await supabase
            .from('profiles')
            .upsert(
                { id: userId, is_premium: true, stripe_customer_id: customerId },
                { onConflict: 'id' }
            );

        if (error) {
            console.error('❌ Error activando PRO:', JSON.stringify(error));
            return res.status(500).json({ error: error.message });
        }

        console.log('🎉 PRO activado para:', userId);
    }

    // ── Suscripción cancelada → desactivar PRO ─────────────────────────────
    if (event.type === 'customer.subscription.deleted') {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        console.log('🔴 Suscripción cancelada para customer:', customerId);

        const { data: profiles, error: findError } = await supabase
            .from('profiles')
            .select('id')
            .eq('stripe_customer_id', customerId)
            .limit(1);

        if (findError || !profiles?.length) {
            console.error('❌ No se encontró usuario para customer:', customerId);
            return res.status(200).json({ received: true, warning: 'Usuario no encontrado' });
        }

        const userId = profiles[0].id;

        const { error } = await supabase
            .from('profiles')
            .update({ is_premium: false })
            .eq('id', userId);

        if (error) {
            console.error('❌ Error desactivando PRO:', JSON.stringify(error));
            return res.status(500).json({ error: error.message });
        }

        console.log('🔒 PRO desactivado para:', userId);
    }

    // ── Pago fallido → desactivar PRO ──────────────────────────────────────
    if (event.type === 'invoice.payment_failed') {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        console.log('⚠️ Pago fallido para customer:', customerId);

        const { data: profiles } = await supabase
            .from('profiles')
            .select('id')
            .eq('stripe_customer_id', customerId)
            .limit(1);

        if (profiles?.length) {
            await supabase
                .from('profiles')
                .update({ is_premium: false })
                .eq('id', profiles[0].id);

            console.log('🔒 PRO desactivado por pago fallido para:', profiles[0].id);
        }
    }

    return res.status(200).json({ received: true });
};
