import apiClient from "../client";

import { tUser } from "../../app.types";
import { AxiosError } from "axios";

export async function login(payload: {
  email: string;
  password: string;
}): Promise<{ message: string; token: string; profile: tUser }> {
  try {
    const loginRes = await apiClient({
      method: "POST",
      url: "/users/login",
      data: payload,
    });

    localStorage.setItem("accessToken", loginRes.data.token);

    const profileRes = await apiClient({
      method: "GET",
      url: "/users/profile",
    });

    localStorage.setItem("userDetails", JSON.stringify(profileRes.data.user));

    return {
      message: loginRes.data.message,
      token: loginRes.data.token,
      profile: profileRes.data.user,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response ? err.response.data.message : err.message);
  }
}

export async function signUp(payload: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}): Promise<{ message: string }> {
  try {
    const res = await apiClient({
      method: "POST",
      url: "/users/register",
      data: payload,
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response ? err.response.data.message : err.message);
  }
}

export async function forgotPassword(payload: {
  email: string;
}): Promise<{ message: string }> {
  try {
    const res = await apiClient({
      method: "POST",
      url: "/users/forgot-password",
      data: payload,
    });

    localStorage.setItem("forgotPasswordEmail", payload.email);

    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response ? err.response.data.message : err.message);
  }
}

export async function resetPassword(payload: {
  email: string;
  password: string;
  otp: string;
}): Promise<{ message: string }> {
  try {
    const res = await apiClient({
      method: "POST",
      url: "/users/reset-password",
      data: payload,
    });

    localStorage.removeItem("forgotPasswordEmail");

    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response ? err.response.data.message : err.message);
  }
}
