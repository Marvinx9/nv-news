import { fauna } from "@/services/fauna";
import { stripe } from "@/services/stripe";
import { fql } from "fauna";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  const userQuery = fql`
    users.user_by_stripe_customer_id(${customerId}).first()
  `;

  const userRef = await fauna.query<{ id: string }>(userQuery);

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    subId: subscription.id,
    userId: userRef.data.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
  };

  let querySubscription;
  if (createAction) {
    querySubscription = fql`
        subscriptions.create(${subscriptionData})
      `;
  } else {
    const queryResultSubscription = fql`
    subscriptions.subscription_by_subId(${subscription.id}).first()`;

    const resultSubscription = await fauna.query(queryResultSubscription);

    querySubscription = fql`
        subscriptions.byId(${resultSubscription.data.id})?.update({status: ${subscriptionData.status}})
      `;
  }

  await fauna.query(querySubscription);
}
