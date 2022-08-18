const loginAction = async ({ username, password }) => {
  const url = `${process.env.REACT_APP_API_PROD}/auth/login`;
  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  };

  try {
    const res = await fetch(url, settings);
    const data = await res.json();

    if (data.error) return false;

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("username", data.username);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const logoutAction = () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const registerAction = async ({ username, password, securityKey }) => {
  const url = `${process.env.REACT_APP_API_PROD}/users/register`;
  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, securityKey }),
  };

  try {
    const res = await fetch(url, settings);
    const data = await res.json();

    if (data.error) return false;

    loginAction({
      username,
      password,
    });
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { loginAction, logoutAction, registerAction };
