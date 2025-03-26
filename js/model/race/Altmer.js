import Personnage_cg from "../personnage_cg";

export default class Altmer extends Personnage_cg {
    static race = "Altmer";

    constructor() {
        super();
        this.Illusion    += 10;
        this.Conjuration += 5;
        this.Destruction += 5;
        this.Restoration += 5;
        this.Alteration  += 5;
        this.Enchanting  += 5;
    }
}

/*
Altmer (High Elf) :

    Illusion : 25
    Conjuration : 20
    Destruction : 20
    Restauration : 20
    Altération : 20
    Enchantement : 20

Argonian :

    Armure légère : 20
    Furtivité : 20
    Crochetage : 25
    Vol à la tire : 20
    Restauration : 20
    Altération : 20

Bosmer (Wood Elf) :

    Tir à l’arc : 25
    Armure légère : 20
    Furtivité : 20
    Crochetage : 20
    Vol à la tire : 20
    Alchimie : 20

Breton :

    Éloquence : 20
    Alchimie : 20
    Illusion : 20
    Conjuration : 25
    Restauration : 20
    Altération : 20

Dunmer (Dark Elf) :

    Armure légère : 20
    Furtivité : 20
    Alchimie : 20
    Illusion : 20
    Destruction : 25
    Altération : 20

Imperial :

    Armure lourde : 20
    Blocage : 20
    Une main : 20
    Destruction : 20
    Restauration : 25
    Enchantement : 20

Khajiit :

    Une main : 20
    Tir à l’arc : 20
    Furtivité : 25
    Crochetage : 20
    Vol à la tire : 20
    Alchimie : 20

Nord :

    Forgeage : 20
    Blocage : 20
    Deux mains : 25
    Une main : 20
    Armure légère : 20
    Éloquence : 20

Orsimer (Orc) :

    Forgeage : 20
    Armure lourde : 25
    Blocage : 20
    Deux mains : 20
    Une main : 20
    Enchantement : 20

Redguard :

    Forgeage : 20
    Blocage : 20
    Une main : 25
    Tir à l’arc : 20
    Destruction : 20
    Altération : 20
*/
