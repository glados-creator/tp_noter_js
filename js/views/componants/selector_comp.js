import Item_prod from '../../services/Item_prod.js';

export default class Selector_Comp {
    constructor(categories = [], selectedItem = null) {
        this.categories = categories;
        this.selectedItem = selectedItem;
        this.container = document.createElement('div');
        this.container.classList.add('selector-comp');
        this.container.style.width = '50px';
        this.container.style.height = '50px';
        this.container.style.backgroundColor = 'black';
        this.container.style.display = 'flex';
        this.container.style.alignItems = 'center';
        this.container.style.justifyContent = 'center';
        this.container.style.cursor = 'pointer';
        this.container.addEventListener('click', () => this.showPopup());
    }

    render() {
        this.container.innerHTML = '';
        if (this.selectedItem) {
            const img = document.createElement('img');
            img.src = this.selectedItem.url;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            this.container.appendChild(img);
        }
        return this.container.outerHTML;
    }

    async showPopup() {
        const popup = new Selector_Pop_up(this.categories, item => {
            this.selectedItem = item;
            this.render();
        });
        popup.render();
    }
}

class Selector_Pop_up {
    constructor(categories, onSelect) {
        this.categories = categories;
        this.onSelect = onSelect;
        this.container = document.createElement('div');
        this.container.classList.add('popup-comp');
    }

    async render() {
        this.container.innerHTML = `<h2>Select Item</h2>`;
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search...';
        searchInput.addEventListener('input', () => this.searchItems(searchInput.value));
        this.container.appendChild(searchInput);

        this.itemsContainer = document.createElement('div');
        this.container.appendChild(this.itemsContainer);

        document.body.appendChild(this.container);
        this.searchItems('');
    }

    async searchItems(query) {
        const results = await Item_prod.search({ categories: this.categories, text: query });
        this.itemsContainer.innerHTML = '';
        results.items.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item.Name;
            div.classList.add('item');
            div.addEventListener('click', () => {
                this.onSelect(item);
                this.container.remove();
            });
            this.itemsContainer.appendChild(div);
        });
    }
}
