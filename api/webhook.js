const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end('Method Not Allowed');
    }

    const sig = req.headers['stripe-signature'];

    // Leer el body en bruto (necesario para verificar la firma de Stripe)
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
        console.error('Error de firma del webhook:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Pago completado → activar PRO
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.client_reference_id;

        if (userId) {
            const { error } = await supabase
                .from('profiles')
                .update({ is_premium: true })
                .eq('id', userId);

            if (error) {
                console.error('Error activando PRO en Supabase:', error);
                return res.status(500).json({ error: 'Error actualizando base de datos' });
            }

            console.log(`✅ PRO activado para usuario: ${userId}`);
        }
    }

    // Suscripción cancelada → desactivar PRO
    if (event.type === 'customer.subscription.deleted') {
        const subscription = event.data.object;
        console.log('Suscripción cancelada:', subscription.id);
        // TODO: implementar búsqueda por stripe_customer_id cuando añadamos esa columna
    }

    return res.status(200).json({ received: true });
}
