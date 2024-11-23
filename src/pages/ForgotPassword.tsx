import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { forgotPassword as apiForgotPassword } from "../api/controllers/auth";

import FormRow from "../ui/FormRow";
import RippleLoader from "../ui/RippleLoader";

type tFormValues = {
  email: string;
};

export default function ForgotPassword() {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<tFormValues>();

  const { isPending: loading, mutate: forgotPassword } = useMutation({
    mutationFn: apiForgotPassword,
    onSuccess() {
      toast.success("An OTP has been sent to your email for password reset");
      navigate("/reset-password");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  function onSubmit(payload: tFormValues) {
    forgotPassword(payload);
  }

  return (
    <main className="auth">
      <div className="auth__header">
        <h2 className="auth__heading">Forgot Password</h2>
        <p className="auth__sub-heading">
          Don't worry we would help you recover your account
        </p>
      </div>
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
        <button className="button mt-xs" disabled={loading}>
          {loading ? <RippleLoader /> : "Continue"}
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
