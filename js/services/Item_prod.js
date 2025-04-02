import Utils from '../services/Utils.js';
import Items from '../model/Items.js';
import ENDPOINT from '../config/endpoint.js';

export default class Item_prod {
    static cache = new Map();
    static urlCache = new Map();

    // Récupérer un item par ID en parcourant toutes les catégories
    static async getById(id, category = null) {
        if (!id) return null;
        if (cache.has(id)) return cache.get(id);

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
                const url = `${ENDPOINT}/${mainCategory}/${subCategory}`;
                const data = await Utils.AutoFetch(url);

                // Search for the item by ID
                const itemData = data.find(item => item.id === id);

                if (itemData) {
                    const item = new Items(itemData);
                    cache.set(id, item);
                    return item;
                }
            }
        }
        console.warn(`Warning: Item with ID "${id}" not found in any category. ${category}`);
        return null;
    }

    // Recherche d'items avec filtres, pagination et cache
    static async search({ categories = [], text = '', page = 1, pageSize = 10 }) {
        const queryParams = new URLSearchParams();
        let endpoint = '';

        // Determine the correct endpoint based on categories
        const validCategories = categories.filter(category => {
            if (Object.values(Items.Weapons).includes(category)) {
                endpoint = 'Weapons';
                return true;
            } else if (Object.values(Items.Armor).includes(category)) {
                endpoint = 'Armor';
                return true;
            } else {
                console.warn(`Warning: Invalid category "${category}" ignored.`);
                return false;
            }
        });

        if (validCategories.length === 0) {
            // If no valid categories are provided, search across all categories
            endpoint = '';
        } else {
            queryParams.append('category', validCategories.join(','));
        }

        if (text) queryParams.append('q', text);
        queryParams.append('_page', page);
        queryParams.append('_limit', pageSize);

        const url = `${ENDPOINT}/${endpoint}?${queryParams.toString()}`;

        // Check URL cache
        if (urlCache.has(url)) {
            return urlCache.get(url);
        }

        const data = await Utils.AutoFetch(url);
        const items = data.map(item => new Items(...item));
        items.forEach(item => cache.set(item.id, item));

        const result = {
            items,
            total: data.length,
            page,
            pageSize,
        };

        // Cache the result for the URL
        urlCache.set(url, result);

        return result;
    }
}
