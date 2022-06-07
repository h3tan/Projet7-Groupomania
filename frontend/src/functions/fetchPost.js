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

export const getPostFromAPI = async (id_post) => {
  try {
    let postJson = await fetch(
      `http://localhost:3000/api/auth/posts/${id_post}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    let reponse = await postJson.json();
    return reponse;
  } catch (err) {
    let message = "Impossible de trouver l'API";
    throw new Error(message);
  }
};
export const requestModifyPostPictureToAPI = async (
  id_post,
  newFile,
  oldFile
) => {
  try {
    let formData = new FormData();
    formData.append("file", newFile); // clé 'file' doit correspondre au single('file') du middleware multer-config dans le backend
    formData.append("oldfile", oldFile);
    let modifyReponseJson = await fetch(
      `http://localhost:3000/api/auth/posts/${id_post}/file`,
      {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      }
    );
    let reponse = await modifyReponseJson.json();
    if (reponse.error) {
      return reponse.error;
    }
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};

export const requestUpdatePostSameFileFromAPI = async (
  id_post,
  title,
  text
) => {
  try {
    let postJson = await fetch(
      `http://localhost:3000/api/auth/posts/${id_post}/same_file`,
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

export const requestUpdatePostFromAPI = async (
  userId,
  id_post,
  title,
  text,
  newFile,
  oldFile
) => {
  try {
    let formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("text", text);
    formData.append("file", newFile);
    formData.append("oldfile", oldFile);
    let postJson = await fetch(
      `http://localhost:3000/api/auth/posts/${id_post}`,
      {
        mode: "cors",
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      }
    );
    let reponse = await postJson.json();
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};

export const requestDeletePostFromAPI = async (id_post) => {
  try {
    let postJson = await fetch(
      `http://localhost:3000/api/auth/posts/${id_post}`,
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
