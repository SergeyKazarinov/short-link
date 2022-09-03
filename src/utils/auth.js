const BASE_URL = 'http://79.143.31.216';

const checkAnswer = (res) => {
  if(res.ok) {
    return res.json();
  }else {
    return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
  }
}

export const register = async (username, password) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    },
    body: JSON.stringify(`?username=${username}&password=${password}`)
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
    body: JSON.stringify({username, password})
  });
  const data = await checkAnswer(res);
  return data;
}

export const getUserData = async (token) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })

  const data = await checkAnswer(res);
  return data;
}