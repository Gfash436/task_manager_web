import { tUser } from "../../app.types";

export default function useProfile(): tUser | null {
  const accessToken = (function () {
    const token = localStorage.getItem("accessToken");

    if (!token) return null;

    return token;
  })();

  const userDetails = (function () {
    const detailsSerialized = localStorage.getItem("userDetails");

    if (!detailsSerialized) return null;

    let details: tUser | null = null;

    try {
      details = JSON.parse(detailsSerialized);
    } catch (error) {
      // do nothing
    }

    return details;
  })();

  if (!accessToken || !userDetails) return null;

  return userDetails;
}
