import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import Stripe from 'stripe';
import Cookies from 'js-cookie';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutPage = ({ paymentIntent }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm paymentIntent={paymentIntent} />
  </Elements>
);

export default CheckoutPage;

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<{ [key: string]: any }>
> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
    typescript: true,
  });
  let paymentIntent;

  const paymentIntentId = await Cookies.get('paymentIntentId');

  if (paymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return {
      props: {
        paymentIntent,
      },
    };
  }

  paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'usd',
  });

  Cookies.set('paymentIntentId', paymentIntent.id);

  return {
    props: {
      paymentIntent,
    },
  };
};
