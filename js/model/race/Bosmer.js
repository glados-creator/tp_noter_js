import Personnage_cg from "../personnage_cg";

export default class Bosmer extends Personnage_cg {
    static race = "Bosmer";

    constructor() {
        super();
        this.Archery += 10;
        this.Alchemy += 5;
    }
}
