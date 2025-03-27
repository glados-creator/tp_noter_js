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
        "Redguard",]

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
    ]

    static #race;

    
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
    }
}