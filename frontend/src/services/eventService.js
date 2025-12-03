import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getEvents = async (params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/events/getEvents`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/events/${id}/packages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};
