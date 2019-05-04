class Model {
  constructor(entityName) {
    this.entityName = entityName;
    this.baseUrl = "https://v6xjpo2k1l.sse.codesandbox.io/";
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
    return fetch(this.baseUrl + this.entityName + this.querystring(object), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }      
    }).then(response => response.json());
  }

  querystring(query = {}) {
    // get array of key value pairs ([[k1, v1], [k2, v2]])
    const qs = Object.entries(query)
      // filter pairs with undefined value
      .filter(pair => pair[1] !== undefined)
      // encode keys and values, remove the value if it is null, but leave the key
      .map(pair =>
        pair
          .filter(i => i !== null)
          .map(encodeURIComponent)
          .join("=")
      )
      .join("&");

    return qs && "?" + qs;
  }
}

export default Model;
