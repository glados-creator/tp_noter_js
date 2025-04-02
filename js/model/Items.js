export default class Items {
    static Weapons = {
        Swords     : "Swords",
        War_Axes   : "War_Axes",
        Maces      : "Maces",
        Daggers    : "Daggers",
        Greatswords: "Greatswords",
        Battleaxes : "Battleaxes",
        Warhammers : "Warhammers",
        Bows       : "Bows",
        Crossbows  : "Crossbows",
        Shields    : "Shields",
    }
    static Armor = {
        helmet    : "helmet",
        chestpiece: "chestpiece",
        pants     : "pants",
        boots     : "boots",
        gloves    : "gloves",
        necklace  : "necklace",
        ring      : "ring",
    }

    id       = "00000000";
    category = "Weapons";
    type     = "Swords";
    Name     = "ItemName";
    url      = "http://itemurl.xyz";
    Damage   = 0;
    weight   = 0;
    value    = 0;

    constructor({ id, category, type, Name, url, Damage, weight, value }) {
        this.id       = id          || "00000000";
        this.category = category    || "Weapons";
        this.type     = type        || "Swords";
        this.Name     = Name        || "ItemName";
        this.url      = url         || "http://itemurl.xyz";
        this.Damage   = Damage      || 0;
        this.weight   = weight      || 0;
        this.value    = value       || 0;
    }
}