import Personnage_cg from "../personnage_cg";

export default class Dunmer extends Personnage_cg {
    static race = "Dunmer";

    constructor() {
        super();

        Archery: 5
        Alchemy: 5
        Conjuration: 10
    }
}
