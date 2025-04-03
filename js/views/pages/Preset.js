import Page_comp from "../componants/Page_comp.js";

export default class Preset_page extends Page_comp {
    async render() {
        return Page_comp.renderPage(() =>`


        <section class="main-content">
                    <h1>Preset</h1>
            <p>Page de preset</p>
        </section>

        `);
    }
}