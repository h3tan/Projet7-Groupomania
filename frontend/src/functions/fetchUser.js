export const sendLoginForm = async (nickname, password) => {
  try {
    let loginFormJson = await fetch("http://localhost:3000/api/auth/login", {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: `${nickname}`,
        password: `${password}`,
      }),
    });
    let reponse = await loginFormJson.json();
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};

export const sendSignUpForm = async (nickname, email, password) => {
  try {
    let signUpFormJson = await fetch("http://localhost:3000/api/auth/signup", {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: `${nickname}`,
        email: `${email}`,
        password: `${password}`,
      }),
    });
    await signUpFormJson.json();
    alert("Création de compte réussie");
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};
