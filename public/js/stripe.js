import axios from "axios";
import { showAlert } from "./alerts";
const stripe = Stripe(
  "pk_test_51KDxriLb2aCWH5bw5LLwxaRFXZddjQJg2ZFYAzM3McOmd1KpzWn5XXMdqPBMnPyT6QY8v3uoGVdygHbeMA6DQFGH003bAKk4cw"
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios({
      method: "GET",
      url: `/api/v1/bookings/checkout-session/${tourId}`,
    });

    // console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });

    // if (res.data.status === "success") {
    //   showAlert("success", "Logged in!");
    //   window.setTimeout(() => {
    //     location.assign("/");
    //   }, 1500);
    // }
    //console.log(res);
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
