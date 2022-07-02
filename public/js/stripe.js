/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51LEHJEJvgVmTUBnp1OwxPY2h3w7KWw7k84PFwDqJ72lJnB6tnRiLsnlLEi5RKCo9XzkFazyvzu2lkeQFWFSbiCOn004Uzj500f'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout seesion form API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
        sessionId: session.data.session.id
    })

  } catch (err) {
    console.log(err)
    showAlert('error', err)
  }
};
