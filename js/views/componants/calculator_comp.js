import Calcula from'../../services/Calculegraph';

export default class Calculator_comp {
    static async rendergraph() {
        return `
    <section>
        <canvas id="myChart" width="400" height="200"></canvas>
        ${Calcula.graph1()}
    </section>
    `

}
}