import Page_comp from "../componants/Page_comp.js";
import Calculator_comp from "../componants/calculator_comp.js";

export default class Home extends Page_comp {
    async render() {
        return Page_comp.renderPage(() => `
      <section class="main-content">
        <h1>Welcome to Skyrim Calculator</h1>
        <p>Your main content goes here...</p>
        ${Calculator_comp.rendergraph()}

      </section>
    `);
    }
}
