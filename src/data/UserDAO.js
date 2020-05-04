import { getRequestData } from "../utils/Httputils";
export class UserDAO {
  constructor(email, password = "password", resetDefaultPwd = 1, username) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.resetDefaultPwd = resetDefaultPwd;
  }
  getUsers() {
    return getRequestData("/api/users")
      .then((data) => {
        // console.log("data- ", data); // JSON data parsed by `response.json()` call
        return data;
      })
      .catch((error) => {
        // console.error("Error:", error);
        return error;
      });
  }
  getUser(username) {
    return getRequestData(`/api/user/${username}`, "GET").then((data) => {
      // console.log(data); // JSON data parsed by `response.json()` call
      return data;
    });
  }
  createUser({ username, password = "password", email, resetPassword = 1 }) {
    return getRequestData("/api/user", "POST", {
      username,
      password,
      email,
      resetPassword,
    })
      .then((data) => {
        console.log(data); // JSON data parsed by `response.json()` call
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  resetPassword(password) {
    return getRequestData("/api/user", "PUT", {
      password,
      resetDefaultPwd: 0,
    })
      .then((data) => {
        console.log(data); // JSON data parsed by `response.json()` call
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  changeEmail(email) {
    return getRequestData("/api/user", "PUT", {
      email,
    })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
