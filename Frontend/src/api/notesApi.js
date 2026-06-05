import api from "./axios";

export const getNotes = async (customerId) => {
  const response = await api.get(
    `/notes/${customerId}`
  );

  return response.data;
};

export const addNote = async (data) => {
  const response = await api.post(
    "/notes",
    data
  );

  return response.data;
};