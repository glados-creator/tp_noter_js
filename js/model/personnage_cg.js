export default class Personnage_cg {
    static race_list = [
        "Altmer",
        "Argonian",
        "Bosmer",
        "Breton",
        "Dunmer",
        "Imperial",
        "Khajiit",
        "Nord",
        "Orsimer",
        "Redguard",
    ];

    static attributes = [
        "Smithing",
        "Heavy_Armor",
        "Block",
        "Two_Handed",
        "One_Handed",
        "Archery",
        "Light_Armor",
        "Sneak",
        "Lockpicking",
        "Pickpocket",
        "Speech",
        "Alchemy",
        "Illusion",
        "Conjuration",
        "Destruction",
        "Restoration",
        "Alteration",
        "Enchanting",
    ];

    static #race;
    wherewolf = false;
    vampire = false;

    constructor() {
        this.Smithing = 15;
        this.Heavy_Armor = 15;
        this.Block = 15;
        this.Two_Handed = 15;
        this.One_Handed = 15;
        this.Archery = 15;
        this.Light_Armor = 15;
        this.Sneak = 15;
        this.Lockpicking = 15;
        this.Pickpocket = 15;
        this.Speech = 15;
        this.Alchemy = 15;
        this.Illusion = 15;
        this.Conjuration = 15;
        this.Destruction = 15;
        this.Restoration = 15;
        this.Alteration = 15;
        this.Enchanting = 15;
        this.equipment = {
            helmet: {
                "id": "38a45d7b",
                "Name": "Chitin_Armor",
                "url": "https://images.uesp.net/thumb/1/14/SR-icon-armor-Chitin_Armor.png/48px-SR-icon-armor-Chitin_Armor.png",
                "Damage": 4,
                "weight": 240,
                "value": 30
            },
            chestpiece: "085c1a1b",
            pants: "2dd287d0",
            boots: "3c4ff3cc",
            gloves: "012bc4bd",
            necklace: "89dbe2eb",
            rings: ["053061e3"],
            weapons: "73591106",
        };
    }

    calculateWeight() {
        let totalWeight = 0;
        for (const item of Object.values(this.equipment)) {
            if (Array.isArray(item)) {
                totalWeight += item.reduce((sum, i) => sum + i.weight, 0);
            } else if (item) {
                totalWeight += item.weight;
            }
        }
        return totalWeight;
    }

    calculateDamage() {
        let totalDamage = 0;
        const weaponTypes = ["Swords", "War_Axes", "Maces", "Daggers", "Greatswords", "Battleaxes", "Warhammers", "Bows", "Crossbows"];
        for (const weapon of this.equipment.weapons) {
            if (weaponTypes.includes(weapon.type)) {
                totalDamage += weapon.Damage;
            }
        }
        return totalDamage;
    }

    calculateGold() {
        let totalGold = 0;
        for (const item of Object.values(this.equipment)) {
            if (Array.isArray(item)) {
                totalGold += item.reduce((sum, i) => sum + i.value, 0);
            } else if (item) {
                totalGold += item.value;
            }
        }
        return totalGold;
    }
}
