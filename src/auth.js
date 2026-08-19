function getToken() {
  return localStorage.getItem("token");
}

function setToken(t) {
  localStorage.setItem("token", t);
}

function clearToken() {
  localStorage.removeItem("token");
}

export { setToken, getToken, clearToken };
