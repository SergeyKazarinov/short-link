const BASE_URL = 'http://79.143.31.216';

const checkAnswer = (res) => {
  if(res.ok) {
    return res.json();
  }else {
    return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
  }
}

export const register = async (username, password) => {
  const res = await fetch(`${BASE_URL}/register?username=${username}&password=${password}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    },
  });
  const data = await checkAnswer(res);
  return data;
}

export const authorize = async (username, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `username=${username}&password=${password}`
  });
  const data = await checkAnswer(res);
  return data;
}

export const createLink = async (link, token) => {
  const res = await fetch(`${BASE_URL}/squeeze?link=${link}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Authorization" : `Bearer ${token}`,
    },
  });
  const data = await checkAnswer(res);
  return data;
}

export const getStat = async (token) => {
  const res = await fetch(`${BASE_URL}/statistics`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      "Authorization" : `Bearer ${token}`,
    },
  });
  const data = await checkAnswer(res);
  return data;
}

export const getCurrentStat = async (token, linksPerPage, firstLinkIndex) => {
  const res = await fetch(`${BASE_URL}/statistics?offset=${firstLinkIndex}&limit=${linksPerPage}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      "Authorization" : `Bearer ${token}`,
    },
  });
  const data = await checkAnswer(res);
  return data;
}