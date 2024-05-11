import { getAPIConfig } from "../config";

// export const getTodo = () => {
//     return getAPIConfig()
//         .then((config) => {
//             return fetch(`${config.API.endpoints[0].endpoint}todos`)
//                 .then((res) => res.json())
//                 .then((json) => {
//                     return { json };
//                 });
//         });
// };

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

export const getReviews = (reviewerName: string, movieId: string) => {
  return getAPIConfig()
    .then((config) => {
      return fetch(`${config.API.endpoints[0].endpoint}reviews/${reviewerName}/${movieId}`)
        .then((res) => res.json())
        .then((json) => {
          return { json };
        });
    });
};

export const getReviews2 = () => {
  return getAPIConfig()
    .then((config) => {
      return fetch(`${config.API.endpoints[0].endpoint}reviews2`)
        .then((res) => res.json())
        .catch((error) => {
          console.error('Error fetching reviews:', error);
          return null; // Return null in case of an error
        });
    });
};
