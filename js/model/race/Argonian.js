import Personnage_cg from "../personnage_cg";

export default class Argonian extends Personnage_cg {
    static race = "Argonian";

    constructor() {
        super();

        Archery: 5
        Sneak: 5
        Lockpicking: 10
        Alchemy: 5
        Restoration: 5
    }
}
