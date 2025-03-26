import Personnage_cg from "../personnage_cg";

export default class Imperial extends Personnage_cg {
    static race = "Imperial";

    constructor() {
        super();
        this.Heavy_Armor += 5;
        this.Block       += 5;
        this.One_Handed  += 5;
        this.Speech      += 0;
        this.Restoration += 10;
        this.Enchanting  += 5;
    }
}
