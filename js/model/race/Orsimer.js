import Personnage_cg from "../personnage_cg";

export default class Orsimer extends Personnage_cg {
    static race = "Orsimer";

    constructor() {
        super();
        this.Heavy_Armor += 10;
        this.Smithing    += 5;
        this.Block       += 5;
        this.Enchanting  += 5;
    }
}
