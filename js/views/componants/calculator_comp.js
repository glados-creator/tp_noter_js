export default class Calculator_comp {
    constructor(perso1, perso2) {
        this.perso1 = perso1;
        this.perso2 = perso2;
    }

    render() {
        console.log("calculator1",this.perso1);
        console.log("calculator2",this.perso2);

        const perso1Weight = 0 // this.perso1.calculateWeight();
        const perso1Damage = 0 // this.perso1.calculateDamage();
        const perso1Gold = 0 //  this.perso1.calculateGold();
        const perso2Damage = 0 //  this.perso2.calculateDamage();
        const perso2Weight = 0 //  this.perso2.calculateWeight();
        const perso2Gold = 0 //  this.perso2.calculateGold();
        if (this.perso2 || 1){
        }

        return `
            <div class="calculator-comp">
                <h2>Comparison Results</h2>
                <table>
                    <tr>
                        <td>Weight</td>
                        <td>${perso1Weight}</td>
                        <td>${perso2Weight}</td>
                    </tr>
                    <tr>
                        <td>Damage</td>
                        <td>${perso1Damage}</td>
                        <td>${perso2Damage}</td>
                    </tr>
                    <tr>
                        <td>Gold</td>
                        <td>${perso1Gold}</td>
                        <td>${perso2Gold}</td>
                    </tr>
                </table>
            </div>
        `;
    }
}
