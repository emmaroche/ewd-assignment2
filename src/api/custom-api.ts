import { getAPIConfig } from "../config";

export const getTodo = () => {
    return getAPIConfig()
        .then((config) => {
            return fetch(`${config.API.endpoints[0].endpoint}todos`)
                .then((res) => res.json())
                .then((json) => {
                    return { json };
                });
        });
};

export const getToken = (username: string, password: string) => {
    return getAPIConfig()
      .then((config) => {
        return fetch(`${config.API.endpoints[1].endpoint}auth/signin`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        })
      })
      .then((res) => res.json())
      .then((json) => {
        return json.token;
      });
  };
