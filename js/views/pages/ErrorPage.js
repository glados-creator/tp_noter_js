import Page_comp from "../componants/Page_comp.js";

export default class ErrorPage extends Page_comp {
    async render() {
        return Page_comp.renderPage(() => `
      <section class="main-content">
        <h1>ERROR Route</h1>
        <p>Sorry, something went wrong!</p>
      </section>
    `);
    }
}
