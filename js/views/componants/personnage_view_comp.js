import Item_prod from "../../services/Item_prod.js";

export default class PersonnageViewComp {
    static async fetchItemDetails(personnage,slot) {
        const itemId = personnage.equipment[slot];
        if (!itemId) return null;

        try {
            return await Item_prod.getById(itemId);
        } catch (error) {
            console.error(`Error fetching item for slot ${slot}:`, error);
            return null;
        }
    }

    static async render(personnage) {
        const characterImageUrl = 'default-character-image.png';
        const slots = {
            helmet: { top: '10%', left: '50%' },
            chestpiece: { top: '30%', left: '50%' },
            pants: { top: '50%', left: '50%' },
            boots: { top: '70%', left: '50%' },
            gloves: { top: '40%', left: '10%' },
            necklace: { top: '20%', left: '50%' },
            ring: { top: '20%', left: '70%' },
            weapons: { top: '60%', left: '70%' }
        };

        const container = document.createElement('div');
        container.classList.add('personnage-view');
        container.style.position = 'relative';
        container.style.width = '200px';
        container.style.height = '400px';
        container.style.backgroundImage = `url(${characterImageUrl})`;
        container.style.backgroundSize = 'cover';
        container.style.backgroundPosition = 'center';

        const promises = Object.entries(slots).map(async ([slot, position]) => {
            const item = await this.fetchItemDetails(personnage,slot);
            if (item && item.url) {
                const itemImage = document.createElement('img');
                itemImage.src = item.url;
                itemImage.style.position = 'absolute';
                itemImage.style.top = position.top;
                itemImage.style.left = position.left;
                itemImage.style.transform = 'translate(-50%, -50%)';
                itemImage.style.maxWidth = '100%';
                itemImage.style.maxHeight = '100%';
                container.appendChild(itemImage);
            }
        });

        await Promise.all(promises);

        return container.outerHTML;
    }
}
