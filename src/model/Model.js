class Model {
  constructor(entityName) {
    this.entityName = entityName;
    this.baseUrl = "https://jzy63j5wn5.sse.codesandbox.io/";
  }

  getEntityName() {
    return this.entityName;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  createObject(object) {
    return fetch(this.baseUrl + this.entityName, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ object: object })
    });
  }

  getObject(id) {
    return fetch(this.baseUrl + this.entityName + "/" + id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  }

  updateObject(id, object) {
    console.log("Update object: " + this.entityName + " - " + id + " " + JSON.stringify({ object: object }));

    return fetch(this.baseUrl + this.entityName + "/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ object: object })
    }).then(response => response.json());
  }

  deleteObject(id) {
    return fetch(this.baseUrl + this.entityName + "/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  }

  searchObject(object) {
    return fetch(this.baseUrl + this.entityName, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  }
}

export default Model;
