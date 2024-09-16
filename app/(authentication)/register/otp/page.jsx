"use client";

import useUserStore from '@/app/store/user/userStore';
import instance from '@/axiosInstance';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';

export default function OtpPage() {
  const setEmailInStore = useUserStore((state) => state.setEmail);

  const router = useRouter();
  const { email } = useUserStore();
  const { data: session } = useSession();
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timer, setTimer] = useState(() => {
    const savedTime = localStorage.getItem('otp-timer');
    return savedTime ? parseInt(savedTime, 10) : 60;
  });
  const [otpExpired, setOtpExpired] = useState(false);

  // Function to clear OTP in the backend
  const clearOtp = useCallback(async () => {
    try {
      await instance.post('/api/user/register/clearotp', { email });
      console.log('OTP cleared in the database');
    } catch (error) {
      console.error('Error clearing OTP:', error);
      // Handle error (e.g., show error message to the user)
    }
  }, [email]);

  // Handle OTP expiration and countdown timer
  useEffect(() => {
    if (timer === 0) {
      setOtpExpired(true);
      clearOtp(); // Call function to clear OTP in the backend
      localStorage.removeItem('otp-timer');
      return;
    }

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          const newTime = prevTimer - 1;
          localStorage.setItem('otp-timer', newTime);
          return newTime;
        } else {
          clearInterval(interval);
          setOtpExpired(true);
          clearOtp(); // Call function to clear OTP in the backend
          localStorage.removeItem('otp-timer');
          return prevTimer;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, clearOtp]);

  // Handle OTP input changes
  const handleChange = (e, index) => {
    if (isNaN(e.target.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    if (e.target.nextSibling && e.target.value !== '') {
      e.target.nextSibling.focus();
    }
  };

  // Handle key down events for OTP input fields
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        if (e.target.previousSibling) {
          e.target.previousSibling.focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  // Request a new OTP code
  const requestNewCode = async () => {
    try {
      const res = await instance.post('/api/user/register/generateotp', { email });
      console.log('New code requested successfully:', res.data);
      setTimer(60);
      setOtpExpired(false);
      localStorage.setItem('otp-timer', 60);
    } catch (error) {
      console.error('Error requesting new code:', error);
      // Handle error (e.g., show error message to the user)
    }
  };

  // Submit the OTP for verification
  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpString = otp.join(''); // Combine the OTP array into a single string

    try {
      const res = await instance.post('/api/user/register/verifyotp', { otp: otpString, email });

      // Handle the response from the server
      if (res.status === 200) {
        console.log('OTP verified successfully');
        setEmailInStore('');
        router.push('/');
      } else {
        console.log('Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Verify Your Code</h1>
        <p className="text-gray-500 mb-6">
          We&apos;ve sent a 6-digit code to your phone number ending in XXXX. Enter the code below to verify your identity.
        </p>
        <p>{session?.email}</p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={data}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-8 py-2 px-4 bg-blue-500 text-white font-bold rounded-md transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Verify
          </button>
        </form>

        {timer > 0 && (
          <p className="text-gray-500 mt-4">Time remaining: {timer} seconds</p>
        )}

        {otpExpired && (
          <p className="text-red-500 mt-4">
            OTP has expired. Please{' '}
            <button
              onClick={requestNewCode}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              request a new code
            </button>
            .
          </p>
        )}
      </div>
    </div>
  );
}
