import Page_comp from "../componants/Page_comp.js";
import PersonnageViewComp from "../componants/personnage_view_comp.js";
import Personnage_cg from "../../model/personnage_cg.js";

export default class Preset_page extends Page_comp {
    async render() {
        const personnages = [
            new Personnage_cg(),
            new Personnage_cg(),
            new Personnage_cg()
        ];

        const personnageItems = await Promise.all(personnages.map(async personnage => {
            return `<div class="personnage-item" data-id="${personnage.id}">
                        ${await PersonnageViewComp.render(personnage)}
                    </div>`;
        }));

        const content = `
            <section class="main-content">
                <h1>Preset</h1>
                <p>Page de preset</p>
                <div class="personnages-list">
                    ${personnageItems.join('')}
                </div>
                <button id="debug-button">Initialize LocalStorage</button>
            </section>
        `;

        setTimeout(() => {
            document.querySelectorAll('.personnage-item').forEach(item => {
                item.addEventListener('click', (event) => {
                    const personnageId = event.currentTarget.dataset.id;
                    const characters = JSON.parse(localStorage.getItem('characters')) || {};
                    characters.active = personnageId;
                    localStorage.setItem('characters', JSON.stringify(characters));
                    window.location.href = '/comparaison';
                });
            });

            document.getElementById('debug-button').addEventListener('click', () => {
                const characters = { active: null, perso1: null, perso2: null };
                localStorage.setItem('characters', JSON.stringify(characters));
                console.log('LocalStorage initialized:', characters);
            });
        }, 0);

        return Page_comp.renderPage(() => content);
    }
}
