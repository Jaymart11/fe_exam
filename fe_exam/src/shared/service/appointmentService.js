import { ENDPOINTS } from "../constants/ENDPOINTS";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchAppointment = async () => {
  const response = await api.get(ENDPOINTS.APPOINTMENT);
  return response.data;
};

export const fetchSingleAppointment = async (id) => {
  const response = await api.get(`${ENDPOINTS.APPOINTMENT}/${id}`);
  return response.data;
};

export const createAppointment = async (appointmentData) => {
  try {
    const response = await api.post(ENDPOINTS.APPOINTMENT, appointmentData);
    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

export const updateAppointment = async (updateAppointmentData) => {
  try {
    const response = await api.put(
      `${ENDPOINTS.APPOINTMENT}/${updateAppointmentData.id}`,
      updateAppointmentData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw error;
  }
};

export const deleteAppointment = async (id) => {
  try {
    const response = await api.delete(`${ENDPOINTS.APPOINTMENT}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete appointment");
  }
};
