export const getLikeFromAPI = async (id_post) => {
  try {
    let postJson = await fetch(
      `http://localhost:3000/api/auth/posts/${id_post}/likes/`,
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    let reponse = await postJson.json();
    return reponse;
  } catch (err) {
    let message = "Impossible de trouver l'API";
    throw new Error(message);
  }
};

export const requestDeleteLikeFromAPI = async (id_post) => {
  try {
    let postJson = await fetch(
      `http://localhost:3000/api/auth/posts/${id_post}/likes/`,
      {
        mode: "cors",
        method: "DELETE",
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    let reponse = await postJson.json();
    return reponse;
  } catch (err) {
    let message = "Impossible de trouver l'API";
    throw new Error(message);
  }
};

export const requestInsertLikeFromAPI = async (id_post) => {
  try {
    let postJson = await fetch(
      `http://localhost:3000/api/auth/posts/${id_post}/likes/`,
      {
        mode: "cors",
        method: "POST",
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    let reponse = await postJson.json();
    return reponse;
  } catch (err) {
    let message = "Impossible de trouver l'API";
    throw new Error(message);
  }
};
