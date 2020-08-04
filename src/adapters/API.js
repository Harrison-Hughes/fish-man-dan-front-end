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
    .then((r) => {
      console.log(r);
      return r;
    })
    .then(handleUserResponse)
    .catch((r) => {
      console.log("APIcatch", r);
      return r;
    });

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

const getItems = () =>
  fetch(`${API_ROOT}/items`, {
    method: "GET",
    headers: HEADERS_AUTH,
  }).then(jsonify);

const newAddress = (address) =>
  fetch(`${API_ROOT}/addresses`, {
    method: "POST",
    headers: HEADERS_AUTH,
    body: JSON.stringify({ address }),
  })
    .then(jsonify)
    .then(handleUserResponse);

export default {
  signin,
  signup,
  validate,
  getItems,
  newAddress,
  hasToken: !!localStorage.fishManDanToken,
  clearToken: () => localStorage.removeItem("fishManDanToken"),
};
