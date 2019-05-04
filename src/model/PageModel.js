import Model from "./Model.js";

class PageModel extends Model {
  constructor() {
    super("page");
  }

  hierarchy() {
    return fetch(this.getBaseUrl() + "hierarchy/" + sessionStorage.getItem("userID"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  }

  get(id) {
    return super.getObject(id);
  }

  /*
  createPage(song) {
    return super.createObject({
      artist: song.artist,
      name: song.name
    });
  }

  update(id, song) {
    return super.updateObject(id, song);
  }

  search(searchObject) {
    return super.searchObject(searchObject);
  }



  delete(id) {
    return super.deleteObject(id);
  }

  */
}

export default PageModel;
