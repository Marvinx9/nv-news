import { fauna } from "@/services/fauna";
import { stripe } from "@/services/stripe";
import { fql } from "fauna";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function Subscribe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getSession({ req });

    if (!session?.user?.email) {
      return res.status(404).json("usuário não encontrado!");
    }
    const queryUser = fql`
      users.user_by_email(${session.user.email}).first()`;

    const user = await fauna.query(queryUser);

    if (user.data != null) {
      let stripeCustomerId = user.data?.stripe_customer_id ?? null;

      if (!stripeCustomerId) {
        const stripeCustomer = await stripe.customers.create({
          email: session.user.email!,
        });
        stripeCustomerId = stripeCustomer.id;
      }

      const updateUser = fql`
          users.byId(${user.data.id})?.update({
              stripe_customer_id: ${stripeCustomerId}
          })
        `;

      await fauna.query(updateUser);

      const stripeCheckoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer: stripeCustomerId,
        billing_address_collection: "required",
        line_items: [{ price: "price_1R2C5vLgFrCu8AcgJdvKLkiR", quantity: 1 }],
        mode: "subscription",
        allow_promotion_codes: true,
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_CANCEL_URL,
      });

      return res.status(200).json({ sessionId: stripeCheckoutSession.id });
    } else {
      return;
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
