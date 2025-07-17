import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PAYMENT_API_END_POINT } from '../../utlis/apiEndPoints';
import Loading from '../../components/Loading';

function PaymentHistory() {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(
          `${PAYMENT_API_END_POINT}/get-member-payment`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setPaymentHistory(res.data.paymentHistory);
        }
      } catch (error) {
        console.error("Error fetching payment history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">My Payment History</h2>

      {paymentHistory?.length === 0 ? (
        <p className="text-center text-gray-500 italic">No payment found.</p>
      ) : (
        <div className="space-y-6">
          {paymentHistory.map((payment) => (
            <div
              key={payment?._id}
              className="p-6 border-2 border-favone rounded-md shadow-md bg-white"
            >
              <p className="mb-2">
                <strong>Rent:</strong> ${payment?.paymentAmount}
              </p>
              {
                payment?.coupon && <div>
                  <p className="mb-2">
                <strong>Pay after discount:</strong> ${payment?.discountPay}
              </p>
              
              <p className="mb-2">
                <strong>Applyed Coupon code:</strong> {payment?.coupon?.code}
              </p>
                </div> 
              }
              <p className="mb-2">
                <strong>Month :</strong> {payment?.month}
              </p>
              <p className="mb-2">
                <strong>Paid at:</strong> {new Date(payment?.createdAt).toLocaleString()}
              </p>

              <div className="mt-4 p-4 border-2 border-gray-300 rounded bg-gray-50">
                <h4 className=" font-semibold mb-3 text-lg">Apartment Details:</h4>
                    <div className='flex flex-col sm:flex-row justify-center gap-3 items-center'>
                    <div className=''>
                     <p><span className='font-bold '>ID:</span> {payment?.agreementFor?._id}</p>
                <p><span className='font-bold '>Block:</span> {payment?.agreementFor?.block}</p>
                <p><span className='font-bold '>Floor:</span> {payment?.agreementFor?.floor}</p>
                <p><span className='font-bold '>Apartment No:</span> {payment?.agreementFor?.apartmentNo}</p>
                <p><span className='font-bold '>Rent:</span> ${payment?.agreementFor?.rent}</p>
                <p><span className='font-bold '>Available:</span> {payment?.agreementFor?.available ? "Yes" : "No"}</p>
                     </div>
                     <img className='rounded-md object-cover h-64 w-96' src={payment?.agreementFor?.image} alt="" />
                    </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PaymentHistory;
