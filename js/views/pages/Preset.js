import Page_comp from "../componants/Page_comp.js";

export default class Preset_page extends Page_comp {
    async render() {
        return Page_comp.renderPage(() =>`


        <div class="main-contentPreset">
                    <h1>Preset</h1>
            <p>Page de preset</p>
        </div>

        `);
    }
}