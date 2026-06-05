import api from "./axios";

export const getMatches = async (customerId) => {
  const response = await api.get(
    `/matches/${customerId}`
  );

  return response.data;
};

export const sendMatch = async (data) => {
  const response = await api.post(
    "/matches/send",
    data
  );

  return response.data;
};

export const getSentMatches = async (
  customerId
) => {
  const response = await api.get(
    `/matches/sent/${customerId}`
  );

  return response.data;
};