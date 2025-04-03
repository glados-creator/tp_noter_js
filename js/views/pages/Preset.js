import Page_comp from "../componants/Page_comp.js";
import PersonnageViewComp from "../componants/personnage_view_comp.js";
import Personnage_cg from "../../model/personnage_cg.js";

export default class Preset_page extends Page_comp {
    async render() {
        const personnages = new Personnage_cg(); // Supposons que cette méthode retourne une liste de personnages par défaut
        
        return Page_comp.renderPage(() => `
            <section class="main-content">
                <h1>Preset</h1>
                <p>Page de preset</p>
                <div class="personnages-list">
                    ${personnages.map(personnage => `
                        <div class="personnage-item" data-id="${personnage.id}">
                            ${PersonnageViewComp.render(personnage)}
                        </div>
                    `).join('')}
                </div>
            </section>
        `);
    }

    afterRender() {
        document.querySelectorAll('.personnage-item').forEach(item => {
            item.addEventListener('click', (event) => {
                const personnageId = event.currentTarget.dataset.id;
                const characters = JSON.parse(localStorage.getItem('characters')) || {};
                characters.active = personnageId;
                localStorage.setItem('characters', JSON.stringify(characters));
                window.location.href = '/comparaison';
            });
        });
    }
}
