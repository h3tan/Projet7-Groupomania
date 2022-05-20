export const sendPost = async (title, text) => {
  try {
    let postJson = await fetch("http://localhost:3000/api/auth/post", {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        text: text,
      }),
    });
    let reponse = await postJson.json();
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};

export const getAllPostsFromAPI = async () => {
  try {
    let postsJson = await fetch("http://localhost:3000/api/auth/post", {
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
      `http://localhost:3000/api/auth/post/${idPost}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    let reponse = await postJson.json();
    return reponse;
  } catch (err) {
    let message = "Impossible de trouver l'API";
    throw new Error(message);
  }
};
