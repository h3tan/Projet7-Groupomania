export const sendLoginForm = async (email, password) => {
  try {
    let loginFormJson = await fetch("http://localhost:3000/api/auth/login", {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${email}`,
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

export const sendSignUpForm = async (
  nickname,
  lastName,
  firstName,
  email,
  password
) => {
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
        lastName: `${lastName}`,
        firstName: `${firstName}`,
        email: `${email}`,
        password: `${password}`,
      }),
    });
    let reponse = await signUpFormJson.json();
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};

export const requestAllUsersInfos = async () => {
  try {
    let userInfosJson = await fetch(`http://localhost:3000/api/auth/users/`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
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

export const requestUserInfos = async (id) => {
  try {
    let userInfosJson = await fetch(
      `http://localhost:3000/api/auth/users/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
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

export const requestAnotherUserInfosFromAPI = async (nickname) => {
  try {
    let userInfosJson = await fetch(
      `http://localhost:3000/api/auth/users/nickname/${nickname}`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
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

export const requestUpdateUserFromAPI = async (id, last_name, first_name) => {
  try {
    let postJson = await fetch(`http://localhost:3000/api/auth/users/${id}`, {
      mode: "cors",
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        last_name: last_name,
        first_name: first_name,
      }),
    });
    let reponse = await postJson.json();
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};

export const requestUpdatePasswordFromAPI = async (
  id_user,
  actualPassword,
  newPassword
) => {
  try {
    let postJson = await fetch(
      `http://localhost:3000/api/auth/users/${id_user}/password`,
      {
        mode: "cors",
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          id_user: id_user,
          actualPassword: actualPassword,
          newPassword: newPassword,
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

export const requestDeleteUserFromAPI = async (id) => {
  try {
    let userInfosJson = await fetch(
      `http://localhost:3000/api/auth/users/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
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
      `http://localhost:3000/api/auth/users/${id}/avatar`,
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

export const userLogged = () => {
  return localStorage.length != 0;
};
