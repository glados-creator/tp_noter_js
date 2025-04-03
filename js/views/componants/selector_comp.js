export default class Selector_Comp {
    constructor(categories = []) {
        this.categories = categories;
        this.container = document.createElement('div');
        this.container.classList.add('selector-comp');
        this.Selector_Pop_up = new Selector_Pop_up(categories);
    }

    render() {
        this.container.innerHTML = '';
        this.categories.forEach(category => {
            const btn = document.createElement('button');
            btn.textContent = category;
            btn.classList.add('category-btn');
            btn.addEventListener('click', () => this.Selector_Pop_up);
            this.container.appendChild(btn);
        });
        document.body.appendChild(this.container);
    }
}

import Item_prod from '../../services/Item_prod.js';

class Selector_Pop_up {
    constructor(category) {
        this.category = category;
        this.container = document.createElement('div');
        this.container.classList.add('popup-comp');
        this.render();
    }

    async render() {
        this.container.innerHTML = `<h2>${this.category}</h2>`;
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
        const results = await Item_prod.search({ categories: [this.category], text: query });
        this.itemsContainer.innerHTML = '';
        results.items.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item.Name;
            div.classList.add('item');
            this.itemsContainer.appendChild(div);
        });
    }
}
