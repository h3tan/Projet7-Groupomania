export const sendLikeToAPI = async (idPost, idUser) => {
  try {
    let postJson = await fetch(
      `http://localhost:3000/api/auth/posts/${idPost}/likes/${idUser}`,
      {
        mode: "cors",
        method: "PUT",
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

export const getLikeFromAPI = async (idPost, idUser) => {
  try {
    let postJson = await fetch(
      `http://localhost:3000/api/auth/posts/${idPost}/likes/${idUser}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    let reponse = await postJson.json();
    return reponse;
  } catch (err) {
    let message = "Impossible de trouver l'API";
    throw new Error(message);
  }
};
