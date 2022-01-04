import "@babel/polyfill";

import { displayMap } from "./mapbox";
import { login, logout } from "./login";
import { updateData, updatePassword } from "./updateSettings";
import { bookTour } from "./stripe";

console.log("TEST");

// Elements
const mapBox = document.getElementById("map");
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector(".nav__el--logout");
const userDataForm = document.querySelector(".form-user-data");
const userSettingsForm = document.querySelector(".form-user-settings");
const bookBtn = document.getElementById("book-tour");

// Values
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  try {
    displayMap(locations);
  } catch (err) {
    console.error("Mapbox error", err);
  }
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
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);

    console.log(form);

    for (let f of form) console.log(f);

    await updateData(form);
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

console.log("BookBtn", bookBtn);
if (bookBtn) {
  bookBtn.addEventListener("click", (e) => {
    e.target.textContent = "Processing...";
    const { tourId } = e.target.dataset;
    bookTour(tourId);
    e.target.textContent = "Book tour";
  });
}
