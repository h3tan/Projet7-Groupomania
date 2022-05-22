export const sendLoginForm = async (nickname, password) => {
  document.querySelector(".errorLog").textContent = "";
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
  document.getElementById("signupresult").textContent = "";
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
    let reponse = await signUpFormJson.json();
    if (reponse.error) {
      document.getElementById("signupresult").textContent = reponse.error;
      return;
    }
    document.getElementById("signupresult").style.color = "green";
    document.getElementById("signupresult").textContent =
      "Création du compte réussie";
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};

export const requestUserInfos = async (id) => {
  try {
    let userInfosJson = await fetch(
      `http://localhost:3000/api/auth/user/${id}`,
      { method: "GET" }
    );
    let reponse = await userInfosJson.json();
    if (reponse.error) {
      return reponse.error;
    }
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};

export const requestDeleteUserFromAPI = async (id) => {
  try {
    let userInfosJson = await fetch(
      `http://localhost:3000/api/auth/user/${id}`,
      { method: "DELETE" }
    );
    let reponse = await userInfosJson.json();
    if (reponse.error) {
      return reponse.error;
    }
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};

export const sendProfilePictureToAPI = async (id, newFile, oldFile) => {
  try {
    let formData = new FormData();
    formData.append("file", newFile); // clé 'file' doit correspondre au single('file') du middleware multer-config dans le backend
    formData.append("oldfile", oldFile);
    let modifyReponseJson = await fetch(
      `http://localhost:3000/api/auth/user/${id}`,
      {
        method: "PUT",
        /*         headers: {
    //Authorization: localStorage.getItem("token") ,
  }, */
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

export const userLogOut = () => {
  localStorage.clear();
  return true;
};

export const userLogged = () => {
  return localStorage.length != 0;
};
