import axiosClient from "../axiosClient";

export const registerUser = async (userData) => {
  const response = await axiosClient.post("/auth/register", userData);

  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await axiosClient.post("/auth/login", loginData);

  return response.data;
};
