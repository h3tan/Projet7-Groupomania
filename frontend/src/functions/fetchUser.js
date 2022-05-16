export const sendLoginForm = async (nickname, password) => {
  document.getElementById("loginresult").textContent = "";
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
    if (reponse.error) {
      document.getElementById("loginresult").textContent = reponse.error;
      return;
    }
    localStorage.clear();
    localStorage.setItem("userId", reponse.userId);
    localStorage.setItem("token", reponse.token);
    document.getElementById("loginresult").style.color = "green";
    document.getElementById("loginresult").textContent = "Connecté";
    setTimeout(() => location.reload(), 2000);
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
    setTimeout(() => location.reload(), 2000);
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};
