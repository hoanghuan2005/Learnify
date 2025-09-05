import { axiosInstance } from "../lib/axios";

export const getAllEvents = async () => {
  const { data } = await axiosInstance.get("/api/events");
  return data;
};

export const getEventById = async (id) => {
  const { data } = await axiosInstance.get(`/api/events/${id}`);
  return data;
};

export const createEvent = async (eventData) => {
  const { data } = await axiosInstance.post("/api/events", eventData);
  return data;
};

export const updateEvent = async (id, eventData) => {
  const { data } = await axiosInstance.put(`/api/events/${id}`, eventData);
  return data;
};

export const deleteEvent = async (id) => {
  const { data } = await axiosInstance.delete(`/api/events/${id}`);
  return data;
};
