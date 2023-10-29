import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39382109-d071ce59cf94359f9a44c3b97';

export const fetchPhotos = async (newQuery, currentPage) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: newQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: 12,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
