import Model from "./Model.js";

class UserModel extends Model {
  constructor() {
    super("user");
  }

  login(user) {
    return fetch(this.getBaseUrl() + this.getEntityName() + "/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: user })
    }).then(response => response.json());
  }
}

export default UserModel;
