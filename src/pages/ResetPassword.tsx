import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { resetPassword as apiResetPassword } from "../api/controllers/auth";

import FormRow from "../ui/FormRow";
import RippleLoader from "../ui/RippleLoader";

type tFormValues = {
  password: string;
  confirmPassword: string;
  otp: string;
};

function ResetPassword({ email }: { email: string }) {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<tFormValues>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isPending: loading, mutate: resetPassword } = useMutation({
    mutationFn: apiResetPassword,
    onSuccess() {
      toast.success(
        "Your password has been reset successfully. Login with your new password"
      );
      localStorage.removeItem("forgotPasswordEmail");
      navigate("/login");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  function onSubmit(payload: tFormValues) {
    resetPassword({ email, otp: payload.otp, password: payload.password });
  }

  return (
    <main className="auth">
      <div className="auth__header">
        <h2 className="auth__heading">Reset Password</h2>
        <p className="auth__sub-heading">
          Complete your account recovery process
        </p>
      </div>
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        <FormRow error={errors.otp?.message}>
          <label htmlFor="otp" className="flabel">
            OTP
          </label>
          <input
            type="text"
            placeholder="e.g 1234"
            className="input"
            id="otp"
            disabled={loading}
            {...register("otp", {
              required: "This field is required",
              pattern: {
                value: /^\d{4}$/,
                message: "Provide a valid 4-digit numeric pin",
              },
            })}
          />
        </FormRow>
        <FormRow error={errors.password?.message}>
          <label htmlFor="password" className="flabel">
            New Password
          </label>
          <div className="iwrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="input"
              id="password"
              disabled={loading}
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
            />
            <button
              className="iwrapper__action"
              onClick={() => setShowPassword((sp) => !sp)}
              type="button"
            >
              {showPassword ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.6 7.35373L15.83 11.1237C15.88 11.3837 15.91 11.6437 15.91 11.9137C15.91 14.0737 14.15 15.8237 12 15.8237C11.73 15.8237 11.47 15.7937 11.21 15.7437H11.2L8.02002 18.9237C9.23002 19.4137 10.58 19.7137 12 19.7137C17.4 19.7137 21.75 15.4537 21.75 11.9137C21.75 10.3937 20.94 8.74373 19.6 7.35373Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.09 11.9137C8.09 9.75374 9.84 8.00374 12 8.00374C12.76 8.00374 13.48 8.22374 14.08 8.61374L12.98 9.71374C12.68 9.57374 12.35 9.50374 12 9.50374C10.67 9.50374 9.59 10.5837 9.59 11.9137C9.59 12.2637 9.66 12.5937 9.8 12.8937L8.69 14.0037C8.31 13.4037 8.09 12.6837 8.09 11.9137ZM10.81 14.0137L14.1 10.7337L15.18 9.64374L18.48 6.35374L18.47 6.34374L20.17 4.64374C20.47 4.35374 20.47 3.87374 20.17 3.58374C19.88 3.29374 19.4 3.29374 19.11 3.58374L17.19 5.50374C15.69 4.65374 13.91 4.11374 12 4.11374C6.6 4.11374 2.25 8.38374 2.25 11.9137C2.25 13.7637 3.44 15.8137 5.35 17.3437L3.34 19.3537C3.04 19.6537 3.04 20.1237 3.34 20.4137C3.48 20.5637 3.68 20.6337 3.87 20.6337C4.06 20.6337 4.25 20.5637 4.4 20.4137L5.47 19.3537L6.6 18.2137H6.61L10.81 14.0137Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.99971 4.98972C7.89138 4.98972 6.98971 5.89138 6.98971 6.99972C6.98971 8.10805 7.89138 9.00971 8.99971 9.00971C10.108 9.00971 11.0097 8.10805 11.0097 6.99972C11.0097 5.89138 10.108 4.98972 8.99971 4.98972Z"
                    fill="currentColor"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.99971 10.26C7.20221 10.26 5.73971 8.79746 5.73971 6.99996C5.73971 5.20246 7.20221 3.73996 8.99971 3.73996C10.7972 3.73996 12.2597 5.20246 12.2597 6.99996C12.2597 8.79746 10.7972 10.26 8.99971 10.26ZM8.99971 0.498291C4.49805 0.498291 0.873047 4.05496 0.873047 6.99996C0.873047 9.94496 4.49805 13.5016 8.99971 13.5016C13.5014 13.5016 17.1264 9.94496 17.1264 6.99996C17.1264 4.05496 13.5014 0.498291 8.99971 0.498291Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>
          </div>
        </FormRow>
        <FormRow error={errors.confirmPassword?.message}>
          <label htmlFor="confirmPassword" className="flabel">
            Confirm Password
          </label>
          <div className="iwrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="input"
              id="confirmPassword"
              disabled={loading}
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  getValues().password === value || "Passwords do not match",
              })}
            />
            <button
              className="iwrapper__action"
              onClick={() => setShowConfirmPassword((sp) => !sp)}
              type="button"
            >
              {showConfirmPassword ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.6 7.35373L15.83 11.1237C15.88 11.3837 15.91 11.6437 15.91 11.9137C15.91 14.0737 14.15 15.8237 12 15.8237C11.73 15.8237 11.47 15.7937 11.21 15.7437H11.2L8.02002 18.9237C9.23002 19.4137 10.58 19.7137 12 19.7137C17.4 19.7137 21.75 15.4537 21.75 11.9137C21.75 10.3937 20.94 8.74373 19.6 7.35373Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.09 11.9137C8.09 9.75374 9.84 8.00374 12 8.00374C12.76 8.00374 13.48 8.22374 14.08 8.61374L12.98 9.71374C12.68 9.57374 12.35 9.50374 12 9.50374C10.67 9.50374 9.59 10.5837 9.59 11.9137C9.59 12.2637 9.66 12.5937 9.8 12.8937L8.69 14.0037C8.31 13.4037 8.09 12.6837 8.09 11.9137ZM10.81 14.0137L14.1 10.7337L15.18 9.64374L18.48 6.35374L18.47 6.34374L20.17 4.64374C20.47 4.35374 20.47 3.87374 20.17 3.58374C19.88 3.29374 19.4 3.29374 19.11 3.58374L17.19 5.50374C15.69 4.65374 13.91 4.11374 12 4.11374C6.6 4.11374 2.25 8.38374 2.25 11.9137C2.25 13.7637 3.44 15.8137 5.35 17.3437L3.34 19.3537C3.04 19.6537 3.04 20.1237 3.34 20.4137C3.48 20.5637 3.68 20.6337 3.87 20.6337C4.06 20.6337 4.25 20.5637 4.4 20.4137L5.47 19.3537L6.6 18.2137H6.61L10.81 14.0137Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.99971 4.98972C7.89138 4.98972 6.98971 5.89138 6.98971 6.99972C6.98971 8.10805 7.89138 9.00971 8.99971 9.00971C10.108 9.00971 11.0097 8.10805 11.0097 6.99972C11.0097 5.89138 10.108 4.98972 8.99971 4.98972Z"
                    fill="currentColor"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.99971 10.26C7.20221 10.26 5.73971 8.79746 5.73971 6.99996C5.73971 5.20246 7.20221 3.73996 8.99971 3.73996C10.7972 3.73996 12.2597 5.20246 12.2597 6.99996C12.2597 8.79746 10.7972 10.26 8.99971 10.26ZM8.99971 0.498291C4.49805 0.498291 0.873047 4.05496 0.873047 6.99996C0.873047 9.94496 4.49805 13.5016 8.99971 13.5016C13.5014 13.5016 17.1264 9.94496 17.1264 6.99996C17.1264 4.05496 13.5014 0.498291 8.99971 0.498291Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>
          </div>
        </FormRow>
        <button className="button mt-xs" disabled={loading}>
          {loading ? <RippleLoader /> : "Finish"}
        </button>
      </form>
      <div className="auth__footer text-center">
        <Link to="/login" className="link">
          Back To Login
        </Link>
      </div>
    </main>
  );
}

export default function ResetPasswordWrapper() {
  const forgotPasswordEmail = (function () {
    const email = localStorage.getItem("forgotPasswordEmail");

    if (!email) return null;

    return email;
  })();

  if (!forgotPasswordEmail) return <Navigate to="/forgot-password" replace />;

  return <ResetPassword email={forgotPasswordEmail} />;
}
