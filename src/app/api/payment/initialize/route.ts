import { NextResponse } from 'next/server';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, amount, metadata, callback_url } = body;

    if (!email || !amount) {
      return NextResponse.json({ error: 'email and amount are required' }, { status: 400 });
    }

    const res = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), // kobo
        currency: 'NGN',
        metadata: metadata || {},
        callback_url: callback_url || `${process.env.NEXT_PUBLIC_APP_URL}/payment/callback`,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.message }, { status: res.status });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error('Paystack init error', err);
    return NextResponse.json({ error: 'Payment initialization failed' }, { status: 500 });
  }
}
