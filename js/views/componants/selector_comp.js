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

        this.popup = new Selector_Pop_up(this, this.categories, (item) => {
            this.selectedItem = item;
            this.render();
        });

        this.container.addEventListener('click', () => {console.log("click");
                                        this.popup.render()});
        this.render();
    }

    render() {
        this.container.innerHTML = ''; // Clear previous content

        if (this.selectedItem) {
            console.log("Rendering selected item:", this.selectedItem);
            const img = document.createElement('img');
            img.src = this.selectedItem.url;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            this.container.appendChild(img);
        }

        return this.container.outerHTML;
    }
}

class Selector_Pop_up {
    constructor(parent, categories, onSelect) {
        this.parent = parent;
        this.categories = categories;
        this.onSelect = onSelect;

        this.container = document.createElement('div');
        this.container.classList.add('popup-comp');
        this.container.style.position = 'fixed';
        this.container.style.top = '50%';
        this.container.style.left = '50%';
        this.container.style.transform = 'translate(-50%, -50%)';
        this.container.style.backgroundColor = 'white';
        this.container.style.border = '1px solid #ccc';
        this.container.style.padding = '20px';
        this.container.style.zIndex = '1000';
        this.container.style.display = 'none';

        this.closeButton = document.createElement('button');
        this.closeButton.textContent = 'Close';
        this.closeButton.addEventListener('click', () => this.close());
        this.container.appendChild(this.closeButton);

        this.searchInput = document.createElement('input');
        this.searchInput.type = 'text';
        this.searchInput.placeholder = 'Search...';
        this.searchInput.addEventListener('input', () => this.searchItems(this.searchInput.value));
        this.container.appendChild(this.searchInput);

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
    }

    async render() {
        console.log("Rendering popup...");
        this.container.style.display = 'block'; // Show popup
        await this.searchItems('');
    }

    async searchItems(query, category = null) {
        console.log('Searching items with:', { query, category });
        const results = await Item_prod.search({ categories: category ? [category] : this.categories, text: query });

        this.itemsContainer.innerHTML = ''; // Clear old results

        results.items.forEach(item => {
            const div = document.createElement('div');
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.style.cursor = 'pointer';
            div.style.marginBottom = '5px';

            const img = document.createElement('img');
            img.src = item.url;
            img.width = 40;
            img.height = 40;
            img.style.marginRight = '10px';

            const text = document.createElement('span');
            text.textContent = item.Name;

            div.appendChild(img);
            div.appendChild(text);

            div.addEventListener('click', () => {
                console.log("Item selected:", item);
                this.parent.selectedItem = item;
                this.onSelect(item);
                this.close(); // Close popup after selection
            });

            this.itemsContainer.appendChild(div);
        });
    }

    close() {
        this.container.style.display = 'none';
    }
}
