import Page_comp from "../componants/Page_comp.js";
import Personnage_cg from "../../model/personnage_cg.js";
import Selector_Comp from "../componants/selector_comp.js";
import Calculator_comp from "../componants/calculator_comp.js";


export default class Comparaison_page extends Page_comp {
    async render() {
        let characters = JSON.parse(localStorage.getItem('characters')) || [];
        
        return Page_comp.renderPage(() => `
            <h1>Comparaison</h1>
            <p>Page de comparaison</p>
        `);
    }
}