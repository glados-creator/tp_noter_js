import Page_comp from "../componants/Page_comp.js";

export default class Preset_page extends Page_comp {
    async render() {
        return `
            <h1>Preset</h1>
            <p>Page de preset</p>
        `;
    }
}