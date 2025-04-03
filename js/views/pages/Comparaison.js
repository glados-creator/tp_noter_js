import Page_comp from "../componants/Page_comp.js";
import Personnage_cg from "../../model/personnage_cg.js";
import Selector_Comp from "../componants/selector_comp.js";
import Calculator_comp from "../componants/calculator_comp.js";
import PersonnageViewComp from "../componants/personnage_view_comp.js";

export default class Comparaison_page extends Page_comp {
    async render() {
        let characters = JSON.parse(localStorage.getItem('characters')) || [];
        let perso1 = characters.find(char => char.name === "perso1") || new Personnage_cg();
        let perso2 = characters.find(char => char.name === "perso2") || new Personnage_cg();

        return Page_comp.renderPage(() => `
            <h1>Comparaison</h1>
            <p>Page de comparaison</p>
            <div class="equipment-selectors">
                <div>Helmet: ${new Selector_Comp(["helmet"]).render()}</div>
                <div>Chestpiece: ${new Selector_Comp(["chestpiece"]).render()}</div>
                <div>Pants: ${new Selector_Comp(["pants"]).render()}</div>
                <div>Boots: ${new Selector_Comp(["boots"]).render()}</div>
                <div>Gloves: ${new Selector_Comp(["gloves"]).render()}</div>
                <div>Necklace: ${new Selector_Comp(["necklace"]).render()}</div>
                <div>Ring: ${new Selector_Comp(["ring"]).render()}</div>
            </div>
            <div class="character-views">
                <div>${perso1 ? new PersonnageViewComp(perso1).render() : '<button>+</button>'}</div>
                <div>${perso2 ? new PersonnageViewComp(perso2).render() : '<button>+</button>'}</div>
            </div>
            <table>
                <tr>
                    <th>Weapons</th>
                    <td>${new Selector_Comp(["Weapons"]).render(perso1)}</td>
                    <td>${new Selector_Comp(["Weapons"]).render(perso2)}</td>
                </tr>
            </table>
            <div>${new Calculator_comp(perso1, perso2).render()}</div>
        `);
    }
}
