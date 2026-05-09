import { NextResponse } from 'next/server';
import crypto from 'crypto';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;

export async function POST(request: Request) {
  const body = await request.text();
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET)
    .update(body)
    .digest('hex');

  const signature = request.headers.get('x-paystack-signature');
  if (hash !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const event = JSON.parse(body);

  switch (event.event) {
    case 'charge.success':
      // Payment succeeded — subscription activation handled client-side after verify
      console.log('Payment success:', event.data.reference);
      break;
    case 'subscription.create':
      console.log('Subscription created:', event.data.subscription_code);
      break;
    case 'subscription.disable':
      console.log('Subscription disabled:', event.data.subscription_code);
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
