import "@babel/polyfill";
import { displayMap } from "./mapbox";
import { login, logout } from "./login";

console.log("Hello from parcel!");

// Elements
const mapBox = document.getElementById("map");
const loginForm = document.querySelector(".form");
const logOutBtn = document.querySelector(".nav__el--logout");

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
