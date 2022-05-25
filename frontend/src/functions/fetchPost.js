/* export const sendPost = async (userId, title, text, picture) => {
  try {
    let postJson = await fetch("http://localhost:3000/api/auth/posts", {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        userId: userId,
        title: title,
        text: text,
        picture: picture,
      }),
    });
    let reponse = await postJson.json();
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
}; */

export const sendNewPostToAPI = async (userId, title, text, picture) => {
  try {
    let formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("text", text);
    formData.append("file", picture); // clé 'file' doit correspondre au single('file') du middleware multer-config dans le backend
    let postInfosSentJson = await fetch(
      `http://localhost:3000/api/auth/posts/`,
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      }
    );
    let reponse = await postInfosSentJson.json();
    if (reponse.error) {
      return reponse.error;
    }
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};

export const getAllPostsFromAPI = async () => {
  try {
    let postsJson = await fetch("http://localhost:3000/api/auth/posts", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    let reponse = await postsJson.json();
    return reponse;
  } catch (err) {
    let message = "Impossible de trouver l'API";
    throw new Error(message);
  }
};

export const getPostFromAPI = async (idPost) => {
  try {
    let postJson = await fetch(
      `http://localhost:3000/api/auth/posts/${idPost}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    let reponse = await postJson.json();
    return reponse;
  } catch (err) {
    let message = "Impossible de trouver l'API";
    throw new Error(message);
  }
};

export const requestUpdatePostFromAPI = async (idPost, title, text) => {
  try {
    let postJson = await fetch(
      `http://localhost:3000/api/auth/posts/${idPost}`,
      {
        mode: "cors",
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: title,
          text: text,
        }),
      }
    );
    let reponse = await postJson.json();
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};

export const requestDeletePostFromAPI = async (idPost) => {
  try {
    let postJson = await fetch(
      `http://localhost:3000/api/auth/posts/${idPost}`,
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
