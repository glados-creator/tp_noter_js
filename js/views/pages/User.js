import Page_comp from "../componants/Page_comp.js";

export default class User extends Page_comp {
    async render() {
        return Page_comp.renderPage(() => `
      <section class="main-content">
        <h1>User Profile</h1>
        <p>Here you can manage your user profile and settings.</p>
        
        <label for="name">Name</label>
        <input type="text"id="name" name="name" required minlength="4" maxlength="8" size="10" />

        <label for="password">password</label>
        <input type="text" id="password" name="password" required minlength="4"  size="10" />

        <button class="sauvegarder" type="button">sauvegarder</button>
      </section>
    `);
    }
}
