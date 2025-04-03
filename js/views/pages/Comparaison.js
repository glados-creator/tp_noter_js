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
        this.armorView = "perso1"; // Default armor view

        document.addEventListener('personnageSelected', event => this.handlePersonnageSelected(event));
    }

    async render() {
        await this.initializeCharacters();
        this.updateSelectors();

        setTimeout(() => {
            console.log("Attaching event listeners...");
            
            document.getElementById('debug-button')?.addEventListener('click', () => {
                Comparaison_page.debugSetCharacters();
                location.reload();
            });

            document.getElementById('reset-button')?.addEventListener('click', () => {
                localStorage.removeItem('characters');
                location.reload();
            });

            document.getElementById('switch-armor')?.addEventListener('click', () => {
                this.toggleArmorView();
            });

            document.getElementById('perso1-view')?.addEventListener('click', () => this.setActiveCharacter(this.perso1));
            document.getElementById('perso2-view')?.addEventListener('click', () => this.setActiveCharacter(this.perso2));

        }, 500);

        return Page_comp.renderPage(async () => `

        <section class="main-content-comparaison">
            <h1>Comparaison</h1>
            <p>Page de comparaison</p>
            <button id="debug-button">Debug: Set Characters</button>
            <button id="reset-button">Reset Local Storage</button>
            <button id="switch-armor">Switch Armor View</button>
            
            <div class="equipment-selectors">
                ${Object.keys(this.selectors).map(slot => 
                    `<div class="equipment-slot">${slot.charAt(0).toUpperCase() + slot.slice(1)}: ${this.selectors[slot].render()}</div>`
                ).join('')}
            </div>

            <div class="character-views-container">
                <div class="character-view" id="perso1-view">${this.perso1 ? await PersonnageViewComp.render(this.perso1) : "<p>Click to select a character</p>"}</div>
                <div class="character-view" id="perso2-view">${this.perso2 ? await PersonnageViewComp.render(this.perso2) : "<p>Click to select a character</p>"}</div>
            </div>

            <table>
                <tr>
                    <th>Weapons</th>
                    <td>${this.selectors.weapons_p1.render()}</td>
                    <td>${this.selectors.weapons_p2.render()}</td>
                </tr>
            </table>


            <div>${new Calculator_comp(this.perso1, this.perso2).render()}</div>

        <section>
            <script>
                document.getElementById('debug-button').addEventListener('click', () => {
                    Comparaison_page.debugSetCharacters();
                    location.reload();
                });
            </script>


            <style>
                .character-views-container {
                    display: flex;
                    justify-content: space-around;
                    gap: 20px;
                    margin-top: 20px;
                }
                .character-view {
                    flex: 1;
                    border: 1px solid #ccc;
                    padding: 10px;
                    cursor: pointer;
                    text-align: center;
                }
                .equipment-slot {
                    display: ${this.armorView === "perso1" ? "block" : "none"};
                }
            </style>

        `);
    }

    async initializeCharacters() {
        let charData = JSON.parse(localStorage.getItem('characters')) || { perso1: null, perso2: null, active: null };

        if (charData.active) {
            if (charData.perso1) {
                charData.perso2 = charData.perso1;
            }
            charData.perso1 = charData.active;
            charData.active = null;
        }

        this.perso1 = charData.perso1 ? new Personnage_cg(charData.perso1) : null;
        this.perso2 = charData.perso2 ? new Personnage_cg(charData.perso2) : null;

        localStorage.setItem('characters', JSON.stringify({ perso1: this.perso1, perso2: this.perso2, active: null }));
    }

    async handlePersonnageSelected(event) {
        const selectedPersonnage = event.detail;
        let charData = JSON.parse(localStorage.getItem('characters')) || {};

        if (charData.perso1) {
            charData.perso2 = charData.perso1;
        }
        charData.perso1 = selectedPersonnage;

        localStorage.setItem('characters', JSON.stringify(charData));
        await this.initializeCharacters();
        this.render();
    }

    updateSelectors() {
        const createSelector = (slot, character, prefix) => {
            const selectorName = `${slot}_${prefix}`;
            this.selectors[selectorName] = new Selector_Comp([slot]);
            this.selectors[selectorName].selectedItem = character?.equipment?.[slot] || null;
        };

        ['helmet', 'chestpiece', 'pants', 'boots', 'gloves', 'necklace', 'ring', 'weapons'].forEach(slot => {
            
            createSelector(slot, this.perso2, 'p2')
            createSelector(slot, this.perso1, 'p1');
        });
    }

    setActiveCharacter(character) {
        if (!character) return;
        let charData = JSON.parse(localStorage.getItem('characters')) || {};

        if (charData.perso1) {
            charData.perso2 = charData.perso1;
        }
        charData.perso1 = character;

        localStorage.setItem('characters', JSON.stringify(charData));
        this.render();
    }

    toggleArmorView() {
        this.armorView = this.armorView === "perso1" ? "perso2" : "perso1";
        this.render();
    }

    static debugSetCharacters() {
        let charData = {
            active: { name: "Debug Character", equipment: {} },
            perso1: this.perso1 ?? null,
            perso2: null,
        };
        console.log("Reset character data:", charData);
        localStorage.setItem('characters', JSON.stringify(charData));
    }
}
