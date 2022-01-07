import axios from "axios";
import { showAlert } from "./alerts";

export const login = async (email, password) => {
  //console.log(email, password);
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
    //console.log(res);
  } catch (err) {
    console.log(err.response.data);
    showAlert("error", err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    if (res.data.status === "success") {
      location.reload(true); // true forces to reload from server, not from
    }
  } catch (err) {
    showError("Error", "Erro logging our. Please try again");
  }
};
