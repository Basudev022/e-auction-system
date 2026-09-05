import axiosClient from "../axiosClient";

export const getProductCategories = async () => {
  const response = await axiosClient.get("/products/categories");
  return response.data;
};
