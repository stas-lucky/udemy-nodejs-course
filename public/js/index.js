import "@babel/polyfill";

import { displayMap } from "./mapbox";
import { login, logout } from "./login";
import { updateData, updatePassword } from "./updateSettings";

console.log("Hello from parcel!");

// Elements
const mapBox = document.getElementById("map");
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector(".nav__el--logout");
const userDataForm = document.querySelector(".form-user-data");
const userSettingsForm = document.querySelector(".form-user-settings");

// Values

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    await login(email, password);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener("click", logout);
}

if (userDataForm) {
  userDataForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    await updateData(name, email);
  });
}

if (userSettingsForm) {
  userSettingsForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.querySelector(".btn--save-password").textContent = "Updating...";

    const currentPassword = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;

    await updatePassword(currentPassword, password, passwordConfirm);

    document.querySelector(".btn--save-password").textContent = "Save password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
  });
}
