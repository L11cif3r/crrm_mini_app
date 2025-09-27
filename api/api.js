import axios from "axios";
import { Platform } from "react-native";

const API_URL ="http://192.168.1.4:3001"; // physical device or iOS simulator
// const API_URL = "http://localhost:3001"; // for web
export const getUsers = async () => {
  const res = await axios.get(`${API_URL}/users`);
  return res.data;
};

export const getCustomers = async () => {
  const res = await axios.get(`${API_URL}/customers`);
  return res.data;
};

export const getLeads = async () => {
  const res = await axios.get(`${API_URL}/leads`);
  return res.data;
};
