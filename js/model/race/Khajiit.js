import Personnage_cg from "../personnage_cg";

export default class Khajiit extends Personnage_cg {
    static race = "Khajiit";

    constructor() {
        super();
        this.One_Handed  += 5;
        this.Light_Armor += 10;
        this.Sneak       += 5;
        this.Lockpicking += 5;
        this.Alchemy     += 5;
    }
}
