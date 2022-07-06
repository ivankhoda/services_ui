import { useState } from "react";

export const useToken = () => {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");

    if (tokenString) {
      let userToken = JSON.parse(tokenString);
      return userToken?.data;
    }
  };

  const [token, setToken] = useState(getToken());
  console.log(token);
  const saveToken = (userToken: any) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));

    setToken(userToken.data);
  };

  return {
    setToken: saveToken,
    token,
    getToken: getToken,
  };
};
