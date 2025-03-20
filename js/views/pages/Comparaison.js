import Page_comp from "../componants/Page_comp.js";

export default class Comparaison_page extends Page_comp {
    async render() {
        return Page_comp.renderPage(() => `
            <h1>Comparaison</h1>
            <p>Page de comparaison</p>
        `);
    }
}