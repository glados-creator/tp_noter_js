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
        this.initializeCharacters();
        this.updateSelectors(this.perso1, this.perso2);

        return Page_comp.renderPage(async () => `
            <h1>Comparaison</h1>
            <p>Page de comparaison</p>
            <button id="debug-button">Debug: Set Characters</button>
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
            <script>
                document.getElementById('debug-button').addEventListener('click', () => {
                    Comparaison_page.debugSetCharacters();
                    location.reload();
                });
            </script>
        `);
    }

    initializeCharacters() {
        let charData = JSON.parse(localStorage.getItem('characters')) || {};
        if (!charData.active) {
            charData.active = new Personnage_cg();
        }
        if (!charData.perso1) {
            charData.perso1 = charData.active;
        } else if (!charData.perso2) {
            charData.perso2 = charData.active;
        }
        localStorage.setItem('characters', JSON.stringify(charData));
        
        this.perso1 = charData.perso1;
        this.perso2 = charData.perso2;
    }

    handlePersonnageSelected(event) {
        const selectedPersonnage = event.detail;
        let charData = JSON.parse(localStorage.getItem('characters')) || {};

        if (!charData.perso1) {
            charData.perso1 = selectedPersonnage;
        } else {
            charData.perso2 = selectedPersonnage;
        }
        localStorage.setItem('characters', JSON.stringify(charData));
        this.initializeCharacters();
        this.render();
    }

    updateSelectors(perso1, perso2) {
        const updateSelector = (selector, item) => {
            this.selectors[selector] = new Selector_Comp([selector]);
            this.selectors[selector].selectedItem = item || null;
        };
        
        ['helmet', 'chestpiece', 'pants', 'boots', 'gloves', 'necklace', 'ring', 'weapons'].forEach(slot => {
            updateSelector(slot, perso1.equipment[slot] || null);
            updateSelector(slot, perso2.equipment[slot] || null);
        });
    }

    static debugSetCharacters() {
        let charData = {
            active: new Personnage_cg(),
            perso1: null,
            perso2: null
        };
        localStorage.setItem('characters', JSON.stringify(charData));
    }
}
