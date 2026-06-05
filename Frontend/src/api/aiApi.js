import api from "./axios";

export const reviewMatches = async (
  customer,
  matches
) => {
  const response = await api.post(
    "/ai/review",
    {
      customer,
      matches,
    }
  );

  return response.data;
};