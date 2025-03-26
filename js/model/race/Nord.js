import Personnage_cg from "../personnage_cg";

export default class Nord extends Personnage_cg {
    static race = "Nord";

    constructor() {
        super();
        this.Smithing   += 5;
        this.Block      += 5;
        this.Two_Handed += 10;
    }
}
