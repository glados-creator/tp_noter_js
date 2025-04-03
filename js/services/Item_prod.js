import Utils from '../services/Utils.js';
import Items from '../model/Items.js';

export default class Item_prod {
    static cache = new Map();
    static urlCache = new Map();

    // Récupérer un item par ID en parcourant toutes les catégories
    static async getById(id, category = null) {
        if (!id) return null;
        if (this.cache.has(id)) return this.cache.get(id);

        // Define the categories to search based on the provided category
        const categoriesToSearch = category
            ? [[category, Object.keys(Items[category])]]
            : [
                ['Weapons', Object.keys(Items.Weapons)],
                ['Armor', Object.keys(Items.Armor)]
            ];

        // Iterate through the categories to find the item by ID
        for (const [mainCategory, subCategories] of categoriesToSearch) {
            for (const subCategory of subCategories) {
                const url = `${mainCategory}/${subCategory}`;
                const data = await Utils.AutoFetch(url);
                console.log("item provider byid",data);
                // Search for the item by ID
                const itemData = data.filter(item => item.id === id);

                if (itemData) {
                    const item = new Items(itemData);
                    this.cache.set(id, item);
                    return item;
                }
            }
        }
        console.warn(`Warning: Item with ID "${id}" not found in any category. ${category}`);
        return null;
    }

    // Recherche d'items avec filtres, pagination et this.cache
    static async search({ categories = [], text = '', page = 1, pageSize = 10 }) {
        const queryParams = new URLSearchParams();
        let endpoints = [];

        // Determine the correct endpoints based on categories
        const validCategories = categories.filter(category => {
            if (Object.values(Items.Weapons).includes(category)) {
                endpoints.push(`Weapons/${category}`);
                return true;
            } else if (Object.values(Items.Armor).includes(category)) {
                endpoints.push(`Armor/${category}`);
                return true;
            } else {
                console.warn(`Warning: Invalid category "${category}" ignored.`);
                return false;
            }
        });

        if (categories.length === 0) {
            // If no categories are provided, search across all categories
            endpoints = [
                ...Object.keys(Items.Weapons).map(subCat => `Weapons/${subCat}`),
                ...Object.keys(Items.Armor).map(subCat => `Armor/${subCat}`)
            ];
        }

        if (text) queryParams.append('_like', text);
        queryParams.append('_page', page);
        queryParams.append('_limit', pageSize);

        let allItems = [];

        for (const endpoint of endpoints) {
            const url = `${endpoint}?${queryParams.toString()}`;

            // Check URL cache
            if (this.urlCache.has(url)) {
                allItems = allItems.concat(this.urlCache.get(url).items);
                continue;
            }

            const data = await Utils.AutoFetch(url);
            const items = data.map(item => new Items(item));
            items.forEach(item => this.cache.set(item.id, item));

            const result = {
                items,
                total: data.length,
                page,
                pageSize,
            };

            // Cache the result for the URL
            this.urlCache.set(url, result);
            allItems = allItems.concat(items);
        }

        return {
            items: allItems,
            total: allItems.length,
            page,
            pageSize,
        };
    }
}
