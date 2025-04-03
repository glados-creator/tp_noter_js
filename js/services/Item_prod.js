import Utils from '../services/Utils.js';
import Items from '../model/Items.js';

export default class Item_prod {
    static cache = new Map();
    static urlCache = new Map();
    static dbData = null; // Store the entire db.json data here

    // Load all categories into cache (Weapons and Armor) by fetching the entire db.json
    static async loadAllData() {
        if (this.dbData) {
            console.log('Data already loaded into cache.');
            return;
        }
    
        try {
            // Fetch data from the db.json
            const [weaponsData, armorData, userData, top10Data, categoriesData] = await Promise.all([
                Utils.AutoFetch('Weapons'),
                Utils.AutoFetch('Armor'),
                Utils.AutoFetch('user'),
                Utils.AutoFetch('top_10'),
                Utils.AutoFetch('categories')
            ]);

            // Store the fetched data into the dbData object
            this.dbData = {
                weapons: weaponsData,
                armor: armorData,
                user: userData,
                top_10: top10Data,
                categories: categoriesData
            };

            // Cache the items into the cache map for fast lookup
            this.cache = new Map();
            this.dbData.weapons.forEach(item => this.cache.set(item.id, item));
            this.dbData.armor.forEach(item => this.cache.set(item.id, item));

            console.log('All data loaded and cached from db.json.');
        } catch (error) {
            console.error('Error fetching db.json:', error);
        }
    }
    
    // Get an item by ID from cache
    static async getById(id) {
        if (!id) return null;

        // Load all data if not loaded already
        await this.loadAllData();

        // Check if the item is already cached
        if (this.cache.has(id)) {
            return this.cache.get(id);
        }

        console.warn(`Warning: Item with ID "${id}" not found in cache.`);
        return null;
    }

    // Search items with filters (categories, text, pagination, etc.)
    static async search({ categories = [], text = '', page = 1, pageSize = 10 }) {
        // Ensure data is loaded into cache
        await this.loadAllData();

        const queryParams = new URLSearchParams();
        let allItems = [];

        // Filter items by categories and search text
        const validCategories = categories.filter(category => {
            const isValidCategory = Object.keys(this.dbData.categories).includes(category);
            if (!isValidCategory) {
                console.warn(`Warning: Invalid category "${category}" ignored.`);
            }
            return isValidCategory;
        });

        // If no categories are provided, search across all categories (Weapons and Armor)
        if (categories.length === 0) {
            validCategories.push('Weapons', 'Armor');
        }

        // Filter items from cache based on the valid categories and search text
        allItems = Array.from(this.cache.values()).filter(item => {
            const matchCategory = validCategories.some(category => {
                return (
                    (category === 'Weapons' && item.type === 'Weapon') ||
                    (category === 'Armor' && item.type === 'Armor')
                );
            });

            const matchText = text ? item.name.toLowerCase().includes(text.toLowerCase()) : true;

            return matchCategory && matchText;
        });

        // Handle pagination (slice the results based on page and pageSize)
        const totalItems = allItems.length;
        const startIndex = (page - 1) * pageSize;
        const paginatedItems = allItems.slice(startIndex, startIndex + pageSize);

        return {
            items: paginatedItems,
            total: totalItems,
            page,
            pageSize,
        };
    }
}
