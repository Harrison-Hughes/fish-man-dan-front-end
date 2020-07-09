import { API_ROOT, HEADERS, HEADERS_AUTH } from "./constants";

const jsonify = (resp) => {
  if (resp.ok) {
    return resp.json();
  } else {
    throw resp.json();
  }
};

const handleUserResponse = (user) => {
  if (user.token) {
    localStorage.fishManDanToken = user.token;
  }
  return user;
};

const signin = (user) =>
  fetch(`${API_ROOT}/login`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ user }),
  })
    .then(jsonify)
    .then(handleUserResponse);

const signup = (user) =>
  fetch(`${API_ROOT}/signup`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ user }),
  })
    .then(jsonify)
    .then(handleUserResponse);

const validate = () =>
  fetch(`${API_ROOT}/validate`, {
    method: "GET",
    headers: HEADERS_AUTH,
  })
    .then(jsonify)
    .then(handleUserResponse);

export default {
  signin,
  signup,
  validate,
  hasToken: !!localStorage.fishManDanToken,
  clearToken: () => localStorage.removeItem("fishManDanToken"),
};
