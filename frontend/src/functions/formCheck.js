export const isNicknameValid = (nickname, element) => {
  const button = document.querySelector(".formButton");
  const regex = /^[a-z ,.'-]+$/i;
  if (!regex.test(nickname)) {
    document.getElementById(element).style.background = "red";
    button.setAttribute("disabled", "true");
  } else {
    document.getElementById(element).style.background = "lightgreen";
    button.removeAttribute("disabled");
    areInputsEmpty();
  }
};

export const isLastNameValid = (lastName, element) => {
  const button = document.querySelector(".formButton");
  const regex = /^[a-z ,.'-]+$/i;
  if (!regex.test(lastName)) {
    document.getElementById(element).style.background = "red";
    button.setAttribute("disabled", "true");
  } else {
    document.getElementById(element).style.background = "lightgreen";
    button.removeAttribute("disabled");
    areInputsEmpty();
  }
};

export const isFirstNameValid = (firstName, element) => {
  const button = document.querySelector(".formButton");
  const regex = /^[a-z ,.'-]+$/i;
  if (!regex.test(firstName)) {
    document.getElementById(element).style.background = "red";
    button.setAttribute("disabled", "true");
  } else {
    document.getElementById(element).style.background = "lightgreen";
    button.removeAttribute("disabled");
    areInputsEmpty();
  }
};

export const isPasswordValid = (password, element) => {
  const button = document.querySelector(".formButton");
  //Comporte 10 caractères, 1 minuscule, 1 majuscule, 1 chiffre et un caractère spécial
  const regex = /^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
  if (!regex.test(password)) {
    document.getElementById(element).style.background = "red";
    button.setAttribute("disabled", "true");
  } else {
    document.getElementById(element).style.background = "lightgreen";
    button.removeAttribute("disabled");
    areInputsEmpty();
  }
};

// Vérifie si "email" est bien de type "email"
export const isEmailValid = (email, element) => {
  const button = document.querySelector(".formButton");
  // Permet d'utiliser
  //eslint-disable-next-line
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!regex.test(email)) {
    document.getElementById(element).style.background = "red";
    button.setAttribute("disabled", "true");
  } else {
    document.getElementById(element).style.background = "lightgreen";
    button.removeAttribute("disabled");
    areInputsEmpty();
  }
};

const areInputsEmpty = () => {
  const button = document.querySelector(".formButton");
  let inputs = document.querySelectorAll(".input_form");
  inputs.forEach((input) => {
    if (input.value == "") button.setAttribute("disabled", "true");
  });
};

// Pour formulaire du changement de mot de passe
export const isPasswordChangeValid = (password, element) => {
  const button = document.getElementById("modify_password");
  //Comporte 10 caractères, 1 minuscule, 1 majuscule, 1 chiffre et un caractère spécial
  const regex = /^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
  if (!regex.test(password)) {
    document.getElementById(element).style.background = "red";
    button.setAttribute("disabled", "true");
  } else {
    document.getElementById(element).style.background = "lightgreen";
    button.removeAttribute("disabled");
    arePasswordInputsEmpty();
  }
};

const arePasswordInputsEmpty = () => {
  const button = document.getElementById("modify_password");
  let inputs = document.querySelectorAll(".input_password");
  inputs.forEach((input) => {
    if (input.value == "") button.setAttribute("disabled", "true");
  });
};