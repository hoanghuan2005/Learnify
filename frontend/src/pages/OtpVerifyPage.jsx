import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "../lib/api";

const OtpVerifyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");

  useEffect(() => {
    const stateEmail = location.state?.email;
    if (stateEmail) {
      setEmail(stateEmail);
    }
  }, [location.state]);

  const { mutate, isPending, error, isSuccess, data } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      navigate("/login");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    mutate({ email, otpCode });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5">
      <div className="w-full max-w-md bg-base-100/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-primary/20">
        <h1 className="text-3xl font-bold text-center mb-2">
          Verify your email
        </h1>
        <p className="text-center opacity-70 mb-6">
          We sent a 6-digit code to {email || "your email"}.
        </p>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error.response?.data || "Invalid or expired code"}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <input
              type="text"
              className="input input-bordered"
              placeholder="Enter 6-digit code"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-full" type="submit">
            {isPending ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>{" "}
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <span>Didn’t receive the code? </span>
          <span className="font-semibold">
            Resend OTP
          </span>
        </div>

        <div className="text-center mt-4">
          <Link to="/signup" className="link link-primary">
            Back to signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtpVerifyPage;
