export const sendNewCommentToAPI = async (id_post, message) => {
  try {
    let commentSentJson = await fetch(
      `http://localhost:3000/api/auth/posts/${id_post}/comments`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          message: message,
        }),
      }
    );
    let reponse = await commentSentJson.json();
    if (reponse.error) {
      return reponse.error;
    }
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};

export const requestAllCommentsFromAPI = async (id_post) => {
  try {
    let commentGetJson = await fetch(
      `http://localhost:3000/api/auth/posts/${id_post}/comments`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    let reponse = await commentGetJson.json();
    if (reponse.error) {
      return reponse.error;
    }
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};
