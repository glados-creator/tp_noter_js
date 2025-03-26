import Personnage_cg from "../personnage_cg";

export default class Dunmer extends Personnage_cg {
    static race = "Dunmer";

    constructor() {
        super();
        this.Archery     += 5;
        this.Alchemy     += 5;
        this.Conjuration += 10;
    }
}
