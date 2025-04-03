export default class Calculator_comp {
    constructor(perso1, perso2) {
        this.perso1 = perso1;
        this.perso2 = perso2;
    }

    render() {
        const perso1Weight = this.perso1.calculateWeight();
        const perso2Weight = this.perso2.calculateWeight();
        const perso1Damage = this.perso1.calculateDamage();
        const perso2Damage = this.perso2.calculateDamage();
        const perso1Gold = this.perso1.calculateGold();
        const perso2Gold = this.perso2.calculateGold();

        return `
            <div class="calculator-comp">
                <h2>Comparison Results</h2>
                <table>
                    <tr>
                        <th>Attribute</th>
                        <th>${this.perso1.name}</th>
                        <th>${this.perso2.name}</th>
                    </tr>
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

