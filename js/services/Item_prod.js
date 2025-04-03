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
            // Fetch Weapons data
            const weaponsData = await Utils.AutoFetch('Weapons');
            console.log("HERER",weaponsData);
            weaponsData.forEach(item => {
                this.cache.set(item.id, new Items(item));
            });
    
            // Fetch Armor data
            const armorData = await Utils.AutoFetch('Armor');
            armorData.forEach(item => {
                this.cache.set(item.id, new Items(item));
            });
    
            // Fetch other categories if needed (user, top_10, categories)
            const userData = await Utils.AutoFetch('user');
            const top10Data = await Utils.AutoFetch('top_10');
            const categoriesData = await Utils.AutoFetch('categories');
    
            // You can store additional information from these endpoints in the dbData if needed
            this.dbData = {
                user: userData,
                top_10: top10Data,
                categories: categoriesData,
            };
    
            console.log('All data loaded and cached from db.json.');
        } catch (error) {
            console.error('Error fetching db.json:', error);
        }
    }
    

    // Récupérer un item par ID en parcourant la cache
    static async getById(id) {
        if (!id) return null;

        // Ensure data is loaded into cache
        await this.loadAllData();

        // Check if item is in the cache
        if (this.cache.has(id)) {
            return this.cache.get(id);
        }

        console.warn(`Warning: Item with ID "${id}" not found in cache.`);
        return null;
    }

    // Recherche d'items avec filtres, pagination et cache
    static async search({ categories = [], text = '', page = 1, pageSize = 10 }) {
        // Ensure data is loaded into cache
        await this.loadAllData();

        const queryParams = new URLSearchParams();
        let allItems = [];

        // Filter items from cache based on categories and search text
        const validCategories = categories.filter(category => {
            if (Object.keys(this.dbData.Weapons || {}).includes(category)) {
                return true;
            } else if (Object.keys(this.dbData.Armor || {}).includes(category)) {
                return true;
            } else {
                console.warn(`Warning: Invalid category "${category}" ignored.`);
                return false;
            }
        });

        // If no categories are provided, search across all categories
        if (categories.length === 0) {
            validCategories.push('Weapons', 'Armor');
        }

        // Iterate over valid categories to filter items
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

        // Handle pagination
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
