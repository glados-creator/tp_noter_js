import Page_comp from "../componants/Page_comp.js";
import Personnage_cg from "../../model/personnage_cg.js";
import Selector_Comp from "../componants/selector_comp.js";
import Calculator_comp from "../componants/calculator_comp.js";
import PersonnageViewComp from "../componants/personnage_view_comp.js";

export default class Comparaison_page extends Page_comp {
    constructor() {
        super();
        this.perso1 = null;
        this.perso2 = null;
        this.selectors = {};
        document.addEventListener('personnageSelected', event => this.handlePersonnageSelected(event));
    }

    async render() {
        let characters = JSON.parse(localStorage.getItem('characters')) || [];
        console.log("characters",characters);
        this.perso1 = characters.find(char => char.name === "perso1") || new Personnage_cg();
        this.perso2 = characters.find(char => char.name === "perso2") || new Personnage_cg();

        this.selectors = {
            helmet: new Selector_Comp(["helmet"]),
            chestpiece: new Selector_Comp(["chestpiece"]),
            pants: new Selector_Comp(["pants"]),
            boots: new Selector_Comp(["boots"]),
            gloves: new Selector_Comp(["gloves"]),
            necklace: new Selector_Comp(["necklace"]),
            ring: new Selector_Comp(["ring"]),
            weapons: new Selector_Comp(["Weapons"])
        };

        this.updateSelectors(this.perso1, this.perso2);

        return Page_comp.renderPage(async () => `
            <h1>Comparaison</h1>
            <p>Page de comparaison</p>
            <div class="equipment-selectors">
                <div>Helmet: ${this.selectors.helmet.render()}</div>
                <div>Chestpiece: ${this.selectors.chestpiece.render()}</div>
                <div>Pants: ${this.selectors.pants.render()}</div>
                <div>Boots: ${this.selectors.boots.render()}</div>
                <div>Gloves: ${this.selectors.gloves.render()}</div>
                <div>Necklace: ${this.selectors.necklace.render()}</div>
                <div>Ring: ${this.selectors.ring.render()}</div>
            </div>
            <div class="character-views">
                <div>${await new PersonnageViewComp(this.perso1).render()}</div>
                <div>${await new PersonnageViewComp(this.perso2).render()}</div>
            </div>
            <table>
                <tr>
                    <th>Weapons</th>
                    <td>${this.selectors.weapons.render()}</td>
                    <td>${this.selectors.weapons.render()}</td>
                </tr>
            </table>
            <div>${new Calculator_comp(this.perso1, this.perso2).render()}</div>
        `);
    }

    handlePersonnageSelected(event) {
        const selectedPersonnage = event.detail;
        if (selectedPersonnage.name === "perso1") {
            this.perso1 = selectedPersonnage;
        } else if (selectedPersonnage.name === "perso2") {
            this.perso2 = selectedPersonnage;
        }
        this.updateSelectors(this.perso1, this.perso2);
        this.render();
    }

    updateSelectors(perso1, perso2) {
        this.selectors.helmet.selectedItem = perso1.equipment.helmet || null;
        this.selectors.chestpiece.selectedItem = perso1.equipment.chestpiece || null;
        this.selectors.pants.selectedItem = perso1.equipment.pants || null;
        this.selectors.boots.selectedItem = perso1.equipment.boots || null;
        this.selectors.gloves.selectedItem = perso1.equipment.gloves || null;
        this.selectors.necklace.selectedItem = perso1.equipment.necklace || null;
        this.selectors.ring.selectedItem = perso1.equipment.ring || null;
        this.selectors.weapons.selectedItem = perso1.equipment.weapons[0] || null;

        this.selectors.helmet.selectedItem = perso2.equipment.helmet || null;
        this.selectors.chestpiece.selectedItem = perso2.equipment.chestpiece || null;
        this.selectors.pants.selectedItem = perso2.equipment.pants || null;
        this.selectors.boots.selectedItem = perso2.equipment.boots || null;
        this.selectors.gloves.selectedItem = perso2.equipment.gloves || null;
        this.selectors.necklace.selectedItem = perso2.equipment.necklace || null;
        this.selectors.ring.selectedItem = perso2.equipment.ring || null;
        this.selectors.weapons.selectedItem = perso2.equipment.weapons[0] || null;
    }
}
