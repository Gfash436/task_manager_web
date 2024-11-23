import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { login as apiLogin } from "../api/controllers/auth";

import RippleLoader from "../ui/RippleLoader";
import FormRow from "../ui/FormRow";

type tFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<tFormValues>();

  const [showPassword, setShowPassword] = useState(false);

  const { isPending: loading, mutate: login } = useMutation({
    mutationFn: apiLogin,
    onSuccess() {
      toast.success("You are logged in successfully. Redirecting...");

      window.setTimeout(function () {
        window.location.assign("/");
      }, 2000);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  function onSubmit(payload: tFormValues) {
    login(payload);
  }

  return (
    <main className="auth">
      <div className="auth__header">
        <h2 className="auth__heading">Login</h2>
        <p className="auth__sub-heading">Hi, Welcome back 👋</p>
      </div>
      <div className="auth__oauth">
        <button
          onClick={() => toast("Login with google is not available for now")}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
              fill="#FFC107"
            ></path>
            <path
              d="M3.15308 7.3455L6.43858 9.755C7.32758 7.554 9.48058 6 12.0001 6C13.5296 6 14.9211 6.577 15.9806 7.5195L18.8091 4.691C17.0231 3.0265 14.6341 2 12.0001 2C8.15908 2 4.82808 4.1685 3.15308 7.3455Z"
              fill="#FF3D00"
            ></path>
            <path
              d="M11.9999 22.0003C14.5829 22.0003 16.9299 21.0118 18.7044 19.4043L15.6094 16.7853C14.5717 17.5745 13.3036 18.0014 11.9999 18.0003C9.39891 18.0003 7.19041 16.3418 6.35841 14.0273L3.09741 16.5398C4.75241 19.7783 8.11341 22.0003 11.9999 22.0003Z"
              fill="#4CAF50"
            ></path>
            <path
              d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
              fill="#1976D2"
            ></path>
          </svg>{" "}
          Login with Google
        </button>
      </div>
      <div className="auth__or">or Login with Email</div>
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        <FormRow error={errors.email?.message}>
          <label htmlFor="email" className="flabel">
            Email
          </label>
          <input
            type="email"
            placeholder="e.g alley@example.com"
            className="input"
            id="email"
            disabled={loading}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Provide a valid email address",
              },
            })}
          />
        </FormRow>
        <FormRow error={errors.password?.message}>
          <label htmlFor="password" className="flabel">
            Password
          </label>
          <div className="iwrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="input"
              id="password"
              disabled={loading}
              {...register("password", {
                required: "This field is required",
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
        <div className="text-right">
          <Link to="/forgot-password" className="link">
            Forgot Password?
          </Link>
        </div>
        <button className="button mt-xs" disabled={loading}>
          {loading ? <RippleLoader /> : "Login"}
        </button>
      </form>
      <div className="auth__footer text-center">
        Not registered yet?{" "}
        <Link to="/sign-up" className="link">
          Create an account
        </Link>
      </div>
    </main>
  );
}
