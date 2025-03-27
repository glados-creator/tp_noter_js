import Personnage_cg from "../personnage_cg";

export default class Redguard extends Personnage_cg {
    static race = "Redguard";

    constructor() {
        super();
        this.Heavy_Armor += 5;
        this.One_Handed  += 10;
        this.Archery     += 5;
        this.Restoration += 5;
    }
}
