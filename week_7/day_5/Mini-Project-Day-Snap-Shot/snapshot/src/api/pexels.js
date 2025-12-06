export const fetchImages = async (query) => {
  const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

  const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=30`, {
    headers: {
      Authorization: apiKey,
    },
  });

  const data = await response.json();
  return data.photos;
};
