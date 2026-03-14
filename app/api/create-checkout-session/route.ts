import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST() {
try {
const session = await stripe.checkout.sessions.create({
mode: "payment",
line_items: [
{
price_data: {
currency: "usd",
product_data: {
name: "PDF Tag Sheet Unlock",
description: "One-time unlock to download printable QR tag sheets",
},
unit_amount: 900,
},
quantity: 1,
},
],
success_url: "https://tags.designanyspace.com/success",
cancel_url: "https://tags.designanyspace.com",
});

return NextResponse.json({ url: session.url });
} catch (error) {
console.error("Stripe checkout error:", error);
return NextResponse.json(
{ error: "Unable to create checkout session" },
{ status: 500 }
);
}
}