import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(req: Request) {
const { searchParams } = new URL(req.url);
const sessionId = searchParams.get("session_id");

if (!sessionId) {
return NextResponse.json({ paid: false });
}

try {
const session = await stripe.checkout.sessions.retrieve(sessionId);

if (session.payment_status === "paid") {
return NextResponse.json({ paid: true });
}

return NextResponse.json({ paid: false });
} catch (error) {
console.error(error);
return NextResponse.json({ paid: false });
}
}