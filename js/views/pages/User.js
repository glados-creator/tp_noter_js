import Page_comp from "../componants/Page_comp.js";

export default class User extends Page_comp {
    async render() {
        return Page_comp.renderPage(() => `
      <div class="main-contentlogs">
        <h1>User Profile</h1>
        <p>Here you can manage your user profile and settings.</p>
        
        <label for="name">Name (4 to 8 characters):</label>
        <input type="text"id="name" name="name" required minlength="4" maxlength="8" size="10" />

        <label for="name">Name (4 to 8 characters):</label>
        <input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" />

        <button class="favorite styled" type="button">Add to favorites</button>
      </div>
    `);
    }
}
