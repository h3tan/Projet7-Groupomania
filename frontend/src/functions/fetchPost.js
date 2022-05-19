export const sendPost = async (title, text) => {
  try {
    let postJson = await fetch("http://localhost:3000/api/auth/post", {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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
