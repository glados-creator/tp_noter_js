import Item_prod from '../../services/Item_prod.js';

export default class Selector_Comp {
    constructor(categories = [], selectedItem = null, parent) {
        this.categories = categories;
        this.selectedItem = selectedItem;
        this.parent = parent;
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
            console.log(selectedItem);
            const img = document.createElement('img');
            img.src = this.selectedItem.url;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            this.container.appendChild(img);
        }
        return this.container.outerHTML;
    }

    async showPopup() {
        console.log('showPopup called'); // Debugging line
        const popup = new Selector_Pop_up(this.categories, item => {
            this.selectedItem = item;
            this.render();
            this.parent.updateSelectors(); // Notify the parent to update other selectors
        });
        await popup.render();
    }
}

class Selector_Pop_up {
    constructor(categories, onSelect) {
        this.categories = categories;
        this.onSelect = onSelect;
        this.container = document.createElement('div');
        this.container.classList.add('popup-comp');
        this.container.style.position = 'absolute';
        this.container.style.top = '50%';
        this.container.style.left = '50%';
        this.container.style.transform = 'translate(-50%, -50%)';
        this.container.style.backgroundColor = 'white';
        this.container.style.border = '1px solid #ccc';
        this.container.style.padding = '20px';
        this.container.style.zIndex = 1000;
    }

    async render() {
        this.container.innerHTML = `<h2>Select Item</h2>`;
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search...';
        searchInput.addEventListener('input', () => this.searchItems(searchInput.value));
        this.container.appendChild(searchInput);

        this.categoriesContainer = document.createElement('div');
        this.categoriesContainer.classList.add('categories-container');
        this.categories.forEach(category => {
            const categoryBtn = document.createElement('button');
            categoryBtn.textContent = category;
            categoryBtn.classList.add('category-btn');
            categoryBtn.addEventListener('click', () => this.searchItems('', category));
            this.categoriesContainer.appendChild(categoryBtn);
        });
        this.container.appendChild(this.categoriesContainer);

        this.itemsContainer = document.createElement('div');
        this.container.appendChild(this.itemsContainer);

        document.body.appendChild(this.container);
        await this.searchItems('');
    }

    async searchItems(query, category = null) {
        console.log('searchItems called with query:', query, 'and category:', category); // Debugging line
        const results = await Item_prod.search({ categories: category ? [category] : this.categories, text: query });
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
