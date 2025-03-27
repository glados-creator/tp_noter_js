import Personnage_cg from "../personnage_cg";

export default class Breton extends Personnage_cg {
    static race = "Breton";

    constructor() {
        super();
        this.Speech      = + 5;
        this.Illusion    = + 5;
        this.Conjuration = + 10;
        this.Restoration = + 5;
        this.Alteration  = + 5;
    }
}
