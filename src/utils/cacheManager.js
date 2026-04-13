const TTL = 60 * 60 * 1000;

export const getCache = (key) => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  const { data, timestamp } = JSON.parse(item);
  if (Date.now() - timestamp > TTL) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
};

export const setCache = (key, data) => {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};