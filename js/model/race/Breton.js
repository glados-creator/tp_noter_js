import Personnage_cg from "../personnage_cg";

export default class Breton extends Personnage_cg {
    static race = "Breton";

    constructor() {
        super();
        Speech: 5
        Illusion: 5
        Conjuration: 10
        Restoration: 5
        Alteration: 5
    }
}
