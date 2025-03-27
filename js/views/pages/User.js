import Page_comp from "../componants/Page_comp.js";

export default class User extends Page_comp {
    async render() {
        return Page_comp.renderPage(() => `
      <section class="main-content">
        <h1>User Profile</h1>
        <p>Here you can manage your user profile and settings.</p>
      </section>
    `);
    }
}
