import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import Cookies from 'js-cookie';

interface CheckoutFormProps {
  paymentIntent: any;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ paymentIntent }) => {
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean | null>(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        error,
        paymentIntent: { status },
      } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) throw new Error(error.message);

      if (status === 'succeeded') {
        setCheckoutSuccess(true);
        Cookies.remove('paymentIntentId');
      }
    } catch (err) {
      alert(err.message);
      setCheckoutError(err.message);
    }
  };

  if (checkoutSuccess) return <p>Payment Successful!</p>;

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" disabled={!stripe}>
        Pay now
      </Button>
      {checkoutError && <span style={{ color: 'red' }}>{checkoutError}</span>}
    </form>
  );
};

export default CheckoutForm;
