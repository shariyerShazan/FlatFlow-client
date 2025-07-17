// CheckoutForm.jsx
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { PAYMENT_API_END_POINT } from "../utlis/apiEndPoints";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CheckoutForm = ({
  apartment,
  onClose,
  coupon,
  selectedMonth,
  finalAmount,
  setFinalAmount,
  setDiscountPercent,
  cardError ,
  setCardError
}) => {
  const { user } = useSelector((store) => store.user);

  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        if (!selectedMonth) return;

        setProcessing(true);

        const res = await axios.post(
          `${PAYMENT_API_END_POINT}/payment`,
          {
            apartmentId: apartment._id,
            rent: apartment.rent,
            month: selectedMonth,
            coupon,
          },
          { withCredentials: true }
        );

        if (res.data.success) {
          setClientSecret(res?.data?.clientSecret);
          setFinalAmount(res?.data?.amount);
          setCardError("")
          setDiscountPercent(res?.data?.discountPercent);
          //toast(`Payable Amount: $${res?.data?.amount}`);
        } else {
          toast.error(res?.data?.message || "Failed to create payment intent");
        }
      } catch (err) {
        setCardError(err.response?.data?.message || err.message);
      } finally {
        setProcessing(false);
      }
    };

    createPaymentIntent();
  }, [apartment._id, apartment.rent, coupon, selectedMonth, setFinalAmount, setDiscountPercent]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setCardError(null);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
      setProcessing(false);
      return;
    }

    console.log("Submitting payment with clientSecret:", clientSecret);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.fullName || "Guest",
          email: user?.email || "guest@example.com",
        },
      },
    });

    console.log("Payment result:", result);

    if (result.error) {
      setCardError(result.error.message);
      setProcessing(false);
      return;
    }

    if (result.paymentIntent.status === "succeeded") {
      try {
        const saveRes = await axios.post(
          `${PAYMENT_API_END_POINT}/payment/save`,
          {
            apartmentId: apartment._id,
            rent: apartment.rent,
            discountPay: finalAmount,
            month: selectedMonth,
            coupon,
          },
          { withCredentials: true }
        );

        console.log("Save payment response:", saveRes.data);

        if (saveRes.data.success) {
          toast.success("Payment successful!");
          onClose();
        } else {
          toast.error(saveRes.data.message || "Failed to save payment");
        }
      } catch (error) {
        toast.error("Error saving payment");
        console.error(error);
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        className="border-2 border-favone rounded p-2"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {cardError && <p className="text-red-500 my-2">{cardError}</p>}

      <div className="flex justify-between items-center">
        <button
          type="submit"
          disabled={!stripe || processing || !clientSecret}
          className="btn bg-favone hover:bg-favone/80 px-6 py-2 rounded"
        >
          {processing ? (
            <div className="loading loading-spinner loading-md"></div>
          ) : (
            `Pay $${finalAmount && finalAmount}`
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setCardError(null);
            onClose();
          }}
          className="btn bg-favone hover:bg-favone/80 px-6 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
