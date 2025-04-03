export default class Calculator_comp {
    constructor(perso1, perso2) {
        this.perso1 = perso1;
        this.perso2 = perso2;
    }

    render() {
        console.log("calculator1",this.perso1);
        console.log("calculator2",this.perso2);

        let perso1Weight = 0;
        let perso1Damage = 0;
        let perso1Gold =  0;
        if (this.perso1){
            try {
                perso1Weight = this.perso1.calculateWeight();
                perso1Damage = this.perso1.calculateDamage();
                perso1Gold =  this.perso1.calculateGold();
            } catch (error) {
                console.warn(error);
            }
        }
        let perso2Damage = 0;
        let perso2Weight = 0;
        let perso2Gold = 0;
        if (this.perso2){
            try {
                
                perso2Damage =  this.perso2.calculateDamage();
                perso2Weight =  this.perso2.calculateWeight();
                perso2Gold =  this.perso2.calculateGold();
            } catch (error) {
                console.warn(error);
            }
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

