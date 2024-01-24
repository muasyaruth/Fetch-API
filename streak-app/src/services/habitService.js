// src/services/habitService.js

const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/habits';

const getHabits = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

const addHabit = async (habit) => {
  const response = await axios.post(API_BASE_URL, habit);
  return response.data;
};

module.exports = {
  getHabits,
  addHabit,
};
