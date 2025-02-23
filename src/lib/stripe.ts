import Stripe from 'stripe'


// TODO: stripe implementaiton here
export const stripe = new Stripe(
  process.env.STRIPE_API_KEY as string, {
  }
)