import Stripe from "stripe";
import { version } from "../../package.json";

export const stripe = new Stripe(
  process.env.STRIPE_API_KEY ? process.env.STRIPE_API_KEY : "key-stripe-api",
  {
    apiVersion: "2025-02-24.acacia",
    appInfo: {
      name: "MvNews",
      version,
    },
  }
);
