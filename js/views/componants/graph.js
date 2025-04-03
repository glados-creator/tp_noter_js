import Calculegraph from'../../services/Calculegraph.js';
export default class graph {
static async rendergraph() {
    
    const canvasHtml =`   
    <section>
        <canvas id="myChart" width="400" height="200"></canvas>
    </section>
    `
    Calculegraph.graph1();


    return canvasHtml;

}

}