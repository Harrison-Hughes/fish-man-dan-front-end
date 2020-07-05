const BASE_URL = "localhost:3000";
export const API_ROOT = `http://${BASE_URL}`;
export const HEADERS = {
  "Content-Type": "application/json",
};
export const HEADERS_AUTH = {
  "Content-Type": "application/json",
  Authorisation: localStorage.fishManDanToken,
};
