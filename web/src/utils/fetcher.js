export const fetcher = async (key) => {
  const response = await fetch(key);
  return await response.json();
};
