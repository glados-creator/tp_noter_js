import Personnage_cg from "../personnage_cg";

export default class Argonian extends Personnage_cg {
    static race = "Argonian";

    constructor() {
        super();
        this.Archery     += 5;
        this.Sneak       += 5;
        this.Lockpicking += 10;
        this.Alchemy     += 5;
        this.Restoration += 5;
    }
}
