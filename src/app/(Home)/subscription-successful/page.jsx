// 'use client'
// import CustomContainer from '@/components/ui/CustomContainer'
// import Heading from '@/components/ui/Heading';
// import React from 'react'
// import { AiFillCheckCircle } from "react-icons/ai";
// import { useSearchParams } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import { useVerifyPaymentMutation } from '@/redux/api/subscriptionApi';
// import toast from 'react-hot-toast';

// export default function page() {

//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get('session_id');
//   const userId = useSelector((state) => state.user?.userId || null)
//   const paymentId = useSelector((state) => state.user?.paymentId || null)

//   const [verifyPayment] = useVerifyPaymentMutation();

//   // console.log('session: ', sessionId)
//   // console.log('session user: ', userId)
//   // console.log('session pay: ', paymentId)

//   const payload = {
//     userId: userId,
//     paymentId: paymentId,
//     sessionId: sessionId
//   }

//   verifyPayment(payload)
//     .unwrap()
//       .then((res) => {
//         toast.success("Payment verification successful!")
//       })
//       .catch((err) => {
//         console.log('error:', err)
//         toast.error("Verification failed!")
//       })

//   return (
//     <div>
//       <CustomContainer>
//         <div className='flex flex-col gap-8 justify-center items-center'>
//            <div className='text-8xl text-green-600'>
//              <AiFillCheckCircle />
//            </div>

//             <Heading text="Subscription Successful!"/>
//         </div>
//       </CustomContainer>
//     </div>
//   )
// }

'use client'
import CustomContainer from '@/components/ui/CustomContainer'
import Heading from '@/components/ui/Heading';
import React, { useEffect, useRef } from 'react'
import { AiFillCheckCircle } from "react-icons/ai";
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useVerifyPaymentMutation } from '@/redux/api/subscriptionApi';
import toast from 'react-hot-toast';
import { clearPaymentId, clearUserId } from '@/redux/auth/userSlice';
import { useRouter } from 'next/navigation';

export default function page() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const dispatch = useDispatch();
  const router = useRouter();
  const userId = useSelector((state) => state.user?.userId || null);
  const paymentId = useSelector((state) => state.user?.paymentId || null);

  const [verifyPayment, { isLoading }] = useVerifyPaymentMutation();

  // ensure we only call the verify once
  const calledRef = useRef(false);

  useEffect(() => {
    // only call when we have sessionId and userId/paymentId and haven't called yet
    if (!sessionId || !userId || !paymentId) return;
    if (calledRef.current) return;

    calledRef.current = true;

    const payload = {
      userId,
      paymentId,
      sessionId
    };

    verifyPayment(payload)
      .unwrap()
      .then((res) => {
        toast.success("Payment verification successful!");
        dispatch(clearUserId);
        dispatch(clearPaymentId);

      })
      .catch((err) => {
        console.error('verifyPayment error:', err);
        router.push('/subscription-cancel');
        // toast.error("Verification failed!");
      });
  }, [sessionId, userId, paymentId, verifyPayment]);

  return (
    <div>
      <CustomContainer>
        <div className='flex flex-col gap-8 justify-center items-center'>
          <div className='text-8xl text-green-600'>
            <AiFillCheckCircle />
          </div>

          <Heading text="Subscription Successful!" />
        </div>
      </CustomContainer>
    </div>
  );
}
